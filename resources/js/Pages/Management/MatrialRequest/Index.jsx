import React, { useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import {
    Alert,
    Button,
    Dropdown,
    message,
    Modal,
    Pagination,
    Space,
    Steps,
    Table,
    Tag,
} from "antd";
import { stateOfWorkFlow } from "@/Components/States";
import { router, Link } from "@inertiajs/react";
import { showDeleteConfirm } from "@/Components/ModalDelete";
import Workflow from "./Partials/Workflow";
import axios from "axios";
import Status from "@/Components/Status";
import DropdownButton from "@/Components/DropdownButton";

const Index = (props) => {
    const { Step } = Steps;
    const [cylce, setCylce] = useState([]);
    const [status, setStatus] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openWorkflow, setOpenWorkflow] = useState(false);

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

    const forwardToPetty_cash = (id) => {
        axios({
            method: "post",
            url: "/managers/forwardToPetty_cash/" + id,
        }).then((res) => {
            message.success("Done!");
        });
    };
    const forwardToPo = (id) => {
        axios({
            method: "post",
            url: "/managers/forwardToPo/" + id,
        }).then((res) => {
            message.success("Done!");
        });
    };

    useEffect(() => {
        setRows([]);
        props.data.data.map((item) => {
            setRows((prev) => {
                return [
                    ...prev,
                    {
                        key: item.matrial_request.id,
                        code: item.matrial_request.ref,
                        date: item.matrial_request.date,
                        description: item.matrial_request.content,
                        status: item.status,
                        project: item.matrial_request.project.name,
                    },
                ];
            });
        });
    }, []);

    return (
        <ManagementLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Matrial request
                    </span>
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
                <div className="mb-3 bg-white px-6 py-3 rounded-md flex items-center gap-3">
                    <Button onClick={() => setOpenWorkflow(!openWorkflow)}>
                        Setting
                    </Button>
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
                            responsive: ["md"],
                        },
                        {
                            title: "Description",
                            dataIndex: "description",
                            key: "description",
                            width: "40%",
                            responsive: ["lg"],
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
                            title: "Project",
                            dataIndex: "project",
                            key: "project",
                            responsive: ["md"],
                        },
                        {
                            title: "Status",
                            dataIndex: "status",
                            key: "status",
                            responsive: ["sm"],
                            render: (_, { status, cylce }) => (
                                <>
                                    {status !== null && (
                                        <Status status={status} />
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
                                            action: () =>
                                                router.get(
                                                    `/managers/matrial_requestreturn/${record.key}`
                                                ),
                                        },
                                        {
                                            label: "Edit",
                                            action: () =>
                                                router.get(
                                                    `/managers/update_matrial/${record.key}`
                                                ),
                                        },
                                        {
                                            label: `forward To Po`,
                                            action: () =>
                                                forwardToPo(record.key),
                                        },
                                        {
                                            label: `forwardToPC`,
                                            action: () =>
                                                forwardToPetty_cash(
                                                    record.key
                                                ),
                                        },
                                        {
                                            label: "Delete",
                                            action: () =>
                                                showDeleteConfirm(
                                                    "/user/delete_matrial_request_data/",
                                                    record.key,
                                                    "managers.index_matrial_request"
                                                ),
                                        },
                                    ]}
                                />
                            ),
                        },
                    ]}
                    className="border border-b-0 rounded-sm"
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
            </div>
            <Workflow open={openWorkflow} setOpen={setOpenWorkflow} />
        </ManagementLayout>
    );
};

export default Index;
