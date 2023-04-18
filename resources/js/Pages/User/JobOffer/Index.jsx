import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button, Modal, Pagination, Space, Steps, Table, Tag } from "antd";
import { stateOfWorkFlow } from "@/Components/States";
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
                        ref: item.ref,
                        date: item.date,
                        subject: item.subject,
                        status: item.status,
                        salary: item.salary,
                        cylce: item.joboffer_cycle,
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
                        Job Offer
                    </span>
                    <Link href="/joboffer/create">
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
                            title: "Ref",
                            dataIndex: "ref",
                            key: "ref",
                        },
                        {
                            title: "Date",
                            dataIndex: "date",
                            key: "date",
                        },
                        {
                            title: "Subject",
                            dataIndex: "subject",
                            key: "subject",
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
                            title: "Salary",
                            dataIndex: "salary",
                            key: "salary",
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
                                            href: `/joboffer/preview/${record.key}`
                                        },
                                        {
                                            label: "Edit",
                                            href: `/joboffer/update/${record.key}`
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
