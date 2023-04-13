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
import {
    InboxOutlined,
    DeleteOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
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
    const [users, setUsers] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const { data, setData, post, processing, errors, reset } = useForm({
        content: props.data.content,
        images: [],
        date: props.data.date,
        ref: props.data.ref,
        subject: props.data.subject,
        role_id: props.data.role_id,
        user_id: props.data.employee_id,
    });

    const getUser = () => {
        axios.get(`/employee_by_role/${data.role_id}`).then((res) => {
            setUsers([]);
            res.data.data.forEach((users) => {
                users.forEach((user) => {
                    setUsers((prev) => {
                        return [...prev, user];
                    });
                });
            });
        });
        setData("user_id", props.data.employee_id);
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

    const [inputs, setInputs] = useState([
        {
            label: "Career Section",
            name: "subject",
            type: "text",
        },
        {
            label: "Work location",
            name: "work_location",
            type: "text",
        },
        {
            label: "Contract type",
            name: "contract_type",
            type: "text",
        },
        {
            label: "Name",
            name: "name",
            type: "text",
        },
        {
            label: "Email",
            name: "email",
            type: "email",
        },
    ]);

    const onChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const [items, setItems] = useState(props.data.attributes);

    const addItem = () => {
        setItems((prev) => {
            return [
                ...prev,
                {
                    item: "",
                    amount: "",
                    percentage: "",
                    employee_cost: "",
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
        let editItems = items.map((item, index) => {
            if (index === id) {
                item[event.target.name] = event.target.value;
            }

            if (
                event.target.name === "employee_cost" ||
                event.target.name === "amount"
            ) {
                let itemPercentage =
                    (Number(item.employee_cost) * Number(100)) /
                        Number(item.amount) ?? 0;
                item.percentage = itemPercentage.toFixed(1);
            }

            if (
                event.target.name === "percentage" ||
                event.target.name === "amount"
            ) {
                let itemEmployeeCost =
                    (Number(item.percentage) * Number(item.amount)) /
                        Number(100) ?? 0;
                item.employee_cost = itemEmployeeCost.toFixed(1);
            }
            return item;
        });
        editItems = editItems.map((item, index) => {
            return item;
        });
        setItems(editItems);
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
        formData.append("total", totalAmount);
        formData.append("employee_id", data.user_id);
        formData.append("role_id", data.role_id);
        formData.append("subject", data.subject);
        formData.append("content", data.content);
        if (items.length > 0) {
            formData.append("attr", JSON.stringify(items));
        }
        formData.append("contentmanager", comment.content);
        formData.append("status", comment.status);
        router.post(`/managers/service/updating/${props.data.id}`, formData);
    };

    useEffect(() => {
        getUser();
    }, [data.role_id]);

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

    useEffect(() => {
        setTotalAmount(0);
        let sum = 0;
        if (items.length > 0) {
            items.forEach((e) => {
                if (Number(sum) + Number(e.amount) > 0) {
                    sum = Number(sum) + Number(e.amount);
                } else {
                    sum = Number(0) + Number(sum);
                }
            });
        }
        sum = Math.round(sum);
        setTotalAmount(sum);
    }, [items]);
    return (
        <ManagementLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Edit service request
                    </span>
                </div>
                <div className="bg-white p-4 rounded-md space-y-4">
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
                                defaultValue={moment(data.date, "YYYY/MM/DD")}
                                onChange={(date, dateString) =>
                                    setData("date", dateString)
                                }
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="role"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Role
                            </label>
                            <select
                                id="role"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                defaultValue={data.role_id}
                                name="role_id"
                                onChange={onChange}
                            >
                                <option>Choose a role</option>

                                {props.roles.map((role, index) => {
                                    return (
                                        <>
                                            <option
                                                value={role.id}
                                                key={role.id}
                                            >
                                                {role.name}
                                            </option>
                                        </>
                                    );
                                })}
                            </select>
                        </div>
                        {users.length > 0 ? (
                            <div>
                                <label
                                    htmlFor="user"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Users
                                </label>
                                <select
                                    id="user"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    defaultValue={data.user_id}
                                    name="user_id"
                                    onChange={onChange}
                                >
                                    <option>Choose a user</option>
                                    {users.map((user, index) => {
                                        return (
                                            <>
                                                <option
                                                    value={user.id}
                                                    key={user.id}
                                                >
                                                    {user.name}
                                                </option>
                                            </>
                                        );
                                    })}
                                </select>
                            </div>
                        ) : null}
                        <div>
                            <label
                                htmlFor="service"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Service
                            </label>
                            <select
                                id="service"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                defaultValue={data.subject}
                                name="subject"
                                onChange={onChange}
                            >
                                <option value={0}>Choose a service</option>

                                <option value="Renew ID">Renew ID</option>
                                <option value="Exit and entry">
                                    Exit and entry
                                </option>
                                <option value="Final Exit">Final Exit</option>
                                <option value="Transfer to CP">
                                    Transfer to CP
                                </option>
                                <option value="Transfer from CP">
                                    Transfer from CP
                                </option>
                                <option value="Clearence">Clearence</option>
                            </select>
                        </div>
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
                            placeholder="Write here..."
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
                        <span className="text-lg text-gray-700">Items</span>
                        <Button
                            type="primary"
                            className="rounded-lg"
                            onClick={addItem}
                        >
                            Add
                        </Button>
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
                                            className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                            value={index + 1}
                                            disabled
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col w-full">
                                            {index == 0 ? (
                                                <label
                                                    htmlFor="item"
                                                    className="block mb-2 text-sm font-medium text-gray-900"
                                                >
                                                    Item
                                                </label>
                                            ) : null}
                                            <textarea
                                                name="item"
                                                rows="1"
                                                className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                value={item.item}
                                                placeholder="Item description..."
                                                onChange={(e) =>
                                                    editItem(e, index)
                                                }
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div>
                                        {index == 0 ? (
                                            <label
                                                htmlFor="amount"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Amount
                                            </label>
                                        ) : null}
                                        <input
                                            name="amount"
                                            type="number"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Amount"
                                            value={item.amount}
                                            required
                                            onChange={(e) => editItem(e, index)}
                                        />
                                    </div>
                                    <div>
                                        {index == 0 ? (
                                            <label
                                                htmlFor="percentage"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Percentage
                                            </label>
                                        ) : null}
                                        <input
                                            name="percentage"
                                            type="text"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Percentage"
                                            value={item.percentage}
                                            required
                                            onChange={(e) => editItem(e, index)}
                                        />
                                    </div>
                                    <div>
                                        {index == 0 ? (
                                            <label
                                                htmlFor="employee_cost"
                                                className="block mb-2 text-sm font-medium text-gray-900"
                                            >
                                                Employee cost
                                            </label>
                                        ) : null}
                                        <input
                                            name="employee_cost"
                                            type="text"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Employee cost"
                                            value={item.employee_cost}
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
                    </div>
                    <div>
                        <span className="text-lg text-gray-700">
                            Total amount : {totalAmount}
                        </span>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md">
                    <label className="block mb-2 text-base font-medium text-gray-900 ">
                        Attachments:
                    </label>
                    <Table
                        dataSource={props.data.files}
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
                                            href={`/uploads/service/${record.path}`}
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
                    <List
                        className="comment-list"
                        header={"Managers Comments"}
                        itemLayout="horizontal"
                        dataSource={props.data.service_cycle}
                        renderItem={(item) => (
                            <li className="my-4">
                                <Comment
                                    author={item.role.name}
                                    avatar={"/avatar.jpg"}
                                    content={
                                        item.service_comment_cycle
                                            ? item.service_comment_cycle.content
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
                <div className="flex items-center gap-3">
                    <Button
                        type="primary"
                        loading={false}
                        onClick={() => submit()}
                    >
                        Edit
                    </Button>
                </div>
            </div>
        </ManagementLayout>
    );
};

export default Edit;
