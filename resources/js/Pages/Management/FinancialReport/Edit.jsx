import React, { Fragment, useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";

const Edit = (props) => {
    const { Dragger } = Upload;
    const [identifiers, setIdentifiers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [payments, setPayments] = useState([]);
    const [total, setTotal] = useState([]);
    const [customising, setCustomising] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [comment, setComment] = useState({
        content: "",
        files: [],
        status: 0,
    });
    const propsOfUploads = {};
    const onChange = (event, id) => {
        const newCustomising = customising.map((item) => {
            if (item.id == id) {
                item.pay = event.target.value;
            }
            return item;
        });

        setCustomising(newCustomising);
    };
    const onRemove = (id, file) => {
        fileList.map((item) => {
            if (item.id == id) {
                item.files = item.files.filter((item) => item.uid !== file.uid);
            }
        });
    };

    const beforeUpload = (id, file) => {
        const exists = fileList.find((item) => item.id == id);
        console.log(exists);
        if (exists) {
            fileList.map((item) => {
                if (item.id == id) {
                    item.files.push(file);
                }
            });
        } else {
            fileList.push({ id: id, files: [file] });
        }
        return false;
    };

    const submit = () => {
        let formData = new FormData();

        fileList.forEach((e) => {
            e.files.forEach((element) => {
                formData.append("files-" + e.id, element);
            });
        });

        if (comment.status) {
            formData.append("status", comment.status);
        }

        if (customising) {
            formData.append("attributes", JSON.stringify(customising));
        }
        var total = 0;
        customising.forEach((e) => {
            total = Number(total) + Number(e.pay);
        });
        formData.append("total", total);
        router.post(
            `/managers/report/daily/financial/confirm/${props.data.id}`,
            formData
        );
    };

    useEffect(() => {
        props.data.item.map((item) => {
            if (item.petty_cash) {
                setIdentifiers((prev) => {
                    return [...prev, item.petty_cash.ref];
                });
                setProjects((prev) => {
                    return [
                        ...prev,
                        item.petty_cash.project
                            ? item.petty_cash.project.name
                            : "unknown",
                    ];
                });
                setPayments((prev) => {
                    return [...prev, item.petty_cash.paid];
                });
                setTotal((prev) => {
                    return [...prev, item.petty_cash.total];
                });
            }
            if (item.purchase_order) {
                setIdentifiers((prev) => {
                    return [...prev, item.purchase_order.ref];
                });
                setProjects((prev) => {
                    return [
                        ...prev,
                        item.purchase_order.project
                            ? item.purchase_order.project.name
                            : "unknown",
                    ];
                });
                setPayments((prev) => {
                    return [...prev, item.purchase_order.paid];
                });
                setTotal((prev) => {
                    return [...prev, item.purchase_order.total];
                });
            }
            if (item.subcontractor) {
                setIdentifiers((prev) => {
                    return [...prev, item.subcontractor.ref];
                });
                setProjects((prev) => {
                    return [
                        ...prev,
                        item.subcontractor.project
                            ? item.subcontractor.project.name
                            : "unknown",
                    ];
                });
                setPayments((prev) => {
                    return [...prev, item.subcontractor.paid];
                });
                setTotal((prev) => {
                    return [...prev, item.subcontractor.total];
                });
            }

            return item;
        });
    }, [props.data]);

    useEffect(() => {
        setCustomising([]);
        props.data.item.forEach((e) => {
            var value =
                Number(
                    e.purchase_order
                        ? e.purchase_order.paid
                        : e.petty_cash
                        ? e.petty_cash.paid
                        : e.subcontractor
                        ? e.subcontractor.paid
                        : 0
                ) + Number(e.pay);
            e.remaining_amount =
                Number(
                    e.purchase_order
                        ? e.purchase_order.total
                        : e.petty_cash
                        ? e.petty_cash.total ?? e.petty_cash.expected_amount
                        : e.subcontractor
                        ? e.subcontractor.total
                        : 0
                ) - Number(value);
            setCustomising((prev) => {
                return [...prev, e];
            });
        });
    }, [props.data]);

    useEffect(() => {
        for (const property in props.errors) {
            message.warn({
                content: props.errors[property],
                style: {
                    textAlign: "right",
                },
            });
        }
    }, [props.errors]);
    return (
        <ManagementLayout>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Daily Financial Report
                    </span>
                </div>
                <div className="flex flex-col gap-3">
                    {customising.map((item, index) => {
                        return (
                            <div className="bg-white rounded-lg p-3 flex flex-col gap-6">
                                <div className="grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
                                    <div>
                                        <label
                                            htmlFor="item"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Item
                                        </label>
                                        <input
                                            id="item"
                                            name="item"
                                            type="text"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Item"
                                            value={identifiers[index]}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="project"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Project
                                        </label>
                                        <input
                                            id="project"
                                            name="project"
                                            type="text"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Project"
                                            value={projects[index]}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="supplier"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Supplier
                                        </label>
                                        <input
                                            id="supplier"
                                            name="supplier"
                                            type="text"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Supplier"
                                            value={
                                                item.supplier
                                                    ? item.supplier.comp
                                                    : item.supplier
                                                    ? item.supplier
                                                          .customer_name
                                                    : "unknown"
                                            }
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="pay"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Pay
                                        </label>
                                        <input
                                            id="pay"
                                            name="pay"
                                            type="text"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Pay"
                                            value={item.pay}
                                            onChange={(e) =>
                                                onChange(e, item.id)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="paid"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Paid
                                        </label>
                                        <input
                                            id="paid"
                                            name="paid"
                                            type="text"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Paid"
                                            value={payments[index]}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="total"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Total
                                        </label>
                                        <input
                                            id="total"
                                            name="total"
                                            type="text"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Total"
                                            value={total[index]}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="remaining_amount"
                                            className="block mb-2 text-sm font-medium text-gray-900"
                                        >
                                            Remaining amount
                                        </label>
                                        <input
                                            id="remaining_amount"
                                            name="remaining_amount"
                                            type="text"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Remaining amount"
                                            value={item.remaining_amount}
                                            required
                                        />
                                    </div>
                                </div>
                                <Dragger
                                    {...propsOfUploads}
                                    beforeUpload={(file) =>
                                        beforeUpload(item.id, file)
                                    }
                                    onRemove={(file) => onRemove(item.id, file)}
                                    fileList={fileList.find((file) => {
                                        file.id == item.id;
                                        return file.files;
                                    })}
                                >
                                    <p className="ant-upload-drag-icon">
                                        <InboxOutlined />
                                    </p>
                                    <p className="ant-upload-text">
                                        Click or drag file to this area to
                                        upload
                                    </p>
                                    <p className="ant-upload-hint">
                                        Support for a single or bulk upload.
                                        Strictly prohibit from uploading company
                                        data or other band files
                                    </p>
                                </Dragger>
                            </div>
                        );
                    })}
                    {props.allowed == 1 ? (
                        <div className="bg-white p-4 rounded-md">
                            <span className="block mb-2 text-base font-medium text-gray-900 ">
                                {props.auth.user.role.name}
                            </span>
                            <span className="block mb-2 text-gray-400 text-sm">
                                Add a comment and an attachment
                            </span>
                            <div className="flex flex-col gap-3">
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
                    ) : null}
                    <div className="flex items-center gap-2">
                        <div>
                            <Button type="primary" onClick={() => submit()}>
                                Update
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </ManagementLayout>
    );
};

export default Edit;
