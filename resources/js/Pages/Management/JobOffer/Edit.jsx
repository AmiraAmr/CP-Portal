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

    const [fileList, setFileList] = useState([]);
    const [selectUser, setSelectUser] = useState([]);

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [rowsOfTable, setRowsOfTable] = useState([]);
    const [comment, setComment] = useState({
        content: "",
        files: [],
        status: 0,
    });
    const { data, setData, post, processing, errors, reset } = useForm({
        content: props.data.content,
        images: [],
        benefit_check: props.data.benefit_check,
        date: props.data.date,
        email: props.data.email,
        name: props.data.name,
        ref: props.data.ref,
        subject: props.data.subject,
        work_location: props.data.work_location,
        contract_type: props.data.contract_type,
        salary: props.data.salary,
        salary2: props.data.salary2,
    });

    const [files, setFiles] = useState(props.data.files);

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
    const [benefits, setBenefits] = useState(props.data.benefits);
    const addBenefit = () => {
        setBenefits((prev) => {
            return [
                ...prev,
                {
                    item: "",
                    value: "",
                },
            ];
        });
    };

    const deleteBenefit = (id) => {
        setBenefits((prev) => {
            return prev.filter((benefit, index) => index !== id);
        });
    };

    const editBenefit = (event, id) => {
        const editBenefits = benefits.map((benefit, index) => {
            if (index === id) {
                benefit[event.target.name] = event.target.value;
            }
            return benefit;
        });
        setBenefits(editBenefits);
    };

    const [conditions, setConditions] = useState(props.data.condition);

    const addCondition = () => {
        setConditions((prev) => {
            return [
                ...prev,
                {
                    item: "",
                },
            ];
        });
    };

    const deleteCondition = (id) => {
        setConditions((prev) => {
            return prev.filter((condition, index) => index !== id);
        });
    };

    const editCondition = (event, id) => {
        const editConditions = conditions.map((condition, index) => {
            if (index === id) {
                condition[event.target.name] = event.target.value;
            }
            return condition;
        });
        setConditions(editConditions);
    };

    const submit = () => {
        setLoading(true);

        const formData = new FormData();

        formData.append("ref", data.ref);
        formData.append("date", data.date);
        formData.append("salary", data.salary2);
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("work_location", data.work_location);
        formData.append("subject", data.subject);
        formData.append("benefit_check", data.benefit_check);
        formData.append("contract_type", data.contract_type);
        formData.append("content", data.content);
        if (conditions.length > 0) {
            formData.append("condition", JSON.stringify(conditions));
        }
        if (benefits.length > 0) {
            formData.append("benefit_salary", JSON.stringify(benefits));
        }
        fileList.forEach((file, index) => {
            formData.append("files-" + index, element);
        });
        formData.append("count", fileList.length);
        formData.append("contentmanager", comment.content);
        formData.append("status", comment.status);

        router.post(`/managers/joboffer/updating/${props.data.id}`, formData);
    };

    useEffect(() => {
        let salary2 = 0;
        benefits.forEach((e) => {
            salary2 = Number(e.value ?? 0) + Number(salary2);
        });
        salary2 = Number(data.salary) + Number(salary2);
        setData("salary2", salary2);
    }, [benefits]);

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
                <div className="flex conditions-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Edit job offer
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
                                            href={`/uploads/joboffer/${props.data.ref}/${record.path}`}
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
                <div className="bg-white p-4 rounded-md space-y-3">
                    <div className="flex conditions-center justify-between">
                        <span className="text-lg">Benefits</span>
                        <Button
                            type="primary"
                            className="rounded-lg"
                            onClick={addBenefit}
                        >
                            Add
                        </Button>
                    </div>
                    <Checkbox
                        checked={data.benefit_check}
                        onChange={(e) =>
                            setData("benefit_check", e.target.checked)
                        }
                    >
                        Benefit check
                    </Checkbox>
                    {data.benefit_check ? (
                        <div className="flex flex-col gap-4">
                            {benefits.map((item, index) => {
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
                                                className="text-center block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                                value={index + 1}
                                                disabled
                                            />
                                        </div>
                                        <div className="flex-1">
                                            {index == 0 ? (
                                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                                    Item
                                                </label>
                                            ) : null}
                                            <textarea
                                                name="item"
                                                rows="1"
                                                className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                value={item.item}
                                                placeholder="Item ..."
                                                onChange={(e) =>
                                                    editBenefit(e, index)
                                                }
                                            ></textarea>
                                        </div>
                                        <div>
                                            {index == 0 ? (
                                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                                    value
                                                </label>
                                            ) : null}
                                            <input
                                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                id="value"
                                                type="value"
                                                name="value"
                                                placeholder="Value"
                                                value={item.value}
                                                onChange={(e) =>
                                                    editBenefit(e, index)
                                                }
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
                                                className=" !px-4 "
                                                onClick={() =>
                                                    deleteBenefit(index)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}
                    <div className="flex items-center">
                        <label
                            for="contract_type"
                            class="mr-2 text-sm font-medium text-gray-900 whitespace-nowrap"
                        >
                            Salary Package :
                        </label>
                        <input
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            id="salary"
                            type="salary"
                            name="salary"
                            placeholder="Salary"
                            value={data.salary2}
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md space-y-3">
                    <div className="flex conditions-center justify-between">
                        <span className="text-lg">Conditions</span>
                        <Button
                            type="primary"
                            className="rounded-lg"
                            onClick={addCondition}
                        >
                            Add
                        </Button>
                    </div>
                    <div className="flex flex-col gap-4">
                        {conditions.map((item, index) => {
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
                                            placeholder="Item ..."
                                            onChange={(e) =>
                                                editCondition(e, index)
                                            }
                                        ></textarea>
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
                                            onClick={() =>
                                                deleteCondition(index)
                                            }
                                        >
                                            <DeleteOutlined />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md">
                    <List
                        className="comment-list"
                        header={"Managers Comments"}
                        itemLayout="horizontal"
                        dataSource={props.data.joboffer_cycle}
                        renderItem={(item) => (
                            <li className="my-4">
                                <Comment
                                    author={item.role.name}
                                    avatar={"/avatar.jpg"}
                                    content={
                                        item.joboffer_comment_cycle
                                            ? item.joboffer_comment_cycle
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
