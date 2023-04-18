import React, { useEffect, useState } from "react";
import { Pagination, Space, Steps, Table, Tag } from "antd";
import useApi from "./useApi";
import moment from "moment";
import Status from "@/Components/Status";
const Partials = ({ name, cylcePartials, url, filter, workflow, cols }) => {
    const { Step } = Steps;
    const [cylce, setCylce] = useState([]);
    const [status, setStatus] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [defaultRows, setDefaultRows] = useState([]);

    const [page, setPage] = useState(1);

    const [urlData, setUrlData] = useState(url + `?page=${page}`);
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
        setUrlData(url + `?page=${page}`);
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

    useEffect(() => {
        setStatus([]);
        cylce?.map((step) => {
            if (step.status == 0) {
                setStatus((prev) => {
                    return [...prev, "process"];
                });
            } else if (step.status == 1) {
                setStatus((prev) => {
                    return [...prev, "finish"];
                });
            } else if (step.status == 2) {
                setStatus((prev) => {
                    return [...prev, "error"];
                });
            } else if (step.status == 3) {
                setStatus((prev) => {
                    return [...prev, "wait"];
                });
            }
        });
    }, [cylce]);

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
                        title: "Code",
                        dataIndex: "code",
                        key: "code",
                    },
                    {
                        title: "Date",
                        dataIndex: "date",
                        key: "date",
                        responsive: ["lg"],
                    },
                    {
                        title: "User",
                        dataIndex: "user_name",
                        key: "user_name",
                        responsive: ["md"],
                    },
                    {
                        title: "Description",
                        dataIndex: "description",
                        key: "description",
                        responsive: ["xl"],
                        width: "30%",
                        render: (_, { subject }) => (
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
                                    {subject}
                                </p>
                            </>
                        ),
                    },
                    ...cols,
                    {
                        title: "Status",
                        dataIndex: "status",
                        key: "status",
                        responsive: ["sm"],
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
                ]}
                dataSource={defaultRows}
                pagination={{ hideOnSinglePage: true }}
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

export default Partials;
