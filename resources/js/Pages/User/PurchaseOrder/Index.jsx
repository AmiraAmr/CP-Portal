import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button, Modal, Pagination, Space, Steps, Table } from "antd";
import { router, Link } from "@inertiajs/react";
import { showDeleteConfirm } from "@/Components/ModalDelete";
import Status from "@/Components/Status";
import DropdownButton from "@/Components/DropdownButton";

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
                        description: item.subject,
                        vat: item.vat,
                        total: item.total,
                        status: item.status,
                        cylce: item.purchase_order_cycle,
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
                        Purchase Order
                    </span>
                    <Link href="/user/createpurchaseorder">
                        <Button type="primary">Create</Button>
                    </Link>
                </div>
                {route().params.message ? (
                    <Alert
                        message={route().params.message}
                        type="success"
                        showIcon
                        closable
                    />
                ) : (
                    ""
                )}
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
                            responsive: ["md"],
                        },
                        {
                            title: "Description",
                            dataIndex: "description",
                            key: "description",
                            responsive: ["xl"],
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
                            title: "Status",
                            dataIndex: "status",
                            key: "status",
                            responsive: ["sm"],
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
                            title: "Vat",
                            dataIndex: "vat",
                            key: "vat",
                            responsive: ["lg"],
                        },
                        {
                            title: "Total",
                            dataIndex: "total",
                            key: "total",
                            responsive: ["lg"],
                        },
                        {
                            title: "Action",
                            dataIndex: "action",
                            key: "action",
                            render: (_, record) => (
                                <DropdownButton buttonTitle={"Actions"}
                                    actions={[
                                        {
                                            label: "Preview",
                                            href: `/user/purchasereturn/${record.key}`
                                        },
                                        {
                                            label: "Edit",
                                            href: `/user/purchase_update/${record.key}`
                                        },
                                        {
                                            label: "Delete",
                                            action: () => showDeleteConfirm(
                                                "/user/delete_data/",
                                                record.key,
                                                "user.purchase_tablez"
                                            )
                                        }
                                    ]}
                                />
                            ),
                        },
                    ]}
                    dataSource={rows}
                    pagination={{ hideOnSinglePage: true }}
                />
                <Pagination
                    style={{ color: "#000" }}
                    showQuickJumper
                    defaultCurrent={1}
                    total={props.data.total}
                    pageSize={props.data.per_page}
                    onChange={onChange}
                    current={props.data.current_page}
                />
                <Modal
                    title="Workflow"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    width={1024}
                >
                    <Steps current={cylce.length > 0 ? cylce.length - 1 : ""}>
                        {props.workflow.flowwork_step.map((step, index) => {
                            return (
                                <Step
                                    status={status[index]}
                                    title={step.role.name}
                                    key={`items-${step.id}`}
                                />
                            );
                        })}
                    </Steps>
                </Modal>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
