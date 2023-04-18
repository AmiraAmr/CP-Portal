import React, { useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import { Button, Pagination, Space, Steps, Table, Tag } from "antd";
import { stateOfWorkFlow } from "@/Components/States";
import { router, Link } from "@inertiajs/react";
import { showDeleteConfirm } from "@/Components/ModalDelete";
import Workflow from "./Partials/Workflow";
import Status from "@/Components/Status";
import DropdownButton from "@/Components/DropdownButton";

const Index = (props) => {
    const { Step } = Steps;
    const [cylce, setCylce] = useState([]);
    const [status, setStatus] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState({});
    const [rows, setRows] = useState([]);
    const [openWorkflow, setOpenWorkflow] = useState(false);

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
            .post(`/managers/service/json?page=${filter.page}`, formData)
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
                        key: item.service.id,
                        code: item.service.ref,
                        date: item.service.date,
                        description: item.service.subject,
                        total: item.service.total,
                        user: item.service.user ? item.service.user.name : '',
                        employee: item.service.employee ? item.service.employee.name : '',
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
                        Services
                    </span>
                </div>
                <div className="mb-3 bg-white px-6 py-3 rounded-md flex items-center gap-3">
                    <Button onClick={() => setOpenWorkflow(!openWorkflow)}>Setting</Button>
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
                        },
                        {
                            title: "User",
                            dataIndex: "user",
                            key: "user",
                        },
                        {
                            title: "Employee",
                            dataIndex: "employee",
                            key: "employee",
                        },
                        {
                            title: "Description",
                            dataIndex: "description",
                            key: "description",
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
                            title: "Total",
                            dataIndex: "total",
                            key: "total",
                        },
                        {
                            title: "Status",
                            dataIndex: "status",
                            key: "status",
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
                                            href: `/managers/service/preview/${record.key}`
                                        },
                                        {
                                            label: "Edit",
                                            href: `/managers/service/update/${record.key}`
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
                    total={data?.total}
                    pageSize={data.per_page ? data.per_page : 0}
                    onChange={onChange}
                    current={data?.current_page}
                />
                <Workflow open={openWorkflow} setOpen={setOpenWorkflow} />
            </div>
        </ManagementLayout>
    );
};

export default Index;
