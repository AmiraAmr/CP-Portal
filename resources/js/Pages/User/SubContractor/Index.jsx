import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button, Modal, Pagination, Space, Steps, Table, Tag } from "antd";
import { stateOfWorkFlow } from "@/Components/States";
import { router, Link } from "@inertiajs/react";
import { showDeleteConfirm } from "@/Components/ModalDelete";

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
                        contractor: item.contractor.comp
                            ? item.contractor.comp
                            : item.contractor.contractor_name,
                        status: item.status,
                        cylce: item.contract_withsubcontractor_cycle,
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
                        Contracts
                    </span>
                    <Link href="/cws/create">
                        <Button type="primary">Create</Button>
                    </Link>
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
                            title: "Contractor",
                            dataIndex: "contractor",
                            key: "contractor",
                        },
                        {
                            title: "Status",
                            dataIndex: "status",
                            key: "status",
                            render: (_, { status, cylce }) => (
                                <>
                                    {status !== null && (
                                        <Tag
                                            color={
                                                stateOfWorkFlow[status].color
                                            }
                                            onClick={() => {
                                                showModal(), setCylce(cylce);
                                            }}
                                            style={{
                                                borderRadius: "999px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            {stateOfWorkFlow[status].name}
                                        </Tag>
                                    )}
                                </>
                            ),
                        },
                        {
                            title: "Action",
                            dataIndex: "action",
                            key: "action",
                            render: (_, record) => (
                                <Space size="middle">
                                    <a
                                        href={`/cws/preview/${record.key}`}
                                        className="flex items-center text-green-500 hover:text-green-700"
                                        target="_blank"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-1 rtl:ml-1"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M11.9999 16.3299C9.60992 16.3299 7.66992 14.3899 7.66992 11.9999C7.66992 9.60992 9.60992 7.66992 11.9999 7.66992C14.3899 7.66992 16.3299 9.60992 16.3299 11.9999C16.3299 14.3899 14.3899 16.3299 11.9999 16.3299ZM11.9999 9.16992C10.4399 9.16992 9.16992 10.4399 9.16992 11.9999C9.16992 13.5599 10.4399 14.8299 11.9999 14.8299C13.5599 14.8299 14.8299 13.5599 14.8299 11.9999C14.8299 10.4399 13.5599 9.16992 11.9999 9.16992Z" />
                                            <path d="M12.0001 21.02C8.24008 21.02 4.69008 18.82 2.25008 15C1.19008 13.35 1.19008 10.66 2.25008 8.99998C4.70008 5.17998 8.25008 2.97998 12.0001 2.97998C15.7501 2.97998 19.3001 5.17998 21.7401 8.99998C22.8001 10.65 22.8001 13.34 21.7401 15C19.3001 18.82 15.7501 21.02 12.0001 21.02ZM12.0001 4.47998C8.77008 4.47998 5.68008 6.41998 3.52008 9.80998C2.77008 10.98 2.77008 13.02 3.52008 14.19C5.68008 17.58 8.77008 19.52 12.0001 19.52C15.2301 19.52 18.3201 17.58 20.4801 14.19C21.2301 13.02 21.2301 10.98 20.4801 9.80998C18.3201 6.41998 15.2301 4.47998 12.0001 4.47998Z" />
                                        </svg>
                                        Preview
                                    </a>
                                    <Link
                                        href={`/user/index_subcontractor_inv/${record.key}`}
                                    >
                                        Invoices
                                    </Link>
                                </Space>
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
