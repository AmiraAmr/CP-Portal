import React, { useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import {
    Alert,
    Table,
} from "antd";
import axios from "axios";
import moment from "moment";
import Filter from "./Partials/Filter";
import Status from "@/Components/Status";
import DropdownButton from "@/Components/DropdownButton";

const Index = (props) => {

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
            .post(`/managers/report/daily/financial/json?page=${filter.page}`, formData)
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
                        date: item.date,
                        total: item.total,
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
        <ManagementLayout
            auth={props.auth}
            errors={props.errors}
            header={
            <span className="text-lg text-gray-700 font-semibold">
                Daily Financial Report
            </span>}
        >
            <div className="space-y-3">

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
                                            href: `/managers/report/daily/financial/preview/${record.key}`
                                        },
                                        {
                                            label: "Edit",
                                            href: `/managers/report/daily/financial/update/${record.key}`
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
            </div>
        </ManagementLayout>
    );
};

export default Index;
