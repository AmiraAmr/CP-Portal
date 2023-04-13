import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Avatar,
    Button,
    Checkbox,
    Comment,
    DatePicker,
    Space,
    Table,
    Tooltip,
    Upload,
} from "antd";
import { Link, router, useForm } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

const Edit = (props) => {
    const { Dragger } = Upload;
    const [fileList, setFileList] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        content: props.data.content,
        date: props.data.date,
        ref: props.data.ref,
        subject: props.data.subject,
        delivery_date: props.data.delivery_date,
    });
    const [files, setFiles] = useState(props.data.attachment);

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
                return [...prev, file];
            });
            return false;
        },
        fileList,
    };
    const submit = () => {
        const formData = new FormData();

        // Send Data
        formData.append("ref", data.ref);
        formData.append("date", data.date);
        formData.append("subject", data.subject);
        formData.append("delivery_date", data.delivery_date);
        formData.append("content", data.content);

        // Send Files
        formData.append("count", fileList.length);
        fileList.forEach((file, index) => {
            formData.append("files-" + index, file);
        });

        // Send Deleted Files
        var deletedfiles = [];
        files.forEach((e) => {
            if (e.deleted) {
                deletedfiles.push(e.id);
            }
        });
        formData.append("deletedfiles", deletedfiles);
        router.post(`/marketing/update/${props.data.id}`, formData);
    };

    const handleDeleteFiles = (id) => {
        const newFiles = files.map((file) => {
            if (file.id == id) {
                if (file.deleted) {
                    file.deleted = !file.deleted;
                } else {
                    file.deleted = true;
                }
            }
            return file;
        });
        setFiles(newFiles);
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
                        Edit marketing
                    </span>
                </div>
                <div className="rounded-md space-y-3">
                    <div className="bg-white rounded-md p-4 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Ref
                            </label>
                            <input
                                type="text"
                                className="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={data.ref}
                                placeholder="Ref"
                                required
                                disabled
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
                                defaultValue={data.subject}
                                onChange={(e) =>
                                    setData("subject", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="w-full h-full flex flex-col">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Delivery Date
                            </label>
                            <DatePicker
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "8px",
                                }}
                                value={moment(data.delivery_date, "YYYY/MM/DD")}
                                onChange={(date, dateString) =>
                                    setData("delivery_date", dateString)
                                }
                            />
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
                                prohibit from uploading company data or other
                                band files
                            </p>
                        </Dragger>
                    </div>
                    <div className="bg-white p-4 rounded-md">
                        <label
                            htmlFor="message"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                            Content
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                        ></textarea>
                    </div>

                    <div className="bg-white p-4 rounded-md">
                        <label className="block mb-2 text-base font-medium text-gray-900 ">
                            Attachments:
                        </label>
                        <Table
                            dataSource={files}
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
                                            <button>Preview </button>
                                            <a
                                                href={`/uploads/marketing/${props.data.ref}/${record.path}`}
                                                download
                                            >
                                                Download
                                            </a>
                                            <button
                                                onClick={() =>
                                                    handleDeleteFiles(record.id)
                                                }
                                            >
                                                {record.deleted
                                                    ? "Restore"
                                                    : "Delete"}
                                            </button>
                                        </Space>
                                    ),
                                },
                            ]}
                            pagination={{ hideOnSinglePage: true }}
                        />
                    </div>
                    <div className="bg-white p-4 rounded-md space-y-3">
                        <div>
                            <label className="block mb-2 text-base font-medium text-gray-900 ">
                                Comments:
                            </label>
                            <Comment
                                content={
                                    <p>{props.data.tender_comment?.content}</p>
                                }
                                datetime={
                                    <Tooltip
                                        title={moment(
                                            props.data.tender_comment
                                                ?.created_at
                                        ).format("lll")}
                                    >
                                        <span>
                                            {moment(
                                                props.data.tender_comment
                                                    ?.created_at,
                                                "YYYYMMDD"
                                            ).fromNow()}
                                        </span>
                                    </Tooltip>
                                }
                            />
                        </div>
                        <span className="block border"></span>
                        <div>
                            <label className="block mb-2 text-base font-medium text-gray-900 ">
                                Attachments:
                            </label>
                            <Table
                                dataSource={
                                    props.data.tender_comment?.attachment
                                }
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
                                                <button>Preview </button>
                                                <a
                                                    href={`/uploads/marketing/${props.data.ref}/${record.path}`}
                                                    download
                                                >
                                                    Download
                                                </a>
                                                <button>Delete</button>
                                            </Space>
                                        ),
                                    },
                                ]}
                                pagination={{ hideOnSinglePage: true }}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button type="primary" onClick={() => submit()}>
                            Edit
                        </Button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
