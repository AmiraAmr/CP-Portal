import React, { useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import {
    Alert,
    Button,
    Modal,
    Pagination,
    Space,
    Steps,
    Table,
    Tag,
} from "antd";
import { router, Link } from "@inertiajs/react";
import { showDeleteConfirm } from "@/Components/ModalDelete";
import DropdownButton from "@/Components/DropdownButton";

const Index = (props) => {
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

    useEffect(() => {
        setRows([]);
        props.data.data.map((item) => {
            setRows((prev) => {
                return [
                    ...prev,
                    {
                        key: item.id,
                        contractor: item.comp
                            ? item.comp
                            : item.customer_name,
                        email: item.email,
                        phone: item.phone,
                        city: item.city,
                        country: item.country,
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
                        Customers
                    </span>
                    <Link href="/managers/addcpage">
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
                            title: "Contractor",
                            dataIndex: "contractor",
                            key: "contractor",
                        },
                        {
                            title: "E-Mail",
                            dataIndex: "email",
                            key: "email",
                            responsive: ['lg']
                        },
                        {
                            title: "Phone",
                            dataIndex: "phone",
                            key: "phone",
                            responsive: ['lg']
                        },
                        {
                            title: "City",
                            dataIndex: "city",
                            key: "city",
                            responsive: ['md']
                        },
                        {
                            title: "Country",
                            dataIndex: "country",
                            key: "country",
                            responsive: ['sm']
                        },
                        {
                            title: "Action",
                            dataIndex: "action",
                            key: "action",
                            render: (_, record) => (
                                <DropdownButton buttonTitle={"Actions"}
                                    actions={[
                                        {
                                            label: "Edit",
                                            href: `/managers/customer/update/${record.key}`
                                        },
                                        {
                                            label: "Delete",
                                            action: () => (
                                                showDeleteConfirm(
                                                    "/managers/deletecustomer/",
                                                    record.key,
                                                    "customerindex"
                                                )
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
            </div>
        </ManagementLayout>
    );
};

export default Index;
