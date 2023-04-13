import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button, Modal, Pagination, Space, Steps, Table, Tag } from "antd";
import { stateOfWorkFlow } from "@/Components/States";
import { router, Link } from "@inertiajs/react";
import { showDeleteConfirm } from "@/Components/ModalDelete";
import useApi from "./useApi";
import moment from "moment";
const Salaries = ({ name, filter, workflow, cols }) => {
    const { Step } = Steps;
    const [cylce, setCylce] = useState([]);
    const [status, setStatus] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [defaultRows, setDefaultRows] = useState([]);

    const [page, setPage] = useState(1);

    const [urlData, setUrlData] = useState(
        `/managers/jsonSalaries?page=${page}`
    );
    const onChange = (e) => {
        setPage(e);
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

    const fetch = async (filter) => {
        const dataFromApi = await useApi(urlData, filter);
        setData(dataFromApi);
    };

    const today = moment().format("DD/MM/YYYY");
    useEffect(() => {
        setUrlData(`/managers/jsonSalaries?page=${page}`);
    }, [page]);
    useEffect(() => {
        fetch(filter);
    }, [filter, urlData]);

    useEffect(() => {
        setDefaultRows([]);
        data.data?.map((item) => {
            setDefaultRows((prev) => {
                return [
                    ...prev,
                    {
                        key: item.id,
                        code: item.ref,
                        user_name: item.user.name,
                        date: item.date,
                        subject: item.subject,
                        status: item.status,
                        cylce: item[cylcePartials],
                        vat: item.vat,
                        total: item.total,
                        delivery_date: item.delivery_date
                            ? item.delivery_date
                            : "unknown",
                        delivery_feedback: item.delivery_date
                            ? {
                                  delivery_date: item.delivery_date,
                                  closed: data.closed,
                              }
                            : "unknown",
                    },
                ];
            });
        });
    }, [data]);

    return (
        <div className="space-y-4 bg-white p-4 rounded-md">
            <div className="flex items-center justify-between">
                <span className="text-base text-gray-700 font-medium">
                    {name}
                </span>
            </div>
            <Table
                columns={[
                    {
                        title: "Name",
                        dataIndex: "name",
                        key: "name",
                    },
                    {
                        title: "Basic Salary",
                        dataIndex: "salary_per_month",
                        key: "salary_per_month",
                    },
                    {
                        title: "Salary / Day",
                        dataIndex: "salary_per_Day",
                        key: "salary_per_Day",
                    },
                    {
                        title: "Salary / Hour",
                        dataIndex: "salary_hour",
                        key: "salary_hour",
                    },
                    {
                        title: "Transportation Allowance",
                        dataIndex: "transportation_allowance",
                        key: "transportation_allowance",
                    },
                    {
                        title: "Communication Allowance",
                        dataIndex: "communication_allowance",
                        key: "communication_allowance",
                    },
                    {
                        title: "Food Allowance",
                        dataIndex: "food_allowance",
                        key: "food_allowance",
                    },
                    {
                        title: "Other Allowance",
                        dataIndex: "other_allowance",
                        key: "other_allowance",
                    },
                    {
                        title: "Working Hour on ",
                        dataIndex: "whoc",
                        key: "whoc",
                    },
                    {
                        title: "Working Hour",
                        dataIndex: "working_hour",
                        key: "working_hour",
                    },
                    {
                        title: "Over Time",
                        dataIndex: "over_time",
                        key: "over_time",
                    },
                    {
                        title: "Deduction",
                        dataIndex: "deduction",
                        key: "deduction",
                    },
                    {
                        title: "Amount",
                        dataIndex: "amount",
                        key: "amount",
                    },
                    {
                        title: "Approved by",
                        dataIndex: "user_aproved_by",
                        key: "user_aproved_by",
                    },
                ]}
                dataSource={defaultRows}
                pagination={{ hideOnSinglePage: true }}
                mobileBreakPoint={768}
                className="border rounded overflow-x-auto scrollbar"
            />
            <Pagination
                style={{ color: "#000" }}
                showQuickJumper
                defaultCurrent={1}
                total={data?.total ? data?.total : 0}
                pageSize={data?.per_page ? data?.per_page : 0}
                onChange={onChange}
                current={data?.current_page ? data?.current_page : 0}
            />
        </div>
    );
};

export default Salaries;
