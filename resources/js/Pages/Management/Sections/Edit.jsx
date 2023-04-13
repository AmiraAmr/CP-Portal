import React, { Fragment, useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import { Radio, Form, Button, Input, Upload, Alert, message } from "antd";
import { router, useForm } from "@inertiajs/react";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";

const Edit = (props) => {
    const [loading, setLoading] = useState(false);
    const { data, setData, post, progress, errors, reset } = useForm({
        name: props.section.name,
        percentage_cash_flow: props.section.percentage_cash_flow,
        percentage_deal: props.section.percentage_deal,
        percentage_performance: props.section.percentage_performance,
        percentage_attendance: props.section.percentage_attendance,
        marketing_project: props.section.marketing_project,
        percentage_section: props.section.percentage_section,
    });

    const onChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const submit = () => {
        let formData = new FormData();
        formData.append("name", data.name);

        formData.append("percentage_cash_flow", data.percentage_cash_flow);

        formData.append("percentage_deal", data.percentage_deal);

        formData.append("percentage_performance", data.percentage_performance);

        formData.append("percentage_attendance", data.percentage_attendance);

        formData.append("marketing_project", data.marketing_project);

        if (data.percentage_section) {
            formData.append("percentage_section", data.percentage_section);
        }
        router.post(
            `/managers/department/update/${props.section.id}`,
            formData
        );
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
                        Edit section
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
                                    Depratment
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Depratment"
                                    onChange={onChange}
                                    value={data.name}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Marketing project
                                </label>
                                <input
                                    id="marketing_project"
                                    name="marketing_project"
                                    type="text"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Marketing project"
                                    onChange={onChange}
                                    value={data.marketing_project}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Percentage Of Attendance
                                </label>
                                <input
                                    id="percentage_attendance"
                                    name="percentage_attendance"
                                    type="text"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Percentage Of Attendance"
                                    onChange={onChange}
                                    value={data.percentage_attendance}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Percentage Of Performance
                                </label>
                                <input
                                    id="percentage_performance"
                                    name="percentage_performance"
                                    type="text"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Percentage Of Performance"
                                    onChange={onChange}
                                    value={data.percentage_performance}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Percentage Marketing Deal
                                </label>
                                <input
                                    id="percentage_deal"
                                    name="percentage_deal"
                                    type="text"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Percentage Marketing Deal"
                                    onChange={onChange}
                                    value={data.percentage_deal}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Percentage Cash Flow
                                </label>
                                <input
                                    id="percentage_cash_flow"
                                    name="percentage_cash_flow"
                                    type="text"
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="Percentage Cash Flow"
                                    onChange={onChange}
                                    value={data.percentage_cash_flow}
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
                            Edit
                        </Button>
                    </div>
                </div>
            </div>
        </ManagementLayout>
    );
};

export default Edit;
