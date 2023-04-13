import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Radio, Form, Button, Input, Upload, Alert, message } from "antd";
import { router, useForm } from "@inertiajs/react";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import { isEmpty } from "lodash";

const Create = (props) => {
    const [loading, setLoading] = useState(false);
    const [personalEntity, setPersonalEntity] = useState(1);
    const { Dragger } = Upload;
    const [fileList, setFileList] = useState([]);
    const { data, setData, post, progress, errors, reset } = useForm({
        personal: 1,
        email: "",
        tax_number: "",
        representative: "",
        phone: "",
        postal_code: "",
        building_num: "",
        street_name: "",
        location: "",
        comp: "",
        city: "",
        country: "",
        images: [],
        contractor_name: "",
        user_name: "",
        password_confirmation: "",
        password: "",
    });
    const [inputs, setInputs] = useState([
        {
            label: "Email",
            name: "email",
            type: "text",
        },
        {
            label: "Phone",
            name: "phone",
            type: "text",
        },
        {
            label: "Country",
            name: "country",
            type: "text",
        },
        {
            label: "City",
            name: "city",
            type: "text",
        },
        {
            label: "Area",
            name: "location",
            type: "text",
        },
        {
            label: "Street",
            name: "street_name",
            type: "text",
        },
        {
            label: "Building Number",
            name: "building_num",
            type: "text",
        },
        {
            label: "Postal Code",
            name: "postal_code",
            type: "text",
        },
    ]);

    const propsOfUploadFiles = {
        name: "file",
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
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };

    const onChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const submit = () => {
        setLoading(true);
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append("images[]", file);
        });
        formData.append("street_name", data.street_name);

        if (data.comp !== "") {
            formData.append("comp", data.comp);
        }

        if (data.contractor_name !== "") {
            formData.append("customer_name", data.contractor_name);
        }
        if (data.representative !== "") {
            formData.append("representative", data.representative);
        }
        if (data.tax_number !== "") {
            formData.append("tax_number", data.tax_number);
        }

        formData.append("building_num", data.building_num);
        formData.append("personal", data.personal);
        formData.append("type_customer", data.type_customer);
        formData.append("phone", data.phone);
        formData.append("country", data.country);
        formData.append("location", data.location);
        formData.append("city", data.city);
        formData.append("email", data.email);
        formData.append("postal_code", data.postal_code);

        formData.append("user_name", data.user_name);

        formData.append("password_confirmation", data.password_confirmation);

        formData.append("password", data.password);

        router.post("/createsupp", formData);
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
        <AuthenticatedLayout>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Create contractor
                    </span>
                </div>
                <div className="space-y-2">
                    <div className="bg-white p-4 rounded-md">
                        <span className="text-gray-700 text-sm font-medium mr-2">
                            Personal Entity :{" "}
                        </span>
                        <Radio.Group
                            onChange={(e) => {
                                setPersonalEntity(e.target.value);
                                setData((prev) => {
                                    return {
                                        ...prev,
                                        personal: e.target.value,
                                    };
                                });
                            }}
                            value={personalEntity}
                            size="small"
                        >
                            <Radio value={1} size="small">
                                Individually
                            </Radio>
                            <Radio value={2} size="small">
                                Company
                            </Radio>
                        </Radio.Group>
                    </div>
                    <div className="bg-white p-4 rounded-md space-y-3">
                        <div className="grid grid-cols-1 gap-3">
                            {personalEntity == 1 ? (
                                <div>
                                    <label
                                        htmlFor="contractor_name"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Name
                                    </label>
                                    <input
                                        id="contractor_name"
                                        type="text"
                                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Contractor name"
                                        name="contractor_name"
                                        onChange={onChange}
                                    />
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <label
                                            htmlFor="comp"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Company Name
                                        </label>
                                        <input
                                            id="comp"
                                            name="comp"
                                            type="text"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Company Name"
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="tax_number"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Vat On
                                        </label>
                                        <input
                                            id="tax_number"
                                            type="text"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Tax Number"
                                            name="tax_number"
                                            onChange={onChange}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="representative"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Representative
                                        </label>
                                        <input
                                            id="representative"
                                            type="text"
                                            name="representative"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Company representative name"
                                            onChange={onChange}
                                        />
                                    </div>
                                </>
                            )}
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
                    </div>
                    <div className="bg-white p-4 rounded-md space-y-3">
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                            <div className="col-span-2">
                                <label
                                    htmlFor="user_name"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    User Name
                                </label>
                                <input
                                    id="user_name"
                                    type="text"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Contractor name"
                                    name="user_name"
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Password"
                                    name="password"
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Confirm Password"
                                    name="password_confirmation"
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button
                            type="primary"
                            loading={false}
                            onClick={() => submit()}
                        >
                            Create
                        </Button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
