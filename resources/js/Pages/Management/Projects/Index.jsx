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
import Edit from "./Edit";
import Create from "./Create";
import DropdownButton from "@/Components/DropdownButton";

const Index = (props) => {
    const [editData, setEditData] = useState({});
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
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
                        code: item.id,
                        name: item.name,

                        data: item,
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
                        Projects
                    </span>
                    <Button
                        type="primary"
                        onClick={() => setIsModalCreateOpen(true)}
                    >
                        Create
                    </Button>
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
                            title: "Code",
                            dataIndex: "code",
                            key: "code",
                        },
                        {
                            title: "Name",
                            dataIndex: "name",
                            key: "name",
                            responsive: ["lg"],
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
                                            action: () => {
                                                setEditData(record.data);
                                                setIsModalEditOpen(true);
                                            }
                                        },
                                        {
                                            label: "Delete",
                                            action: () => showDeleteConfirm(
                                                "/admin/delete_project/",
                                                record.key,
                                                "project.index"
                                            )
                                        },
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
                    showSizeChanger={false}
                    showQuickJumper
                    defaultCurrent={1}
                    total={props.data.total}
                    pageSize={props.data.per_page}
                    onChange={onChange}
                    current={props.data.current_page}
                />
            </div>
            <Edit
                isModalOpen={isModalEditOpen}
                setIsModalOpen={setIsModalEditOpen}
                editData={editData}
                users={props.users}
            />
            <Create
                isModalOpen={isModalCreateOpen}
                setIsModalOpen={setIsModalCreateOpen}
                editData={editData}
                users={props.users}
            />
        </ManagementLayout>
    );
};

export default Index;
