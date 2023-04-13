import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Button,
    Checkbox,
    DatePicker,
    message,
    Space,
    Table,
    Upload,
} from "antd";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";

const Create = (props) => {
    const { Dragger } = Upload;
    const [loading, setLoading] = useState(false);

    const [fileList, setFileList] = useState([]);
    const [selectUser, setSelectUser] = useState([]);

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [rowsOfTable, setRowsOfTable] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        content:
            "On behalf of Advanced Construction Power CO. I am pleased to offer you I am pleased to offer you the position of  XXXXX  in our Construction Dept. with the following terms and conditions",
        images: [],
        benefit_check: false,
        date: "",
        email: "",
        name: "",
        ref: props.reference,
        subject: "",
        work_location: "",
        contract_type: "",
        salary: "",
        salary2: "",
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
    const [benefits, setBenefits] = useState([
        {
            item: "acation: 21 days per year",
            value: "",
        },
        {
            item: "Insurance: As per company policy after transfer sponsorship",
            value: "",
        },
        {
            item: "Annual Ticket: one thousand five hundred riyal",
            value: "",
        },
    ]);
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

    const [conditions, setConditions] = useState([
        {
            item: "Joining Date Immediately",
        },
        {
            item: "You will be on three (3) month probation period starting from the actual date of joining",
        },
    ]);

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

    const preview = () => {
        const url = route("user.joboffer.preview2", {
            subject: data.subject,
            content: data.content,
            work_location: data.work_location,
            contract_type: data.contract_type,
            salary: data.salary2,
            to: data.to,
            ref: data.ref,
            date: data.date,
            condition: conditions,
            name: data.name,
            benefits: benefits,
        });
        window.open(url, "_blank");
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
        router.post("/joboffer/insert", formData);
    };

    useEffect(() => {
        let salary2 = 0;
        benefits.forEach((e) => {
            salary2 = Number(e.value ?? 0) + Number(salary2);
            salary2 = Number(data.salary) + Number(salary2);
        });
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
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-2">
                <div className="flex conditions-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Create job offer
                    </span>
                </div>
                <div className="bg-white p-4 rounded-md space-y-3">
                    <div className="grid grid-cols-4 gap-4">
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
                                value={props.reference}
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
                        value={data.benefit_check}
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
                            Salary
                        </label>
                        <input
                            className="read-only:bg-gray-100 border-none text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-0 focus:border-none block w-full p-2.5"
                            id="salary"
                            type="salary"
                            name="salary"
                            placeholder="Salary"
                            value={data.salary2}
                            readOnly={true}
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
                <div className="flex items-center gap-2">
                    <Button
                        type="primary"
                        loading={false}
                        onClick={() => submit()}
                    >
                        Create
                    </Button>
                    <Button type="default" onClick={() => preview()}>
                        Preview
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
