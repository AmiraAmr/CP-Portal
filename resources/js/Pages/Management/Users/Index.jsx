import React, { useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import {
    Alert,
    Button,
    DatePicker,
    Dropdown,
    message,
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
import ModalAttendance from "./Partials/ModalAttendance";

const Index = (props) => {
    const [attendanceUser, setAttendanceUser] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = (user) => {
        setIsModalOpen(true);
        setAttendanceUser(user);
    };

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
        employee: "",
        project_id: "",
        page: 1,
        identity_date: "",
        contract_ex: "",
        size: 10,
        contract_date: "",
        laborer: "",
        role_id: "",
    });

    const fetch = () => {
        let formData = new FormData();

        if (filter.project_id) {
            formData.append("project_id", filter.project_id);
        }
        if (filter.laborer) {
            formData.append("laborer", filter.laborer);
        }
        if (filter.role_id) {
            formData.append("role_id", filter.role_id);
        }
        if (filter.contract_date) {
            formData.append("contract_date", filter.contract_date);
        }
        if (filter.contract_ex) {
            formData.append("contract_ex", filter.contract_ex);
        }

        if (filter.identity_date) {
            formData.append("identity_date", filter.identity_date);
        }
        if (filter.employee) {
            formData.append("name", filter.employee);
        }
        formData.append("size", filter.size);

        axios
            .post(`/managers/user/jsonUser?page=${filter.page}`, formData)
            .then((res) => {
                setData(res.data.data);
            });
    };

    const handleChange = (id, type, role, name) => {
        if (type == "admin") {
            axios.post(`/admin/user/adminornot/${id}`).then((res) => {
                if (role == 1) {
                    message.success(`${name} is now a user`, 2);
                } else {
                    message.success(`${name} is now a admin`, 2);
                }
                const newData = data?.data.map((item) => {
                    if (item.id == id) {
                        item.admin = role == 1 ? 0 : 1;
                    }
                    return item;
                });
                setData((prev) => {
                    return { ...prev, data: newData };
                });
            });
        } else if (type == "manager") {
            axios.post(`/admin/user/managerornot/${id}`).then((res) => {
                if (role == 1) {
                    message.success(`${name} is now a user`, 2);
                } else {
                    message.success(`${name} is now a manager`, 2);
                }
                const newData = data?.data.map((item) => {
                    if (item.id == id) {
                        item.manager = role == 1 ? 0 : 1;
                    }
                    return item;
                });
                setData((prev) => {
                    return { ...prev, data: newData };
                });
            });
        }
    };

    useEffect(() => {
        setRows([]);
        data.data?.map((item) => {
            setRows((prev) => {
                return [
                    ...prev,
                    {
                        key: item.id,
                        code: item.id,
                        name: item.name,
                        role: item.role ? item.role.name : "",
                        manager: item.manager,
                        admin: item.admin,
                        user: item,
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
                        Users
                    </span>
                    <Link href="/admin/user/rig">
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
                        roles={props.roles}
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
                            title: "Name",
                            dataIndex: "name",
                            key: "name",
                            responsive: ["xl"],
                        },
                        {
                            title: "Role",
                            dataIndex: "role",
                            key: "role",
                            responsive: ["xl"],
                        },
                        {
                            title: "Action",
                            dataIndex: "action",
                            key: "action",
                            render: (_, record) => (
                                <Space size="middle">
                                    <Dropdown.Button
                                        menu={{
                                            items: [
                                                {
                                                    label:
                                                        record.admin == 1
                                                            ? "Make User"
                                                            : "Make Admin",
                                                    key: "1",
                                                    onClick: () =>
                                                        handleChange(
                                                            record.key,
                                                            "admin",
                                                            record.admin,
                                                            record.name
                                                        ),
                                                },
                                                {
                                                    label: "attendance report",
                                                    key: "2",
                                                    onClick: () =>
                                                        router.get(
                                                            `/managers/performance/${record.key}`
                                                        ),
                                                },
                                                {
                                                    label: "profile",
                                                    key: "3",
                                                    onClick: () =>
                                                        router.get(
                                                            `/managers/HR/profile/${record.key}`
                                                        ),
                                                },
                                                {
                                                    label: `Attendance : ${record.name}`,
                                                    key: "4",
                                                    onClick: () =>
                                                        showModal(record.user),
                                                },
                                                {
                                                    label: "Delete",
                                                    key: "5",
                                                    onClick: () =>
                                                        showDeleteConfirm(
                                                            "/managers/user/",
                                                            record.key,
                                                            "user.usertable"
                                                        ),
                                                },
                                                {
                                                    label: "Edit",
                                                    key: "6",
                                                    onClick: () =>
                                                        router.get(
                                                            `/admin/user/edit/${record.key}`
                                                        ),
                                                },

                                                {
                                                    label:
                                                        record.manager == 1
                                                            ? "Make User"
                                                            : "Make Manager",
                                                    key: "8",
                                                    onClick: () =>
                                                        handleChange(
                                                            record.key,
                                                            "manager",
                                                            record.manager,
                                                            record.name
                                                        ),
                                                },
                                            ],
                                        }}
                                    ></Dropdown.Button>
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
            <ModalAttendance
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                user={attendanceUser}
            />
        </ManagementLayout>
    );
};

export default Index;
