import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
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
                            : item.contractor_name,
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
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Contractors
                    </span>
                    <Link href="/contractorcpage">
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
                        },
                        {
                            title: "Phone",
                            dataIndex: "phone",
                            key: "phone",
                        },
                        {
                            title: "City",
                            dataIndex: "city",
                            key: "city",
                        },
                        {
                            title: "Country",
                            dataIndex: "country",
                            key: "country",
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
                                            href: `/contractor/update/${record.key}`
                                        },
                                        {
                                            label: "Delete",
                                            action: () => showDeleteConfirm(
                                                "/deletecontractor/",
                                                record.key,
                                                'user.contractorindex'
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
        </AuthenticatedLayout>
    );
};

export default Index;
