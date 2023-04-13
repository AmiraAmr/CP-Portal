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
        date: "",
        project_id: "",
        code: '',
        page: 1,
        size: 10,

    });

    const fetch = () => {

        axios
            .post(`/managers/invoice/jsonInvoice?page=${filter.page}`, filter)
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
                        code: item.code,
                        date: item.date,
                        description: item.description,
                        project: item.project ? item.project.name : 'Unknown',
                        vat: item.vat,
                        total: item.total,
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
                        Purchase Order
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
                            title: "Code",
                            dataIndex: "code",
                            key: "code",
                        },
                        {
                            title: "Date",
                            dataIndex: "date",
                            key: "date",
                            responsive: ["xl"],
                        },
                        {
                            title: "Description",
                            dataIndex: "description",
                            key: "description",
                            responsive: ["xl"],
                        },
                        {
                            title: "Project",
                            dataIndex: "project",
                            key: "project",
                            responsive: ["xl"],
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
                                <Space size="middle">

                                    <Link
                                        href={`/managers/invoice/edit/${record.key}`}
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
