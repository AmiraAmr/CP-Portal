import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Button,
    Checkbox,
    DatePicker,
    Space,
    Table,
    Avatar,
    Comment,
    Form,
    Input,
    List,
    message,
} from "antd";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
import Dragger from "antd/lib/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${
            comments.length > 1 ? "replies" : "reply"
        }`}
        itemLayout="horizontal"
        renderItem={(props) => <Comment {...props} />}
    />
);
const Editor = ({ onChange, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea
                rows={4}
                onChange={onChange}
                value={value}
                placeholder="Write a comment"
            />
        </Form.Item>
    </>
);

const Edit = (props) => {
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        content: props.data.content,
        date: props.data.date,
        delivery_date: props.data.delivery_date,
        ref: props.data.ref,
        subject: props.data.subject,
        response: "",
        status: "",
    });
    const [files, setFiles] = useState(props.data.tender_comment?.attachment);

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

    const onChange = (e) => {
        setData(e.target.name, e.target.value);
    };
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

    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setData("response", e.target.value);
    };

    const submit = () => {
        setLoading(true);

        const formData = new FormData();
        formData.append("status", data.status);
        formData.append("count", fileList.length);
        formData.append("response", data.response);


        var deletedfiles = [];
        files.forEach((e) => {
            if (e.deleted) {
                deletedfiles.push(e.id);
            }
        });
        formData.append("deletedfiles", deletedfiles);

        fileList.forEach((file, index) => {
            formData.append("files-" + index, file);
        });
        router.post(`/tender/response/${props.data.id}`, formData);
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
        setLoading(false);
    }, [errors, props.errors]);

    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Edit
                    </span>
                </div>
                <div className="bg-white p-4 rounded-md space-y-3">
                    <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                        <div>
                            <label
                                htmlFor="ref"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Ref
                            </label>
                            <input
                                type="text"
                                className="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5"
                                value={data.ref}
                                placeholder="ref"
                                name="ref"
                                id="ref"
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
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "8px",
                                }}
                                onChange={(date, dateString) =>
                                    setData("date", dateString)
                                }
                            />
                        </div>
                        <div className="w-full flex flex-col">
                            <label
                                htmlFor="date"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Delivery Date
                            </label>
                            <DatePicker
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "8px",
                                }}
                                onChange={(date, dateString) =>
                                    setData("delivery_date", dateString)
                                }
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="Subject"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Subject
                            </label>
                            <input
                                type="text"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full p-2.5"
                                placeholder="Subject"
                                defaultValue={data.subject}
                                name="subject"
                                onChange={onChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 text-base font-medium text-gray-900 ">
                            Files:
                        </label>
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
                    <div>
                        <label
                            htmlFor="content"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                            Content
                        </label>
                        <textarea
                            id="content"
                            rows="3"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-400 focus:border-blue-400"
                            value={data.content}
                            name="content"
                            onChange={onChange}
                        ></textarea>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md">
                    <label className="block mb-2 text-base font-medium text-gray-900 ">
                        Attachments:
                    </label>
                    <Table
                        dataSource={props.data.attachment}
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
                                        <a>Preview </a>
                                        <a
                                            href={`/uploads/tender/${props.data.ref}/${record.path}`}
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
                                            href={`/uploads/tender/${props.data.ref}/${record.path}`}
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

                <div className="bg-white p-4 rounded-md">
                    <label className="block mb-2 text-base font-normal text-gray-700 ">
                        Add <span className="text-blue-500">Comments</span> And{" "}
                        <span className="text-blue-500">Attachments</span>
                    </label>
                    <div className="space-y-3">
                        <Comment
                            content={
                                <Editor
                                    onChange={handleChange}
                                    submitting={submitting}
                                    value={data.response}
                                />
                            }
                        />
                        <div>
                            <label className="block mb-2 text-base font-medium text-gray-900 ">
                                Files:
                            </label>
                            <Dragger {...propsOfUploadFiles}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Click or drag file to this area to upload
                                </p>
                                <p className="ant-upload-hint">
                                    Support for a single or bulk upload.
                                    Strictly prohibit from uploading company
                                    data or other band files
                                </p>
                            </Dragger>
                        </div>
                        <div>
                            <label
                                htmlFor="status"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Status
                            </label>
                            <select
                                id="status"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                name="status"
                                onChange={onChange}
                            >
                                <option>Choose a project</option>
                                <option value="1">Accept</option>
                                <option value="2">Reject</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <Button
                        type="primary"
                        loading={loading}
                        onClick={() => submit()}
                    >
                        Edit
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
