import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button, Checkbox, DatePicker, Space, Table, Upload } from "antd";
import { Link, router, useForm } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";

const Create = (props) => {
    const { Dragger } = Upload;
    const [fileList, setFileList] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        content: "",
        date: "",
        project_id: "",
        ref: props.reference,
        subject: "",
        delivery_date: "",
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
                return [...prev, file];
            });
            return false;
        },
        fileList,
    };
    const submit = () => {
        const formData = new FormData();
        formData.append("ref", data.ref);
        formData.append("date", data.date);
        formData.append("subject", data.subject);
        formData.append("delivery_date", data.delivery_date);
        formData.append("content", data.content);

        formData.append("count", fileList.length);
        fileList.forEach((file, index) => {
            formData.append("files-" + index, file);
        });

        router.post("/marketing/add", formData);
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
                        Create marketing
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
                    <div className="flex items-center gap-2">
                        <Button type="primary" onClick={() => submit()}>
                            Create
                        </Button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
