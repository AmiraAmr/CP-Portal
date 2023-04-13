import React, { useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import {
    Alert,
    Button,
    DatePicker,
    Modal,
    Pagination,
    Space,
    Steps,
    Table,
    Tag,
} from "antd";
import { router, Link } from "@inertiajs/react";
import { showDeleteConfirm } from "@/Components/ModalDelete";
import axios from "axios";
import moment from "moment";
import { stateOfWorkFlow } from "@/Components/States";
import { SyncOutlined, CheckCircleOutlined } from "@ant-design/icons";
import Filter from "./Partials/Filter";

const Index = (props) => {
    const [openWorkflow, setOpenWorkflow] = useState(false);

    const [data, setData] = useState({});
    const [rows, setRows] = useState([]);
    const today = moment().format("DD/MM/YYYY");

    const onChange = (e) => {
        setFilter((prev) => {
            return { ...prev, page: e };
        });
    };

    const [filter, setFilter] = useState({
        dis: "",
        expires_in: "",
        page: 1,
        size: 10,
        name: "",
        point: "",
        start_at: "",
    });

    const fetch = () => {
        axios
            .post(`/managers/JsonTaskData?page=${filter.page}`, filter)
            .then((res) => {
                setData(res.data.data);
            });
    };

    useEffect(() => {
        setRows([]);
        data.data?.map((item) => {
            setRows((prev) => {
                return [
                    ...prev,
                    {
                        key: item.id,
                        name: item.name,

                        description: item.subject,
                        start_at: item.start_at,
                        expires_in: item.expires_in,
                        point: item.point,
                        status: item.status,
                    },
                ];
            });
        });
    }, [data]);

    useEffect(() => {
        fetch();
    }, [filter]);

    return (
        <ManagementLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Tasks
                    </span>
                    <Link href="/managers/task/Create">
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
                <div className="mb-3 bg-white px-6 py-3 rounded-md">
                    <Filter
                        filter={filter}
                        setFilter={setFilter}
                        projects={props.projects}
                        users={props.users}
                    />
                </div>
                <Table
                    columns={[
                        {
                            title: "Name",
                            dataIndex: "name",
                            key: "name",
                        },
                        {
                            title: "Description",
                            dataIndex: "description",
                            key: "description",
                            responsive: ["xl"],
                        },
                        {
                            title: "Start at",
                            dataIndex: "start_at",
                            key: "start_at",
                            responsive: ["xl"],
                        },
                        {
                            title: "Expires in",
                            dataIndex: "expires_in",
                            key: "expires_in",
                            responsive: ["xl"],
                        },
                        {
                            title: "Point",
                            dataIndex: "point",
                            key: "point",
                            responsive: ["xl"],
                        },
                        {
                            title: "Status",
                            dataIndex: "status",
                            key: "status",
                            responsive: ["sm"],
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
                                    <Link
                                        href={`/managers/task/editTask/${record.key}`}
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
                                    <button
                                        className="flex items-center text-red-500 hover:text-red-700"
                                        onClick={() =>
                                            showDeleteConfirm(
                                                "/managers/task/delete/",
                                                record.key,
                                                "task.index"
                                            )
                                        }
                                    >
                                        <svg
                                            className="w-4 h-4 mr-1 rtl:ml-1"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M21 6.73001C20.98 6.73001 20.95 6.73001 20.92 6.73001C15.63 6.20001 10.35 6.00001 5.12 6.53001L3.08 6.73001C2.66 6.77001 2.29 6.47001 2.25 6.05001C2.21 5.63001 2.51 5.27001 2.92 5.23001L4.96 5.03001C10.28 4.49001 15.67 4.70001 21.07 5.23001C21.48 5.27001 21.78 5.64001 21.74 6.05001C21.71 6.44001 21.38 6.73001 21 6.73001Z" />
                                            <path d="M8.5 5.72C8.46 5.72 8.42 5.72 8.37 5.71C7.97 5.64 7.69 5.25 7.76 4.85L7.98 3.54C8.14 2.58 8.36 1.25 10.69 1.25H13.31C15.65 1.25 15.87 2.63 16.02 3.55L16.24 4.85C16.31 5.26 16.03 5.65 15.63 5.71C15.22 5.78 14.83 5.5 14.77 5.1L14.55 3.8C14.41 2.93 14.38 2.76 13.32 2.76H10.7C9.64 2.76 9.62 2.9 9.47 3.79L9.24 5.09C9.18 5.46 8.86 5.72 8.5 5.72Z" />
                                            <path d="M15.21 22.75H8.79C5.3 22.75 5.16 20.82 5.05 19.26L4.4 9.19001C4.37 8.78001 4.69 8.42001 5.1 8.39001C5.52 8.37001 5.87 8.68001 5.9 9.09001L6.55 19.16C6.66 20.68 6.7 21.25 8.79 21.25H15.21C17.31 21.25 17.35 20.68 17.45 19.16L18.1 9.09001C18.13 8.68001 18.49 8.37001 18.9 8.39001C19.31 8.42001 19.63 8.77001 19.6 9.19001L18.95 19.26C18.84 20.82 18.7 22.75 15.21 22.75Z" />
                                            <path d="M13.66 17.25H10.33C9.92 17.25 9.58 16.91 9.58 16.5C9.58 16.09 9.92 15.75 10.33 15.75H13.66C14.07 15.75 14.41 16.09 14.41 16.5C14.41 16.91 14.07 17.25 13.66 17.25Z" />
                                            <path d="M14.5 13.25H9.5C9.09 13.25 8.75 12.91 8.75 12.5C8.75 12.09 9.09 11.75 9.5 11.75H14.5C14.91 11.75 15.25 12.09 15.25 12.5C15.25 12.91 14.91 13.25 14.5 13.25Z" />
                                        </svg>
                                        Delete
                                    </button>
                                </Space>
                            ),
                        },
                    ]}
                    dataSource={rows}
                    pagination={{
                        position: ["bottomLeft"],
                        hideOnSinglePage: true,
                        showQuickJumper: true,
                        defaultCurrent: 1,
                        total: data?.total,
                        pageSize: data.per_page ? data.per_page : 0,
                        onChange: onChange,
                        current: data?.current_page,
                        onShowSizeChange: (current, size) =>
                            setFilter((prev) => {
                                return { ...prev, size: size };
                            }),
                    }}
                />
            </div>
        </ManagementLayout>
    );
};

export default Index;
