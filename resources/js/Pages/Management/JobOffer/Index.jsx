import React, { useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import { Button, Pagination, Steps, Table } from "antd";
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
    const onChange = (e) => {
        setFilter((prev) => {
            return { ...prev, page: e };
        });
    };

    const fetch = () => {
        axios
            .post(`/managers/joboffer/json?page=${filter.page}`)
            .then((res) => {
                setData(res.data.data);
            });
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
    useEffect(() => {
        fetch();
    }, [filter]);
    useEffect(() => {
        setRows([]);
        data?.data?.map((item) => {
            setRows((prev) => {
                return [
                    ...prev,
                    {
                        key: item.joboffer.id,
                        ref: item.joboffer.ref,
                        date: item.joboffer.date,
                        subject: item.joboffer.subject,
                        status: item.status,
                        salary: item.joboffer.salary,
                    },
                ];
            });
        });
    }, [data]);

    return (
        <ManagementLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Job Offer
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
                <div className="mb-3 bg-white px-6 py-3 rounded-md flex items-center gap-3">
                    <Button onClick={() => setOpenWorkflow(!openWorkflow)}>
                        Setting
                    </Button>
                </div>
                <Table
                    columns={[
                        {
                            title: "Ref",
                            dataIndex: "ref",
                            key: "ref",
                        },
                        {
                            title: "Date",
                            dataIndex: "date",
                            key: "date",
                        },
                        {
                            title: "Subject",
                            dataIndex: "subject",
                            key: "subject",
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
                            title: "Salary",
                            dataIndex: "salary",
                            key: "salary",
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
                                            href: `/managers/joboffer/preview/${record.key}`
                                        },
                                        {
                                            label: "Edit",
                                            href: `/managers/joboffer/update/${record.key}`
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
