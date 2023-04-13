import React, { Fragment, useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
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
    const [sign, setSign] = useState({});
    const [picture, setPicture] = useState({});

    const { data, setData, post, progress, errors, reset } = useForm({
        name: "",
        project_id: "",
        contract_date: "",
        contract_ex: "",
        working_hours: "",
        weekly_vacation: "",
        vacations: "",
        email: "",
        salary_per_hour: "",
        salary_per_month: "",
        fahther_name: "",
        address: "",
        type_of_identity: "",
        identity: "",
        identity_date: "",
        identity_source: "",
        build_number: "",
        city: "",
        street: "",
        phone: "",
        permit: "",
        role_id: "",
        accommodation: "",
    });
    const [inputs, setInputs] = useState([
        {
            label: "Name",
            name: "name",
            type: "text",
        },
        {
            label: "Fahther name",
            name: "fahther_name",
            type: "text",
        },
        {
            label: "E-Mail Address",
            name: "email",
            type: "text",
        },
        {
            label: "Address",
            name: "address",
            type: "text",
        },
        {
            label: "Vacations",
            name: "vacations",
            type: "text",
        },
        {
            label: "Weekly vacation ",
            name: "weekly_vacation",
            type: "text",
        },
        {
            label: "Working hours",
            name: "working_hours",
            type: "text",
        },
        {
            label: "Contract date",
            name: "contract_date",
            type: "date",
        },
        {
            label: "Renewal Of Residence",
            name: "permit",
            type: "date",
        },
        {
            label: "Contract_ex",
            name: "contract_ex",
            type: "date",
        },

        {
            label: "Type of identity",
            name: "type_of_identity",
            type: "text",
        },
        {
            label: "Identity number",
            name: "identity",
            type: "text",
        },
        {
            label: "Identity date ",
            name: "identity_date",
            type: "text",
        },
        {
            label: "Identity source",
            name: "identity_source",
            type: "text",
        },
        {
            label: "Build number",
            name: "build_number",
            type: "text",
        },
        {
            label: "City",
            name: "city",
            type: "text",
        },
        {
            label: "Accommodation",
            name: "accommodation",
            type: "text",
        },
        {
            label: "Street",
            name: "street",
            type: "text",
        },
        {
            label: "Phone",
            name: "phone",
            type: "text",
        },
        {
            label: "Salary per hour",
            name: "salary_per_hour",
            type: "text",
        },
        {
            label: "Salary per month",
            name: "salary_per_month",
            type: "text",
        },
    ]);

    const propsOfUploadFiles = {};

    const onChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const submit = () => {
        setLoading(true);
        const formData = new FormData();

        formData.append("sign", sign);
        if (Object.keys(sign).length > 0) {
            formData.append("sign", sign);
        }
        if (Object.keys(picture).length > 0) {
            formData.append("image", picture);
        }
        fileList.forEach((element, index, array) => {
            if (element !== undefined) {
                formData.append("files-" + index, element);
            }
        });

        if (data.name) {
            formData.append("name", data.name);
        }
        if (data.password_confirmation) {
            formData.append(
                "password_confirmation",
                data.password_confirmation
            );
        }
        if (data.password) {
            formData.append("password", data.password);
        }
        if (data.email) {
            formData.append("email", data.email);
        }
        if (data.working_hours) {
            formData.append("working_hours", data.working_hours);
        }
        if (data.contract_ex) {
            formData.append("contract_ex", data.contract_ex);
        }

        if (data.permit) {
            formData.append("permit", data.permit);
        }
        if (data.contract_date) {
            formData.append("contract_date", data.contract_date);
        }
        if (data.project_id) {
            formData.append("project_id", data.project_id);
        }
        if (data.weekly_vacation) {
            formData.append("weekly_vacation", data.weekly_vacation);
        }
        if (data.vacations) {
            formData.append("vacations", data.vacations);
        }
        if (data.salary_per_hour) {
            formData.append("salary_per_hour", data.salary_per_hour);
        }

        if (data.salary_per_month) {
            formData.append("salary_per_month", data.salary_per_month);
        }
        if (data.fahther_name) {
            formData.append("fahther_name", data.fahther_name);
        }

        if (data.address) {
            formData.append("address", data.address);
        }

        if (data.type_of_identity) {
            formData.append("type_of_identity", data.type_of_identity);
        }

        if (data.identity) {
            formData.append("identity", data.identity);
        }
        if (data.identity_date) {
            formData.append("identity_date", data.identity_date);
        }
        if (data.identity_source) {
            formData.append("identity_source", data.identity_source);
        }

        if (data.build_number) {
            formData.append("build_number", data.build_number);
        }

        if (data.city) {
            formData.append("city", data.city);
        }
        if (data.street) {
            formData.append("street", data.street);
        }
        if (data.phone) {
            formData.append("phone", data.phone);
        }
        if (data.laborer) {
            formData.append("laborer", data.laborer);
        }
        if (data.role_id) {
            formData.append("role_id", data.role_id);
        }
        router.post(`/admin/user/updateuser/`, formData);
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
        <ManagementLayout>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Create User
                    </span>
                </div>
                <div className="space-y-2">
                    <div className="bg-white p-4 rounded-md space-y-3">
                        <div className="grid grid-cols-1 gap-4">
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
                            <div>
                                <label
                                    htmlFor="project"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Project
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
                                            <Fragment key={index}>
                                                <option value={project.id}>
                                                    {project.name}
                                                </option>
                                            </Fragment>
                                        );
                                    })}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Role
                                </label>
                                <select
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    value={data.role_id}
                                    onChange={(e) =>
                                        setData("role_id", e.target.value)
                                    }
                                >
                                    <option>Choose a role</option>

                                    {props.roles.map((project, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <option value={project.id}>
                                                    {project.name}
                                                </option>
                                            </Fragment>
                                        );
                                    })}
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Role
                                </label>
                                <select
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    value={data.laborer}
                                    onChange={(e) =>
                                        setData("laborer", e.target.value)
                                    }
                                >
                                    <option value="1">laborer</option>
                                    <option value="0">User</option>
                                </select>
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
                    <div className="bg-white p-4 rounded-md">
                        <label
                            htmlFor="sign"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Sign :
                        </label>
                        <Dragger
                            name="file"
                            multiple="false"
                            beforeUpload={(file) => {
                                setSign(file);
                                return false;
                            }}
                            sign
                        >
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
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Picture:
                        </label>
                        <Dragger
                            name="file"
                            multiple="false"
                            beforeUpload={(file) => {
                                setPicture(file);
                                return false;
                            }}
                            picture
                        >
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
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Files:
                        </label>
                        <Dragger
                            name="file"
                            multiple="true"
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
        </ManagementLayout>
    );
};

export default Create;
