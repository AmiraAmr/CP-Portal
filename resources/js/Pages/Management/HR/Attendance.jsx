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

        if (filter.supervisor) {
            formData.append("supervisor", filter.supervisor);
        }

        if (filter.date) {
            formData.append("date", filter.date);
        }

        if (filter.name) {
            formData.append("name", filter.name);
        }

        if (filter.project) {
            formData.append("project", filter.project);
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
        data.data?.map((item) => {
            setRows((prev) => {
                return [
                    ...prev,
                    {
                        key: item.id,
                        code: item.ref,
                        user: item.user ? item.user.name : "Unknown",
                        project:
                            item.user &&
                            item.user.contract &&
                            item.user.contract.project
                                ? item.user.contract.project.name
                                : "Unknown",
                        hours: (Number(item.time_difference) / 60).toFixed(2),
                        attend: item.attending_time,
                        gone: item.attending_leaving,
                        scanned_by: item.scanned ? item.scanned.name : 'unknown',
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
                        Attendance List
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
                        users={props.users}
                    />
                </div>
                <Table
                    columns={[
                        {
                            title: "User",
                            dataIndex: "user",
                            key: "user",
                        },
                        {
                            title: "Project",
                            dataIndex: "project",
                            key: "project",
                            responsive: ["xl"],
                        },
                        {
                            title: "Attend",
                            dataIndex: "attend",
                            key: "attend",
                            responsive: ["lg"],
                        },
                        {
                            title: "Gone",
                            dataIndex: "gone",
                            key: "gone",
                            responsive: ["lg"],
                        },
                        {
                            title: "Hours",
                            dataIndex: "hours",
                            key: "hours",
                            responsive: ["lg"],
                        },
                        {
                            title: "Scanned by",
                            dataIndex: "scanned_by",
                            key: "scanned_by",
                            responsive: ["lg"],
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
