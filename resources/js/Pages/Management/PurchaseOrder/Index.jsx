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
import Workflow from "./Partials/Workflow";

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
        ref: "",
        project_id: "",
        page: 1,
        from: "",
        to: "",
        size: 10,
        delivery_date: "",
        supplier_id: "",
        user_id: "",
    });

    const fetch = () => {
        let formData = new FormData();

        if (filter.project_id) {
            formData.append("project_id", filter.project_id);
        }
        if (filter.to) {
            formData.append("to", filter.to);
        }
        if (filter.from) {
            formData.append("from", filter.from);
        }
        if (filter.supplier_id) {
            formData.append("supplier_id", filter.supplier_id);
        }
        if (filter.delivery_date) {
            formData.append("delivery_date", filter.delivery_date);
        }
        if (filter.ref) {
            formData.append("ref", filter.ref);
        }
        if (filter.user_id) {
            formData.append("user_id", filter.user_id);
        }
        formData.append("size", filter.size);

        axios
            .post(`/managers/returnjsonpurchase?page=${filter.page}`, formData)
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
                        key: item.purchase_order.id,
                        id: item.purchase_order.id,
                        name: item.name,
                        code: item.purchase_order.ref,
                        date: item.purchase_order.date,
                        user: item.purchase_order.user
                            ? item.purchase_order.user.name
                            : null,
                        description: item.purchase_order.subject,
                        delivery_date: item.purchase_order.delivery_date
                            ? item.purchase_order.delivery_date
                            : "unknown",
                        delivery_feedback: item.purchase_order.delivery_date
                            ? {
                                  delivery_date:
                                      item.purchase_order.delivery_date,
                                  closed: item.purchase_order.closed,
                              }
                            : "unknown",
                        vat: item.purchase_order.vat,
                        total: item.purchase_order.total,
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
                <div className="mb-3 bg-white px-6 py-3 rounded-md flex items-center gap-3">
                    <Button onClick={() => setOpenWorkflow(!openWorkflow)}>
                        Setting
                    </Button>
                    <Button>Export</Button>
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
                            title: "User",
                            dataIndex: "user",
                            key: "user",
                            responsive: ["xl"],
                        },
                        {
                            title: "Description",
                            dataIndex: "description",
                            key: "description",
                            responsive: ["xl"],
                        },
                        {
                            title: "Delivery date",
                            dataIndex: "delivery_date",
                            key: "delivery_date",
                            responsive: ["xl"],
                        },
                        {
                            title: "Delivery feedback",
                            dataIndex: "delivery_feedback",
                            key: "delivery_feedback",
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
                                    <a
                                        href={`/managers/purchase_orderreturn/${record.id}`}
                                        className="flex items-center text-green-500 hover:text-green-700"
                                        target={"_blank"}
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
                                        href={`/managers/update_purchase_order/${record.id}`}
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
                                    <a className="text-sm">
                                        Forward to the daily report
                                    </a>
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

                <Workflow open={openWorkflow} setOpen={setOpenWorkflow} />
            </div>
        </ManagementLayout>
    );
};

export default Index;
