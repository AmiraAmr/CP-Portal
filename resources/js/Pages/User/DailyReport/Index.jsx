import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Alert, Button,  Steps, Table, Tag } from "antd";
import { stateOfWorkFlow } from "@/Components/States";
import { router, Link } from "@inertiajs/react";
import { showDeleteConfirm } from "@/Components/ModalDelete";
import DropdownButton from "@/Components/DropdownButton";
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
                        work_area: item.The_scope_of_work,
                        supervisor: item.supervisor
                            ? item.supervisor.name
                            : "      d",
                        project: item.project ? item.project.name : "",
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
                        Daily Report
                    </span>
                    <Link href="/daily_report/create">
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
                        },
                        {
                            title: "The scope of work",
                            dataIndex: "work_area",
                            key: "work_area",
                        },
                        {
                            title: "Supervisor",
                            dataIndex: "supervisor",
                            key: "supervisor",
                        },
                        {
                            title: "Project",
                            dataIndex: "project",
                            key: "project",
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
                                <DropdownButton buttonTitle={"Actions"}
                                    actions={[
                                        {
                                            label: "Preview",
                                            href: `/daily_report/preview/${record.key}`
                                        },
                                        {
                                            label: "Delete",
                                            action: () => showDeleteConfirm(
                                                "/daily_report/delete/",
                                                record.key,
                                                "daily_report_index.user"
                                            )
                                        }
                                    ]}
                                />
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
