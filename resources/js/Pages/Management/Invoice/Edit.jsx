import React, { useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import {
    Button,
    Checkbox,
    DatePicker,
    message,
    Space,
    Table,
    Upload,
} from "antd";
import { Link, router, useForm } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";

const Edit = (props) => {
    const [selectUser, setSelectUser] = useState([]);
    const { Dragger } = Upload;
    const [fileList, setFileList] = useState([]);

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [rowsOfTable, setRowsOfTable] = useState([]);

    const [includedVat, setIncludedVat] = useState(false);
    const [vat, setVat] = useState(props.data.vat);

    const { data, setData, post, processing, errors, reset } = useForm({
        description: props.data.description,
        date: props.data.date,
        project_id: props.data.project_id,
        code: props.data.code,
        total: props.data.total,
        subtotal: props.data.subtotal,
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
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };
    const submit = () => {
        const formData = new FormData();
        formData.append("project_id", data.project_id);
        formData.append("date", data.date);
        formData.append("vat", vat);
        formData.append("total", data.total);
        formData.append("subtotal", data.subtotal);
        if (fileList.length > 0) {
            formData.append("file", fileList);
        }
        formData.append("description", data.description);

        router.post(`/managers/invoice/update/${props.data.id}`, formData);
    };

    useEffect(() => {
        for (const property in props.errors) {
            message.info(props.errors[property]);
        }
    }, [errors, props.errors]);

    useEffect(() => {
        if (includedVat == true) {
            let sum = 0;
            sum = (Number(15) * Number(data.subtotal)) / Number(100) ?? 0;
            sum = Math.round(sum);
            setVat(sum);
        } else {
            setVat(0);
        }
    }, [data.subtotal, vat, includedVat]);

    useEffect(() => {
        var sum = Number(data.subtotal) + Number(vat);
        setData("total", sum);
    }, [data.subtotal, vat]);

    return (
        <ManagementLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Edit Invoice
                    </span>
                </div>
                <div className="bg-white p-4 rounded-md space-y-3">
                    <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Ref
                            </label>
                            <input
                                type="text"
                                className="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={data.code}
                                placeholder="Ref"
                                required
                                onChange={(e) =>
                                    setData("code", e.target.value)
                                }
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
                                Subtotal
                            </label>
                            <input
                                type="text"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Subtotal"
                                value={data.subtotal}
                                onChange={(e) =>
                                    setData("subtotal", e.target.value)
                                }
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                <Checkbox
                                    checked={includedVat}
                                    onChange={(e) =>
                                        setIncludedVat(e.target.checked)
                                    }
                                >
                                    Included Vat
                                </Checkbox>
                            </label>
                            <input
                                type="text"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Vat"
                                value={vat}
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Total
                            </label>
                            <input
                                type="text"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Total"
                                value={data.total}
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
                                value={data.project_id}
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
                    </div>

                    <div>
                        <label
                            htmlFor="message"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                            Description
                        </label>
                        <textarea
                            id="message"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Write your thoughts here..."
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        ></textarea>
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
                    <div className="flex items-center gap-2">
                        <Button type="primary" onClick={() => submit()}>
                            Edit
                        </Button>
                    </div>
                </div>
            </div>
        </ManagementLayout>
    );
};

export default Edit;
