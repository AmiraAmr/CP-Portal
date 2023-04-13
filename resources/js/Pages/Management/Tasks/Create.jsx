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
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";

const Create = (props) => {
    const [selectUser, setSelectUser] = useState([]);
    const { Dragger } = Upload;

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [rowsOfTable, setRowsOfTable] = useState([]);
    const [fileList, setFileList] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        content: "",
        date: "",
        project_id: "",
        ref: "",
        subject: "",
        to: "",
        cc: "",
    });

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

    useEffect(() => {
        getUser(data.cc);
    }, [data.cc]);

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

    const submit = () => {
        const formData = new FormData();

        if (selectedUsers.length > 0) {
            formData.append("users", JSON.stringify(selectedUsers));
        }

        if (fileList) {
            formData.append("count", fileList.length);
        }

        if (data.name) {
            formData.append("name", data.name);
        }

        if (data.point) {
            formData.append("point", data.point);
        }
        if (data.dis) {
            formData.append("dis", data.dis);
        }
        if (data.start_at) {
            formData.append("start_at", data.start_at);
        }
        if (data.expires_at) {
            formData.append("expires_in", data.expires_at);
        }
        if (data.content) {
            formData.append("dis", data.content);
        }
        fileList.forEach((element, index, array) => {
            if (element !== undefined) {
                formData.append("files-" + index, element);
            }
        });


        router.post("/managers/task/PostTask", formData);
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
                        Create Task
                    </span>
                </div>
                <div className="bg-white p-4 rounded-md space-y-3">
                    <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Subject
                            </label>
                            <input
                                type="text"
                                className="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={data.name}
                                placeholder="Task"
                                required
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Point
                            </label>
                            <input
                                type="text"
                                className="disabled:bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={data.point}
                                placeholder="Task"
                                required
                                onChange={(e) =>
                                    setData("point", e.target.value)
                                }
                            />
                        </div>
                        <div className="w-full h-full flex flex-col">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Start at :
                            </label>
                            <DatePicker
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "8px",
                                }}
                                onChange={(date, dateString) =>
                                    setData("start_at", dateString)
                                }
                            />
                        </div>
                        <div className="w-full h-full flex flex-col">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Expires in :
                            </label>
                            <DatePicker
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "8px",
                                }}
                                onChange={(date, dateString) =>
                                    setData("expires_at", dateString)
                                }
                            />
                        </div>
                        <div className="relative">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                CC
                            </label>
                            <input
                                type="text"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="cc"
                                value={data.cc}
                                onChange={(e) => setData("cc", e.target.value)}
                                required
                            />
                            {selectUser.length > 0 && data.cc !== "" ? (
                                <motion.div
                                    initial={{ y: "-19px" }}
                                    animate={{ y: "0" }}
                                    className="absolute w-full bg-white border mt-2 shadow-lg p-2 py-3 rounded-lg z-10"
                                >
                                    {selectUser?.map((user, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="cursor-pointer p-2 transition-all hover:bg-gray-100 rounded-md"
                                                onClick={() => {
                                                    setSelectedUsers((prev) => {
                                                        return [...prev, user];
                                                    });
                                                    data.cc = "";
                                                }}
                                            >
                                                {user.name}
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            ) : null}
                        </div>
                    </div>
                    <div className="border rounded-lg dail-report">
                        <Table
                            size="small"
                            columns={[
                                {
                                    title: "Name",
                                    dataIndex: "name",
                                    key: "name",
                                },
                                {
                                    title: "Email",
                                    dataIndex: "email",
                                    key: "email",
                                },
                                {
                                    title: "Action",
                                    key: "action",
                                    render: (_, record) => (
                                        <Space size="middle">
                                            <Button
                                                type="primary"
                                                danger
                                                onClick={() =>
                                                    deleteUser(record.key)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </Space>
                                    ),
                                },
                            ]}
                            dataSource={rowsOfTable}
                            pagination={{ hideOnSinglePage: true }}
                        />
                    </div>
                    <div>
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
                    <div className="flex items-center gap-2">
                        <Button type="primary" onClick={() => submit()}>
                            Create
                        </Button>
                    </div>
                </div>
            </div>
        </ManagementLayout>
    );
};

export default Create;
