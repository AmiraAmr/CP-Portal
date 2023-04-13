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
import axios from "axios";
import moment from "moment";

const Index = (props) => {
    const [data, setData] = useState({});
    const [rows, setRows] = useState([]);
    const onChange = (e) => {
        setFilter((prev) => {
            return { ...prev, page: e };
        });
    };

    const [filter, setFilter] = useState({
        name: "",
        project_id: "",
        page: 1,
        from: moment().startOf("month").format("YYYY-MM-DD"),
        to: moment().endOf("month").format("YYYY-MM-DD"),
    });
    const fetch = () => {
        axios
            .get(
                `/project_manager/laborer/json?name=${filter.name}&project_id=${filter.project_id}&from=${filter.from}&to=${filter.to}&page=${filter.page}`,
                {
                    name: filter.name,
                    project_id: filter.project_id,
                }
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
                        name: item.name,
                    },
                ];
            });
        });
    }, [data]);
    useEffect(() => {
        fetch();
    }, [filter]);
    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Laborers
                    </span>
                    <Link href="/project_manager/laborer/create">
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
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 bg-white p-4 rounded-md">
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            value={filter.name}
                            onChange={(e) =>
                                setFilter((prev) => {
                                    return {
                                        ...prev,
                                        name: e.target.value,
                                    };
                                })
                            }
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Project
                        </label>
                        <select
                            id="project"
                            className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="project_id"
                            value={filter.project_id}
                            onChange={(e) =>
                                setFilter((prev) => {
                                    return {
                                        ...prev,
                                        project_id: e.target.value,
                                    };
                                })
                            }
                        >
                            <option>Choose a project</option>
                            {props.projects.map((project) => {
                                return (
                                    <option key={project.id} value={project.id}>
                                        {project.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <Table
                    columns={[
                        {
                            title: "Name",
                            dataIndex: "name",
                            key: "name",
                        },
                        {
                            title: "Action",
                            dataIndex: "action",
                            key: "action",
                            render: (_, record) => (
                                <Space size="middle">
                                    <Link
                                        href={`/project_manager/laborer/edit/${record.key}`}
                                        className="flex items-center text-blue-500 hover:text-blue-700"
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
                                    </Link>
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
                    total={data?.total}
                    pageSize={data.per_page ? data.per_page : 0}
                    onChange={onChange}
                    current={data?.current_page}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
