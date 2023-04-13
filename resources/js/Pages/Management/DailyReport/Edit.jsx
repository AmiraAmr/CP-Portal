import React, { useEffect, useContext, useRef, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import {
    Button,
    Checkbox,
    DatePicker,
    message,
    Space,
    Table,
    Upload,
    Popconfirm,
    Input,
    Form,
    Tooltip,
    Comment,
    List,
} from "antd";
import {
    InboxOutlined,
    DeleteOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
import EditableTable from "./Partials/EditableTable";
import moment from "moment";

const Edit = (props) => {
    const { Dragger } = Upload;
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState({
        content: "",
        files: [],
        status: 0,
    });
    const [fileList, setFileList] = useState([]);

    const [selectUser, setSelectUser] = useState([]);

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [rowsOfTable, setRowsOfTable] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        content: props.data.note,
        date: props.data.date,
        project_id: props.data.project_id,
        subject: props.data.subject,
        to: props.data.to,
        cc: props.data.rev,
        work_location: props.data.work_location,
        The_scope_of_work: props.data.The_scope_of_work,
        workplace: props.data.workplace,
        number_of_staff: props.data.number_of_staff,
        ref: props.data.ref,
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

    const [inputs, setInputs] = useState([
        {
            label: "The scope of work",
            name: "The_scope_of_work",
            type: "text",
        },
        {
            label: "Workplace",
            name: "workplace",
            type: "text",
        },
        {
            label: "Number of staff",
            name: "number_of_staff",
            type: "text",
        },
    ]);
    const onChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const [items, setItems] = useState(props.data?.daily_productivity);

    const addItems = () => {
        setItems((prev) => {
            return [
                ...prev,
                {
                    item: "",
                    unit: "",
                    quantity: "",
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
        const editConditions = items.map((item, index) => {
            if (index === id) {
                item[event.target.name] = event.target.value;
            }
            return item;
        });
        setItems(editConditions);
    };
    const resetData = () => {
        setData({
            content: props.data.content,
            date: props.data.date,
            project_id: props.data.project_id,
            subject: props.data.subject,
            to: props.data.to,
            cc: props.data.rev,
            work_location: props.data.work_location,
            The_scope_of_work: props.data.The_scope_of_work,
            workplace: props.data.workplace,
            number_of_staff: props.data.number_of_staff,
            ref: props.data.ref,
        });
        setItems([]);
        setSelectedUsers([]);
        setRowsOfTable([]);
        setFileList([]);
    };

    const submit = () => {
        setLoading(true);

        const formData = new FormData();
        fileList.forEach((file, index) => {
            formData.append("files-" + index, element);
        });
        formData.append("count", fileList.length);
        formData.append("ref", data.ref);
        formData.append("date", data.date);
        formData.append("workplace", data.workplace);
        formData.append("The_scope_of_work", data.The_scope_of_work);
        formData.append("number_of_staff", data.number_of_staff);
        formData.append("project_id", data.project_id);
        formData.append("note", data.content);
        if (items.length > 0) {
            formData.append("daily_productivities", JSON.stringify(items));
        }

        formData.append("contentmanager", comment.content);
        formData.append("status", comment.status);

        router.post(
            `/managers/daily_report/updating/${props.data.id}`,
            formData
        );
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

    useEffect(() => {
        getUser(data.cc);
    }, [data.cc]);

    useEffect(() => {
        if (selectedUsers.length > 0) {
            selectedUsers.map((user, index) => {
                setRowsOfTable((prev) => {
                    return [
                        ...prev,
                        {
                            key: user.id,
                            name: user.name,
                            performance: "",
                            commitment: "",
                        },
                    ];
                });
            });
            setSelectedUsers([]);
        }
    }, [selectedUsers]);

    useEffect(() => {
        for (const property in props.errors) {
            message.warn({
                content: props.errors[property],
                style: {
                    textAlign: "right",
                },
            });
        }
        setLoading(false);
    }, [errors, props.errors]);
    return (
        <ManagementLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Edit daily Report
                    </span>
                </div>
                <div className="bg-white p-4 rounded-md space-y-3">
                    <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                        <div>
                            <label
                                htmlFor="reference"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Ref
                            </label>
                            <input
                                type="text"
                                id="reference"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={data.ref}
                                disabled
                                required
                            />
                        </div>
                        <div className="w-full flex flex-col">
                            <label
                                htmlFor="date"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Date
                            </label>
                            <DatePicker
                                id="date"
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
                        {inputs.map((input, index) => {
                            return (
                                <div key={index}>
                                    <label
                                        htmlFor={input.name}
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        {input.label}
                                    </label>
                                    <input
                                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        id={input.name}
                                        type={input.type}
                                        name={input.name}
                                        placeholder={input.label}
                                        value={data[input.name]}
                                        onChange={onChange}
                                        required={input.required}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div>
                        <label
                            htmlFor="content"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                            Conent
                        </label>
                        <textarea
                            id="content"
                            rows="4"
                            value={data.content}
                            onChange={onChange}
                            name="content"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Write your thoughts here..."
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
                <div className="bg-white p-4 rounded-md space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-lg">items</span>
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
                                            name="No."
                                            rows="1"
                                            className=" text-center block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                            value={index + 1}
                                            disabled
                                        />
                                    </div>
                                    <div className="flex-1">
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Description
                                            </label>
                                        ) : null}
                                        <textarea
                                            name="item"
                                            rows="1"
                                            className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            value={item.item}
                                            placeholder="Item ..."
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
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            type="text"
                                            name="unit"
                                            placeholder="Unit"
                                            value={item.unit}
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
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            type="text"
                                            name="quantity"
                                            placeholder="Quantity"
                                            value={item.quantity}
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
                                onClick={addItems}
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md">
                    <label className="block mb-2 text-base font-medium text-gray-900 ">
                        Attachments:
                    </label>
                    <Table
                        dataSource={props.data?.attachments}
                        columns={[
                            {
                                title: "File",
                                dataIndex: "path",
                                key: "path",
                            },
                            {
                                title: "Action",
                                key: "action",
                                render: (_, record) => (
                                    <Space size="middle">
                                        <a
                                            href={`/uploads/daily_report/${record.path}`}
                                            download
                                        >
                                            Download
                                        </a>
                                    </Space>
                                ),
                            },
                        ]}
                        pagination={{ hideOnSinglePage: true }}
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
                    <Button
                        type="primary"
                        loading={false}
                        onClick={() => submit()}
                    >
                        Edit
                    </Button>
                    <Button type="default" onClick={() => resetData()}>
                        Reset
                    </Button>
                </div>
            </div>
        </ManagementLayout>
    );
};

export default Edit;
