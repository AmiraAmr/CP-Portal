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
    const [selectContractor, setSelectContractor] = useState([]);
    const [loading, setLoading] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        attributes: [],
        content: [],
        date: [],
        files: [],
        project_id: "",
        ref: "",
        contractor: {},
        total: 0,
    });
    const onChange = (e) => {
        setData(e.target.name, e.target.value);
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
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
        onDrop(e) {
            console.log("Dropped files", e.dataTransfer.files);
        },
    };

    const [conditions, setConditions] = useState([
        {
            dis: "",
        },
    ]);

    const addCondition = () => {
        setConditions((prev) => {
            return [
                ...prev,
                {
                    dis: "",
                },
            ];
        });
    };

    const editCondition = (event, id) => {
        const editConditions = conditions.map((item, index) => {
            if (index === id) {
                item[event.target.name] = event.target.value;
            }
            return item;
        });
        setConditions(editConditions);
    };

    const deleteCondition = (id) => {
        setConditions((prev) => {
            return prev.filter((item, index) => index !== id);
        });
    };

    const [items, setItems] = useState([
        {
            dis: "",
            unit: "",
            expctedqty: 0,
            unit_price: 0,
            total: 0,
        },
    ]);

    const addItem = () => {
        setItems((prev) => {
            return [
                ...prev,
                {
                    dis: "",
                    unit: "",
                    expctedqty: 0,
                    unit_price: 0,
                    total: 0,
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
                if (
                    event.target.name == "expctedqty" ||
                    event.target.name == "unit_price"
                ) {
                    item.total =
                        Number(item.expctedqty) * Number(item.unit_price);
                }
            }
            return item;
        });
        setItems(editItems);
    };

    const getContractor = (name) => {
        axios({
            url: "/contractor_autotComplete",
            method: "post",
            data: {
                name: name,
            },
        }).then((res) => {
            setSelectContractor(res.data.data);
            if (!name) setSelectContractor([]);
        });
    };

    const preview = () => {
        let project = {};
        props.projects.forEach((e) => {
            if (e.id == data.project_id) {
                project.name = e.name;
            }
        });
        const url = route("user.prepurchasereturn", {
            subject: data.subject,
            condition: condition,
            project: { name: project.name },
            to: data.to,
            ref: data.ref,
            date: data.date,
            attributes: items,
            total: data.total,
        });
        window.open(url, "_blank");
    };

    const submit = () => {
        const formData = new FormData();
        fileList.forEach((file, index) => {
            formData.append("files-" + index, file);
        });
        formData.append("count", fileList.length);
        formData.append("ref", props.reference);

        formData.append("date", data.date);
        formData.append("total", data.total);
        formData.append("project_id", data.project_id);
        if (conditions.length > 0) {
            formData.append("condition", JSON.stringify(conditions));
        }
        if (items.length > 0) {
            formData.append("attribute", JSON.stringify(items));
        }
        if (data.contractor.id) {
            formData.append("contractor_id", data.contractor.id);
        }
        router.post("/cws/Insert", formData);
    };

    useEffect(() => {
        let total = 0;
        items.forEach((item) => {
            if (!isNaN(item.total)) total += item.total;
        });
        setData("total", total);
    }, [items]);

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
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Create Contract
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
                                id="reference"
                                type="text"
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
                        <div>
                            <label
                                htmlFor="project"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Project
                            </label>
                            <select
                                id="project"
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
                        <div className="relative">
                            <label
                                htmlFor="project"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                SubContractor
                            </label>
                            <input
                                type="text"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Subcontractor name auto complete"
                                onChange={(e) => getContractor(e.target.value)}
                                required
                            />
                            {selectContractor.length > 0 ? (
                                <motion.div
                                    initial={{ y: "-19px" }}
                                    animate={{ y: "0" }}
                                    className="absolute w-full bg-white border mt-2 shadow-lg p-2 py-3 rounded-lg z-10"
                                >
                                    {selectContractor?.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="cursor-pointer p-2 transition-all hover:bg-gray-100 rounded-md"
                                                onClick={() => {
                                                    setData("contractor", {
                                                        id: item.id,
                                                        name: item.comp
                                                            ? item.comp
                                                            : item.contractor_name,
                                                    });
                                                    getContractor("");
                                                }}
                                            >
                                                {item.comp
                                                    ? item.comp
                                                    : item.contractor_name}
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            ) : null}
                        </div>
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
                        <span className="text-lg">Conditions</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        {conditions.map((item, index) => {
                            return (
                                <div className="flex md:flex-row flex-col md:items-center gap-4">
                                    <div className="max-w-[36px] w-full">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            No.
                                        </label>
                                        <input
                                            name="No."
                                            rows="1"
                                            className=" text-center block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                            value={index + 1}
                                            disabled
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Description
                                        </label>
                                        <textarea
                                            id={`dis-${index}`}
                                            name="dis"
                                            rows="1"
                                            className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            value={item.dis}
                                            placeholder="Item dis..."
                                            onChange={(e) =>
                                                editCondition(e, index)
                                            }
                                        ></textarea>
                                    </div>
                                    <div className="!h-full">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Delete
                                        </label>
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
                        <div>
                            <Button
                                type="primary"
                                className="rounded-lg"
                                onClick={addCondition}
                            >
                                Add
                            </Button>
                        </div>
                    </div>
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
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            No.
                                        </label>
                                        <input
                                            name="No."
                                            rows="1"
                                            className=" text-center block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                            value={index + 1}
                                            disabled
                                        />
                                    </div>
                                    <div className="flex-1 ">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Description
                                        </label>
                                        <textarea
                                            id={`dis-${index}`}
                                            name="dis"
                                            rows="1"
                                            className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            value={item.dis}
                                            placeholder="Item dis..."
                                            onChange={(e) => editItem(e, index)}
                                        ></textarea>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Unit
                                        </label>
                                        <input
                                            id={`unit-${index}`}
                                            name="unit"
                                            type="text"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Unit"
                                            value={item.unit}
                                            required
                                            onChange={(e) => editItem(e, index)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            QTY
                                        </label>
                                        <input
                                            id={`expctedqty-${index}`}
                                            name="expctedqty"
                                            type="number"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="expctedqty"
                                            value={item.expctedqty}
                                            required
                                            onChange={(e) => editItem(e, index)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Unit Price
                                        </label>
                                        <input
                                            id={`expctedqty-${index}`}
                                            name="unit_price"
                                            type="number"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Unit Price"
                                            value={item.unit_price}
                                            required
                                            onChange={(e) => editItem(e, index)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Total
                                        </label>
                                        <input
                                            type="number"
                                            className="disabled:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Previous value"
                                            value={item.total}
                                            disabled
                                        />
                                    </div>
                                    <div className="!h-full">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Delete
                                        </label>
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
                    <div>
                        <span class="text-lg text-gray-700">
                            Total amount : {data.total}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        type="primary"
                        loading={loading}
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
