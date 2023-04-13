import React, { Fragment, useEffect, useState } from "react";
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
import { router, Link, useForm } from "@inertiajs/react";
import { showDeleteConfirm } from "@/Components/ModalDelete";
import axios from "axios";

const Index = (props) => {
    const [rows, setRows] = useState([]);
    const [isAttendance, setIsAttendance] = useState();
    const [users, setUsers] = useState([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        project_id: "",
        type: "",
        from: "",
        to: "",
        day: "",
    });
    const onChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const getUsers = () => {
        setUsers([]);
        axios({
            url: "/managers/sortUsersByProject/" + data.project_id,
            method: "post",
        }).then((res) => {
            if (Array.isArray(res.data.data)) {
                res.data.data.forEach((n) => {
                    n.forEach((z) => {
                        setUsers((prev) => {
                            return [...prev, z];
                        });
                    });
                });
            } else {
                let vm = [];
                Object.keys(res.data.data).map((n) => {
                    setUsers((prev) => {
                        return [...prev, res.data.data[n]];
                    });
                });
            }
        });
    };

    const submit = () => {
        const formData = new FormData();

        let dataUsers = [];
        users.forEach((e) => {
            if (e.user.check == true) {
                dataUsers.push({ id: e.user.id, check: e.user.check });
            }
        });

        if (dataUsers) {
            formData.append("data", JSON.stringify(dataUsers));
        }
        if (data.type) {
            formData.append("type", data.type);
        }
        if (data.project_id) {
            formData.append("project_id", data.project_id);
        }
        if (data.from) {
            formData.append(
                "from",
                moment(data.from).format("YYYY-MM-DD HH:mm:ss")
            );
        }
        if (data.to) {
            formData.append(
                "to",
                moment(data.to).format("YYYY-MM-DD HH:mm:ss")
            );
        }
        router.post("/managers/attendance_absence", formData);
    };
    useEffect(() => {
        getUsers();
    }, [data.project_id]);
    useEffect(() => {
        for (const property in props.errors) {
            message.warn({
                content: props.errors[property],
                style: {
                    textAlign: "right",
                },
            });
        }
    }, [errors, props.errors]);

    return (
        <ManagementLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Attendance & Absence
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
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-3 mb-3">
                        <div>
                            <label
                                htmlFor="projects"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Projects
                            </label>
                            <select
                                id="projects"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                value={data.project_id}
                                name="project_id"
                                onChange={onChange}
                            >
                                <option value={0}>Choose a project</option>
                                {props.projects.map((project) => {
                                    return (
                                        <Fragment key={project.id}>
                                            <option value={project.id}>
                                                {project.name}
                                            </option>
                                        </Fragment>
                                    );
                                })}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="type"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Attendance & Absence :
                            </label>
                            <select
                                id="type"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                value={data.type}
                                name="type"
                                onChange={onChange}
                            >
                                <option value="0">choose</option>
                                <option value="1">attendance</option>
                                <option value="2">absence</option>
                            </select>
                        </div>

                        {data.type == 1 ? (
                            <>
                                <div>
                                    <label
                                        htmlFor="from"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        From
                                    </label>
                                    <DatePicker
                                        showTime={{
                                            format: "HH:mm",
                                        }}
                                        style={{
                                            width: "100%",
                                            borderRadius: "8px",
                                            maxHeight: "42px",
                                            height: "100%",
                                        }}
                                        onChange={(value, dateString) =>
                                            setData("from", dateString)
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="from"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        To
                                    </label>
                                    <DatePicker
                                        showTime={{
                                            format: "HH:mm",
                                        }}
                                        style={{
                                            width: "100%",
                                            borderRadius: "8px",
                                            maxHeight: "42px",
                                            height: "100%",
                                        }}
                                        onChange={(value, dateString) =>
                                            setData("to", dateString)
                                        }
                                    />
                                </div>
                            </>
                        ) : null}
                        {data.type == 2 ? (
                            <div>
                                <label
                                    htmlFor="day"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Day
                                </label>
                                <DatePicker
                                    style={{
                                        width: "100%",
                                        borderRadius: "8px",
                                        maxHeight: "42px",
                                        height: "100%",
                                    }}
                                    onChange={(value, dateString) =>
                                        setData("day", dateString)
                                    }
                                />
                            </div>
                        ) : null}
                    </div>
                    <div>
                        <Button
                            type="primary"
                            loading={false}
                            onClick={() => submit()}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </ManagementLayout>
    );
};

export default Index;
