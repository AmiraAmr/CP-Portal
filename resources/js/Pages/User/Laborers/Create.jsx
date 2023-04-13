import React, { Fragment, useEffect, useState } from "react";
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
        images: [],
        first_name: "",
        fahther_name: "",
        user_name: "",
        password_confirmation: "",
        password: "",
        name: "",
        project_id: "",
    });
    const [inputs, setInputs] = useState([
        {
            label: "Name",
            name: "first_name",
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
            label: "User name",
            name: "name",
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

        formData.append("sign", fileList);

        formData.append("name", data.name);

        formData.append("email", data.email);

        formData.append("first_name", data.first_name);
        formData.append("fahther_name", data.fahther_name);
        formData.append("user_name", data.user_name);

        formData.append("password_confirmation", data.password_confirmation);

        formData.append("password", data.password);
        formData.append("project_id", data.project_id);

        router.post("/project_manager/laborer/add", formData);
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
                        Create laborer
                    </span>
                </div>
                <div className="space-y-2">
                    <div className="bg-white p-4 rounded-md space-y-3">
                        <div className="grid md:grid-cols-2 gap-3">
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
                                    defaultValue={0}
                                    onChange={(e) =>
                                        setData("project_id", e.target.value)
                                    }
                                >
                                    <option>Choose a project</option>

                                    {props.projects.map((project, index) => {
                                        return (
                                            <Fragment key={index}>
                                                <option
                                                    value={project.id}

                                                >
                                                    {project.name}
                                                </option>
                                            </Fragment>
                                        );
                                    })}
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
