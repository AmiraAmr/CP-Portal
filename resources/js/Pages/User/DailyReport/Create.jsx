import React, { useEffect, useContext, useRef, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Button,
    Checkbox,
    DatePicker,
    message,
    Space,
    Table,
    Upload,
    Popconfirm,
    Input,
    Form,
} from "antd";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
import EditableTable from "./Partials/EditableTable";
import moment from "moment";
import Rating from "./Partials/Rating";
import Images from "./Partials/Images";

const Create = (props) => {
    const { Dragger } = Upload;
    const [loading, setLoading] = useState(false);

    const [fileList, setFileList] = useState([]);

    const [selectUser, setSelectUser] = useState([]);

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [rowsOfTable, setRowsOfTable] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        content:
            "On behalf of Advanced Construction Power CO. I am pleased to offer you I am pleased to offer you the position of  XXXXX  in our Construction Dept. with the following terms and items",
        images: [],
        date: moment(),
        ref: props.reference,
        work_location: "",
        The_scope_of_work: "",
        workplace: "",
        number_of_staff: "",
        accommodation: "",
        from: "",
        to: "",
    });

    const [ratings, setRatings] = useState([]);
    const [images, setImages] = useState([]);

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
            label: "The scope of work",
            name: "The_scope_of_work",
            type: "text",
        },
        {
            label: "Workplace",
            name: "workplace",
            type: "text",
        },
        {
            label: "Number of staff",
            name: "number_of_staff",
            type: "text",
        },

    ]);
    const onChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const [items, setItems] = useState([
        {
            item: "",
            unit: "",
            quantity: "",
        },
    ]);

    const addItems = () => {
        setItems((prev) => {
            return [
                ...prev,
                {
                    item: "",
                    unit: "",
                    quantity: "",
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
        const editConditions = items.map((item, index) => {
            if (index === id) {
                item[event.target.name] = event.target.value;
            }
            return item;
        });
        setItems(editConditions);
    };

    const resetData = () => {
        setData({
            content: "",
            date: moment().toDate(),
            project_id: "",
            subject: "",
            to: "",
            cc: "",
            work_location: "",
            The_scope_of_work: "",
            workplace: "",
            number_of_staff: "",
        });
        setItems([]);
        setSelectedUsers([]);
        setRowsOfTable([]);
        setFileList([]);
    };

    const submit = () => {
        setLoading(true);

        const formData = new FormData();

        var counimage = 0;
        images.forEach((image, index) => {
            image.files.forEach((element, index, array) => {
                if (element !== undefined) {
                    formData.append("fileImage-" + counimage, element);
                    counimage += 1;
                }
            });
        });

        fileList.forEach((file, index) => {
            formData.append("files-" + index, file);
        });

        formData.append("count", fileList.length);
        formData.append("ref", data.ref);
        formData.append("date", data.date);
        formData.append("workplace", data.workplace);
        formData.append("The_scope_of_work", data.The_scope_of_work);
        formData.append("number_of_staff", data.number_of_staff);
        formData.append("accommodation", data.accommodation);
        formData.append("from", data.from);
        formData.append("to", data.to);

        formData.append("note", data.content);
        if (items.length > 0) {
            formData.append("daily_productivities", JSON.stringify(items));
        }

        if (ratings.length > 0) {
            formData.append("users", JSON.stringify(rowsOfTable));
        }

        if (rowsOfTable.length > 0) {
            formData.append("engineers", JSON.stringify(rowsOfTable));
        }

        router.post("/daily_report/inserting", formData);
    };

    const getUser = (cc = "") => {
        axios({
            url: "/user/userautocomplete",
            method: "post",
            data: {
                name: cc,
            },
        }).then((res) => {
            setSelectUser(res.data.data);
        });
    };

    useEffect(() => {
        getUser(data.cc);
    }, [data.cc]);

    useEffect(() => {
        if (selectedUsers.length > 0) {
            selectedUsers.map((user, index) => {
                setRowsOfTable((prev) => {
                    return [
                        ...prev,
                        {
                            key: user.id,
                            name: user.name,
                            performance: "",
                            commitment: "",
                            id: user.id,
                        },
                    ];
                });
            });
            setSelectedUsers([]);
        }
    }, [selectedUsers]);

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
                        Create report
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
                                htmlFor="projects"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Projects
                            </label>
                            <select
                                id="projects"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                value={data.project_id}
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
                                htmlFor="from"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                From
                            </label>
                            <DatePicker
                                id="from"
                                style={{
                                    width: "100%",
                                    borderRadius: "8px",
                                    maxHeight: "42px",
                                    height: "100%",
                                    padding: "0.625rem  ",
                                }}
                                onChange={(date, dateString) =>
                                    setData("from", dateString)
                                }
                                showTime={{
                                    format: "HH:mm",
                                }}
                                placeholder="From"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="to"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                To
                            </label>
                            <DatePicker
                                id="to"
                                style={{
                                    width: "100%",
                                    borderRadius: "8px",
                                    maxHeight: "42px",
                                    height: "100%",
                                    padding: "0.625rem  ",
                                }}
                                showTime={{
                                    format: "HH:mm",
                                }}
                                onChange={(date, dateString) =>
                                    setData("to", dateString)
                                }
                                placeholder="To"
                            />
                        </div>
                        <div className="relative">
                            <label
                                htmlFor="cc"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                cc
                            </label>
                            <input
                                type="text"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="cc"
                                value={data.cc}
                                onChange={(e) => setData("cc", e.target.value)}
                                required
                            />
                            {selectUser.length > 0 && data.cc !== "" ? (
                                <motion.div
                                    initial={{ y: "-19px" }}
                                    animate={{ y: "0" }}
                                    className="absolute w-full bg-white border mt-2 shadow-lg p-2 py-3 rounded-lg z-10"
                                >
                                    {selectUser?.map((user, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="cursor-pointer p-2 transition-all hover:bg-gray-100 rounded-md"
                                                onClick={() => {
                                                    setSelectedUsers((prev) => {
                                                        return [...prev, user];
                                                    });
                                                    data.cc = "";
                                                }}
                                            >
                                                {user.name}
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            ) : null}
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
                            placeholder="Write your thoughts here..."
                        ></textarea>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md ">
                    <div className="flex items-center justify-between">
                        <span className="text-lg">Ratings</span>
                    </div>
                    <EditableTable
                        dataSource={rowsOfTable}
                        setDataSource={setRowsOfTable}
                    />
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
                <Images images={images} setImages={setImages} />
                <div className="bg-white p-4 rounded-md space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-lg">items</span>
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
                                    <div className="flex-1">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Description
                                        </label>
                                        <textarea
                                            name="item"
                                            rows="1"
                                            className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                            value={item.item}
                                            placeholder="Item ..."
                                            onChange={(e) => editItem(e, index)}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Unit
                                        </label>
                                        <input
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            type="text"
                                            name="unit"
                                            placeholder="Unit"
                                            value={item.value}
                                            onChange={(e) => editItem(e, index)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Qty
                                        </label>
                                        <input
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            type="text"
                                            name="quantity"
                                            placeholder="Quantity"
                                            value={item.value}
                                            onChange={(e) => editItem(e, index)}
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
                                onClick={addItems}
                            >
                                Add
                            </Button>
                        </div>
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
                    <Button type="default" onClick={() => resetData()}>
                        Reset
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
