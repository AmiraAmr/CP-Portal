import React, { useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import {
    Button,
    Checkbox,
    Comment,
    DatePicker,
    List,
    message,
    Space,
    Table,
    Tooltip,
    Upload,
} from "antd";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";
import {
    InboxOutlined,
    DeleteOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import Installments from "./Partials/Installments";

const Create = (props) => {
    const [selectUser, setSelectUser] = useState([]);
    const [comment, setComment] = useState({
        content: "",
        files: [],
        status: 0,
    });
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [rowsOfTable, setRowsOfTable] = useState([]);
    const [loan, setLoan] = useState(props.data.loan_option);
    const [payment, setPayment] = useState(
        props.data.employee_loan ? props.data.employee_loan : []
    );
    const [fileList, setFileList] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        attributes: [],
        content: props.data.content,
        date: props.data.date,
        files: [],
        project_id: props.data.project_id,
        ref: props.data.ref,
        subject: props.data.subject,
        to: props.data.to,
        cc: props.data.cc,
        type: props.data.type,
        loan_value: props.data.loan_value,
    });

    useEffect(() => {
        setRowsOfTable([]);
        if (selectedUsers.length > 0) {
            selectedUsers.map((user, index) => {
                setRowsOfTable((prev) => {
                    return [
                        ...prev,
                        {
                            key: user.id,
                            name: user.name,
                            email: user.email,
                        },
                    ];
                });
            });
        }
    }, [selectedUsers]);

    const resetData = () => {
        setData({
            content: "",
            date: moment().toDate(),
            project_id: "",
            subject: "",
            to: "",
            cc: "",
        });
        setSelectedUsers([]);
        setRowsOfTable([]);
        setFileList([]);
    };

    const preview = () => {
        let project = {};
        props.projects.forEach((e) => {
            if (e.id == data.project_id) {
                project.name = e.name;
            }
        });
        const url = route("user.preemployeereturn", {
            subject: data.subject,
            content: data.content,
            project: { name: project.name },
            to: data.to,
            ref: data.ref,
            date: data.date,
        });
        window.open(url, "_blank");
    };

    const submit = () => {
        const formData = new FormData();

        formData.append("project_id", data.project_id);
        formData.append("date", data.date);
        formData.append("subject", data.subject);
        formData.append("content", data.content);
        formData.append("ref", data.ref);
        formData.append("to", data.to);
        formData.append("loan_option", loan);
        formData.append("loan_value", data.loan_value);
        formData.append("count", fileList.length);
        fileList.forEach((file, index) => {
            formData.append("files-" + index, file);
        });
        if (selectedUsers.length > 0) {
            formData.append("users", JSON.stringify(selectedUsers));
        }
        formData.append("contentmanager", comment.content);
        formData.append("status", comment.status);
        router.post(`/managers/action_employee/${props.data.id}`, formData);
    };

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
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Create employee request
                    </span>
                </div>
                <div className="bg-white p-4 rounded-md space-y-3">
                    <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Ref
                            </label>
                            <input
                                type="text"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={data.ref}
                                placeholder="Ref"
                                onChange={(e) => setData("ref", e.target.value)}
                                required
                            />
                        </div>
                        <div className="w-full h-full flex-col flex">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Date
                            </label>
                            <DatePicker
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "8px",
                                }}
                                value={moment(data.date, "YYYY/MM/DD")}
                                onChange={(date, dateString) =>
                                    setData("date", dateString)
                                }
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Subject
                            </label>
                            <input
                                type="text"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Subject"
                                value={data.subject}
                                onChange={(e) =>
                                    setData("subject", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Projects
                            </label>
                            <select
                                id="projects"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                defaultValue={data.project_id}
                                onChange={(e) =>
                                    setData("project_id", e.target.value)
                                }
                            >
                                <option>Choose a project</option>

                                {props.projects.map((project, index) => {
                                    return (
                                        <>
                                            <option
                                                value={project.id}
                                                key={project.id}
                                            >
                                                {project.name}
                                            </option>
                                        </>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <Checkbox onChange={() => setLoan(!loan)}>
                                Loan
                            </Checkbox>
                            {loan ? (
                                <input
                                    type="text"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Loan Value"
                                    defaultValue={data.loan_value}
                                    onChange={(e) =>
                                        setData("loan_value", e.target.value)
                                    }
                                />
                            ) : null}
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                To
                            </label>
                            <input
                                type="text"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="to"
                                value={data.to}
                                onChange={(e) => setData("to", e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="message"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                            Content
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Write your thoughts here..."
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                        ></textarea>
                    </div>
                </div>
                {loan ? (
                    <Installments
                        payment={payment}
                        setPayment={setPayment}
                        loan={loan}
                        setLoan={setLoan}
                    />
                ) : null}

                <div className="bg-white p-4 rounded-md">
                    <List
                        className="comment-list"
                        header={"Managers Comments"}
                        itemLayout="horizontal"
                        dataSource={props.data?.employee_cycle}
                        renderItem={(item) => (
                            <li className="my-4">
                                <Comment
                                    author={item.role.name}
                                    avatar={"/avatar.jpg"}
                                    content={
                                        item.comment_employee_cycle
                                            ? item.comment_employee_cycle
                                                  .content
                                            : "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain"
                                    }
                                    datetime={
                                        <Tooltip
                                            title={moment(
                                                item.created_at
                                                    ? item.created_at
                                                    : item.updated_at
                                            ).format("LL")}
                                        >
                                            <span>
                                                {moment(
                                                    item.created_at
                                                        ? item.created_at
                                                        : item.updated_at
                                                ).fromNow()}
                                            </span>
                                        </Tooltip>
                                    }
                                />
                            </li>
                        )}
                    />
                </div>
                <div className="bg-white p-4 rounded-md">
                    <span className="block mb-2 text-base font-medium text-gray-900 ">
                        {props.auth.user.role.name}
                    </span>
                    <span className="block mb-2 text-gray-400 text-sm">
                        Add a comment and an attachment
                    </span>
                    <div className="flex flex-col gap-3">
                        <textarea
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-400 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 "
                            placeholder="Content"
                            value={comment.content}
                            onChange={(e) =>
                                setComment((prev) => {
                                    return { ...prev, content: e.target.value };
                                })
                            }
                        ></textarea>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Files
                            </label>
                            <Upload
                                name="Files"
                                onRemove={(file) => {
                                    const index = fileList.indexOf(file);
                                    const newFileList = fileList.slice();
                                    newFileList.splice(index, 1);
                                    setFileList(newFileList);
                                }}
                                beforeUpload={(file) => {
                                    setFileList((prev) => {
                                        return [...prev, file];
                                    });
                                    return false;
                                }}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Click to Upload
                                </Button>
                            </Upload>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Status
                            </label>
                            <select
                                className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                onChange={(e) =>
                                    setComment((prev) => {
                                        return {
                                            ...prev,
                                            status: e.target.value,
                                        };
                                    })
                                }
                            >
                                <option value="0">Choose status</option>
                                <option value="1">Accept</option>
                                <option value="2">Reject</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button type="primary" onClick={() => submit()}>
                        Create
                    </Button>
                    <Button type="default" onClick={() => preview()}>
                        Preview
                    </Button>
                    <Button type="default" onClick={() => resetData()}>
                        Reset
                    </Button>
                </div>
            </div>
        </ManagementLayout>
    );
};

export default Create;
