import React, { Fragment, useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import { Radio, Form, Button, Input, Upload, Alert, message } from "antd";
import { router, useForm } from "@inertiajs/react";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";

const Create = (props) => {
    const [loading, setLoading] = useState(false);
    const { data, setData, post, progress, errors, reset } = useForm({
        name: "",
        section_id: "",
        permission: props.data,
    });

    const onChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const submit = () => {
        var permission = [];
        props.data.forEach((e) => {
            if (e.check) {
                permission.push(e.id);
            }
        });

        const values = {
            name: data.name,
            section_id: data.section_id,
            permission: JSON.stringify(permission),
        };

        router.post("/managers/role/insert", values)
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
        <ManagementLayout>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Create role
                    </span>
                </div>
                <div className="space-y-2">
                    <div className="bg-white p-4 rounded-md space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-gray-900"
                                >
                                    Role
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Role"
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Section
                                </label>
                                <select
                                    id="section_id"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                    defaultValue={data.section_id}
                                    name="section_id"
                                    onChange={onChange}
                                >
                                    <option value={0}>Choose a Section</option>
                                    {props.section.map((section) => {
                                        return (
                                            <Fragment key={section.id}>
                                                <option value={section.id}>
                                                    {section.name}
                                                </option>
                                            </Fragment>
                                        );
                                    })}
                                </select>
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
        </ManagementLayout>
    );
};

export default Create;
