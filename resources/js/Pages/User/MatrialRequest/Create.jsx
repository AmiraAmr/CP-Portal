import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button, DatePicker, message, Space, Table, Upload } from "antd";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";

const Create = (props) => {
    const { Dragger } = Upload;
    const [fileList, setFileList] = useState([]);
    const [selectUser, setSelectUser] = useState([]);

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [rowsOfTable, setRowsOfTable] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        attributes: "",
        content:
            "Reference to above mentioned subject we are requesting the material below , kindly note the following :- 1- All the requested material has been requested according to approved and according to shop drawings2- All the requested material we have been checked that not available on CP stores.Best Regards",
        date: "",
        files: [],
        project_id: "",
        ref: props.reference,
        subject: "",
        to: "",
        cc: "",
        total: 0,
        vat: 0,
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

    const [items, setItems] = useState([
        {
            dis: "",
            unit: "",
            qty: "",
        },
    ]);
    const onChange = (e) => {
        setData(e.target.name, e.target.value);
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
                    dis: "",
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
        let sum = 0;
        if (items.length > 0) {
            items.forEach((e) => {
                if (Number(sum) + Number(e.qty) * Number(e.unit_price) > 0) {
                    sum = Number(sum) + Number(e.qty) * Number(e.unit_price);
                } else {
                    sum = Number(0) + Number(sum);
                }
            });
        }
        setData("total", sum);
    }, [items]);
    useEffect(() => {
        let sum = 0;
        sum = (Number(15) * Number(data.total)) / Number(100) ?? 0;
        setData("vat", sum);
    }, [data.total]);
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

    const resetData = () => {
        setData({
            content: "",
            date: "",
            project_id: "",
            subject: "",
            to: "",
            cc: "",
        });
        setItems([]);
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
        if (selectedUsers.length > 0) {
            formData.append("users", JSON.stringify(selectedUsers));
        }
        router.post("/user/matrial_request_insrting", formData);
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
                        Create matrial request
                    </span>
                </div>
                <div className="bg-white p-4 rounded-md space-y-3">
                    <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Ref
                            </label>
                            <input
                                id="ref"
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={props.reference}
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
                                required
                                name="subject"
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Projects
                            </label>
                            <select
                                id="projects"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                defaultValue={0}
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
                                required
                                name="to"
                                onChange={onChange}
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
                    <div className="border">
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
                        <label
                            htmlFor="content"
                            className="block mb-2 text-sm font-medium text-gray-900 "
                        >
                            Conent
                        </label>
                        <textarea
                            id="content"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            value={data.content}
                            name="content"
                            onChange={onChange}
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
        </AuthenticatedLayout>
    );
};

export default Create;
