import React, { useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import {
    Alert,
    Steps,
    Table,
} from "antd";
import { router } from "@inertiajs/react";
import { showDeleteConfirm } from "@/Components/ModalDelete";
import axios from "axios";
import Status from "@/Components/Status";
import DropdownButton from "@/Components/DropdownButton";

const Index = (props) => {
    const { Step } = Steps;
    const [status, setStatus] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState({});

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
            .post(
                `/managers/daily_report/json_daily_Report?page=${filter.page}`,
                formData
            )
            .then((res) => {
                setData(res.data.data);
            });
    };

    useEffect(() => {
        setRows([]);
        data?.data?.map((item) => {
            setRows((prev) => {
                return [
                    ...prev,
                    {
                        key: item.id,
                        code: item.ref,
                        date: item.date,
                        work_area: item.The_scope_of_work,
                        supervisor: item.supervisor
                            ? item.supervisor.name
                            : "Unknown",
                        project: item.project ? item.project.name : "Unknown",
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
                        Daily Report
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
                            title: "The scope of work",
                            dataIndex: "work_area",
                            key: "work_area",
                        },
                        {
                            title: "Supervisor",
                            dataIndex: "supervisor",
                            key: "supervisor",
                        },
                        {
                            title: "Project",
                            dataIndex: "project",
                            key: "project",
                        },
                        {
                            title: "Status",
                            dataIndex: "status",
                            key: "status",
                            render: (_, { status }) => (
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
                                            href: `/managers/daily_report/preview/${record.key}`
                                        },
                                        {
                                            label: "Edit",
                                            href: `/managers/daily_report/edit/${record.key}`
                                        },
                                        {
                                            label: "Delete",
                                            action: () => showDeleteConfirm(
                                                "/managers/daily_report/delete/",
                                                record.key,
                                                "daily_report_index.managers"
                                            )
                                        }
                                    ]}
                                />
                            ),
                        },
                    ]}
                    dataSource={rows}
                    pagination={{
                        showQuickJumper: true,
                        defaultCurrent: 1,
                        total: data?.total,
                        pageSize: data?.per_page,
                        onChange: onChange,
                        current: data?.current_page,
                    }}
                />
            </div>
        </ManagementLayout>
    );
};

export default Index;
