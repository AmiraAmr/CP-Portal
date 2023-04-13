import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Avatar,
    Button,
    Comment,
    DatePicker,
    Descriptions,
    message,
    Space,
    Table,
    Tooltip,
    Upload,
} from "antd";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";

const Edit = (props) => {
    const { Dragger } = Upload;
    const [fileList, setFileList] = useState([]);
    const [selectUser, setSelectUser] = useState([]);

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [rowsOfTable, setRowsOfTable] = useState([]);
    const [items, setItems] = useState(props.data.attributes);
    const { data, setData, post, processing, errors, reset } = useForm({
        attributes: items,
        content: props.data.content,
        date: props.data.date,
        files: props.data.files,
        project_id: props.data.project_id,
        ref: props.data.ref,
        subject: props.data.subject,
        to: props.data.to,
        cc: "",
    });

    const propsOfUploadFiles = {
        multiple: true,
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList((prev) => {
                return [...fileList, file];
            });
            return false;
        },
        fileList,
        onDrop(e) {},
    };

    const getUser = (cc = "") => {
        axios({
            url: "/user/userautocomplete",
            method: "post",
            data: {
                name: cc,
            },
        }).then((res) => {
            setSelectUser(res.data.data);
        });
    };

    const deleteUser = (id) => {
        console.log(id);
        setSelectedUsers((prev) => {
            return prev.filter((user, index) => user.id !== id);
        });
    };

    const addItem = () => {
        setItems((prev) => {
            return [
                ...prev,
                {
                    name: "",
                    unit: "",
                    qty: "",
                },
            ];
        });
    };

    const deleteItem = (id) => {
        setItems((prev) => {
            return prev.filter((item, index) => index !== id);
        });
    };

    const editItem = (event, id) => {
        const editItems = items.map((item, index) => {
            if (index === id) {
                item[event.target.name] = event.target.value;
            }
            return item;
        });
        setItems(editItems);
    };

    useEffect(() => {
        getUser(data.cc);
    }, [data.cc]);

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
    const onChange = (e) => {
        setData(e.target.name, e.target.value);
    };
    const preview = () => {
        let project = {};
        props.projects.forEach((e) => {
            if (e.id == data.project_id) {
                project.name = e.name;
            }
        });
        const url = route("user.matrial_requestprereturn", {
            subject: data.subject,
            content: data.content,
            project: { name: project.name },
            to: data.to,
            ref: data.ref,
            date: data.date,
            attributes: items,
        });
        window.open(url, "_blank");
    };
    const submit = () => {
        const formData = new FormData();

        fileList.forEach((file, index) => {
            formData.append("files-" + index, element);
        });
        formData.append("count", fileList.length);

        formData.append("project_id", data.project_id);
        formData.append("date", data.date);
        formData.append("password", data.password);
        formData.append("subject", data.subject);
        formData.append("content", data.content);
        formData.append("ref", data.ref);
        formData.append("to", data.to);
        formData.append("vat", data.vat);
        formData.append("total", data.total);

        if (items.length > 0) {
            formData.append("attr", JSON.stringify(items));
        }

        router.post(`/user/matrial_request/update/${props.data.id}`, formData);
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
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Edit matrial request
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
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={data.ref}
                                disabled
                                required
                            />
                        </div>
                        <div className="w-full h-full flex flex-col">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Date
                            </label>
                            <DatePicker
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "8px",
                                }}
                                defaultValue={moment(data.date, "YYYY-MM-DD")}
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
                                name="subject"
                                onChange={onChange}
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
                                name="project_id"
                                onChange={onChange}
                            >
                                <option>Choose a project</option>

                                {props.projects.map((project) => {
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
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                To
                            </label>
                            <input
                                type="text"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="to"
                                value={data.to}
                                name="to"
                                onChange={onChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="message"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                            Conent
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Write your thoughts here..."
                            value={data.content}
                        ></textarea>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md">
                    <Dragger {...propsOfUploadFiles}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly
                            prohibit from uploading company data or other band
                            files
                        </p>
                    </Dragger>
                </div>
                <div className="bg-white p-4 rounded-md space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-lg">Items</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        {items.map((item, index) => {
                            return (
                                <div className="flex md:flex-row flex-col md:items-center gap-4">
                                    <div className="max-w-[36px] w-full">
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                No.
                                            </label>
                                        ) : null}
                                        <input
                                            type="text"
                                            className="border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            value={index + 1}
                                            required
                                            disabled
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Description
                                            </label>
                                        ) : null}
                                        <textarea
                                            name="dis"
                                            rows="1"
                                            className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            value={item.dis}
                                            placeholder="Item dis..."
                                            onChange={(e) => editItem(e, index)}
                                        ></textarea>
                                    </div>
                                    <div>
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Unit
                                            </label>
                                        ) : null}
                                        <input
                                            name="unit"
                                            type="text"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Unit"
                                            value={item.unit}
                                            required
                                            onChange={(e) => editItem(e, index)}
                                        />
                                    </div>
                                    <div>
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Qty
                                            </label>
                                        ) : null}
                                        <input
                                            name="qty"
                                            type="text"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Qty"
                                            value={item.qty}
                                            required
                                            onChange={(e) => editItem(e, index)}
                                        />
                                    </div>
                                    <div className="!h-full">
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Delete
                                            </label>
                                        ) : null}
                                        <Button
                                            type="primary"
                                            danger
                                            className="!flex !items-center !justify-center"
                                            onClick={() => deleteItem(index)}
                                        >
                                            <DeleteOutlined />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                        <div>
                            <Button
                                type="primary"
                                className="rounded-lg"
                                onClick={addItem}
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                    <div className="ml-4 flex flex-col gap-3 space-y-2">
                        <span className="text-base text-gray-700 font-medium">
                            VAT : {props.data.vat}
                        </span>
                        <span className="text-base text-gray-700 font-medium">
                            Total amount : {props.data.total - props.data.vat}
                        </span>
                        <span className="text-base text-gray-700 font-medium">
                            Total amount + VAT : {props.data.total}
                        </span>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md space-y-2">
                    <span class="text-lg">Notes</span>
                    <div>
                        <Descriptions bordered column={1}>
                            {props.data.note?.map((pay) => {
                                return (
                                    <>
                                        <Descriptions.Item label="Description">
                                            {pay.dis}
                                        </Descriptions.Item>
                                    </>
                                );
                            })}
                        </Descriptions>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md space-y-4">
                    <span class="text-lg">Managers Comments</span>
                    <div>
                        {props.data.matrial_request_cycle.map((comment) => {
                            return (
                                <Comment
                                    author={<span>{comment.role.name}</span>}
                                    avatar={
                                        <Avatar
                                            src="https://joeschmoe.io/api/v1/random"
                                            alt="Han Solo"
                                        />
                                    }
                                    content={
                                        <p>
                                            {
                                                comment.comment_matrial_cycle
                                                    ?.content
                                            }
                                        </p>
                                    }
                                    datetime={
                                        <Tooltip
                                            title={moment(
                                                comment.created_at
                                            ).format("LLL")}
                                        >
                                            <span>
                                                -{" "}
                                                {moment(
                                                    comment.created_at,
                                                    "YYYYMMDD"
                                                ).fromNow()}
                                            </span>
                                        </Tooltip>
                                    }
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button type="primary" onClick={() => submit()}>
                        Edit
                    </Button>
                    <Button type="default" onClick={() => preview()}>
                        Preview
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
