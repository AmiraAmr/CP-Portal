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
import Edit from "./Edit";

const Index = (props) => {
    const [editData, setEditData] = useState({})
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
                        vat: item.tax_number,
                        phone: item.phone,
                        city: item.city,
                        country: "السعودية",
                        data: item,
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
                        Suppliers
                    </span>
                    <Link href="/createsupplier">
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
                            title: "Vat",
                            dataIndex: "vat",
                            key: "vat",
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
                                <Space size="middle">
                                    <button
                                        className="flex items-center text-blue-500 hover:text-blue-700"
                                        onClick={() => {
                                            setEditData(record.data)
                                            setIsModalOpen(true)
                                        }}
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
                                    </button>
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
            </div>
            <Edit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} editData={editData}/>
        </AuthenticatedLayout>
    );
};

export default Index;
