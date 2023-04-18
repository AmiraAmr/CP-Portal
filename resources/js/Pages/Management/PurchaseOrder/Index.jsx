import React, { useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import {
    Alert,
    Button,
    Table,
} from "antd";
import axios from "axios";
import Filter from "./Partials/Filter";
import Workflow from "./Partials/Workflow";
import Status from "@/Components/Status";
import DropdownButton from "@/Components/DropdownButton";

const Index = (props) => {
    const [openWorkflow, setOpenWorkflow] = useState(false);

    const [data, setData] = useState({});
    const [rows, setRows] = useState([]);

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
                                            href: `/managers/purchase_orderreturn/${record.id}`
                                        },
                                        {
                                            label: "Edit",
                                            href: `/managers/update_purchase_order/${record.id}`
                                        }
                                    ]}
                                />
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
