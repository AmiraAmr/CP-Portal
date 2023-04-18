import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button, Modal, Pagination, Space, Steps, Table, Tag } from "antd";
import { stateOfWorkFlow } from "@/Components/States";
import { router, Link } from "@inertiajs/react";
import { showDeleteConfirm } from "@/Components/ModalDelete";
import Status from "@/Components/Status";

const Index = (props) => {
    const { Step } = Steps;
    const [cylce, setCylce] = useState([]);
    const [status, setStatus] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [rows, setRows] = useState([]);
    const onChange = (e) => {
        const url =
            route().t.url +
            "/" +
            route().t.routes[route().current()].uri +
            "?page=" +
            e;

        router.get(url);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    useEffect(() => {
        setRows([]);
        props.data.data.map((item) => {
            setRows((prev) => {
                return [
                    ...prev,
                    {
                        key: item.id,
                        code: item.ref,
                        date: item.date,
                        user: item.user.name,
                        description: item.subject,
                        hand_over: item.delivery_date,
                        status: item.status,
                        cylce: item.rfq_cycle,
                    },
                ];
            });
        });
    }, []);
    useEffect(() => {
        setStatus([]);
        cylce?.map((step) => {
            if (step.status == 0) {
                setStatus((prev) => {
                    return [...prev, "process"];
                });
            } else if (step.status == 1) {
                setStatus((prev) => {
                    return [...prev, "finish"];
                });
            } else if (step.status == 2) {
                setStatus((prev) => {
                    return [...prev, "error"];
                });
            } else if (step.status == 3) {
                setStatus((prev) => {
                    return [...prev, "wait"];
                });
            }
        });
    }, [cylce]);
    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Tender
                    </span>
                    {/* <Link href="/user/createfrqinv">
                        <Button type="primary">Create</Button>
                    </Link> */}
                </div>
                <Table
                    columns={[
                        {
                            title: "Code",
                            dataIndex: "code",
                            key: "code",
                        },
                        {
                            title: "Date",
                            dataIndex: "date",
                            key: "date",
                        },
                        {
                            title: "User",
                            dataIndex: "user",
                            key: "user",
                        },
                        {
                            title: "Description",
                            dataIndex: "description",
                            key: "description",
                            render: (_, { description }) => (
                                <>
                                    <p
                                        style={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 1,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            width: "70%",
                                        }}
                                    >
                                        {description}
                                    </p>
                                </>
                            ),
                        },
                        {
                            title: "Hand over",
                            dataIndex: "hand_over",
                            key: "hand_over",
                        },
                        {
                            title: "Status",
                            dataIndex: "status",
                            key: "status",
                            render: (_, { status, cylce }) => (
                                <>
                                    {status !== null && (
                                        <Status
                                            status={status}
                                            onClick={() => {
                                                showModal()
                                                setCylce(cylce)}
                                            }
                                        />
                                    )}
                                </>
                            ),
                        },
                        {
                            title: "Action",
                            dataIndex: "action",
                            key: "action",
                            render: (_, record) => (
                                <Link
                                    href={`/tender/update/${record.key}`}
                                    className="flex items-center text-blue-500 hover:text-blue-700"
                                >
                                    <svg
                                        className="w-4 h-4 mr-1 rtl:ml-1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                                    </svg>
                                    Edit
                                </Link>
                            ),
                        },
                    ]}
                    dataSource={rows}
                    pagination={{
                        showQuickJumper: true,
                        defaultCurrent: 1,
                        total: props.data.total,
                        pageSize: props.data.per_page,
                        onChange: onChange,
                        current: props.data.current_page,
                    }}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
