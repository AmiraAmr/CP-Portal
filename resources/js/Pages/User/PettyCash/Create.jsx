import React, { Fragment, useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Alert,
    Button,
    Checkbox,
    DatePicker,
    message,
    Space,
    Table,
    Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
import moment from "moment";

const Create = (props) => {
    const [checked, setChecked] = useState(false);
    const [totalpoExpenses, setTotalpoExpenses] = useState(0);
    const [tablePrices, setTablePrices] = useState({});
    const { Dragger } = Upload;
    const [fileList, setFileList] = useState([]);
    const [selectUser, setSelectUser] = useState([]);

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [rowsOfTable, setRowsOfTable] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [vat, setVat] = useState(0);
    const [includedVat, setIncludedVat] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        attributes: [],
        content: "",
        date: moment().toDate(),
        project_id: "",
        ref: props.reference,
        subject: "",
        to: "",
        cc: "",
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
                return [...prev, file];
            });
            return false;
        },
        fileList,
    };

    const [items, setItems] = useState([
        {
            dis: "",
            unit: "",
            unit_price: 0,
            qty: 0,
        },
    ]);

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

    const deleteUser = (id) => {
        console.log(id);
        setSelectedUsers((prev) => {
            return prev.filter((user, index) => user.id !== id);
        });
    };

    const addItem = () => {
        setItems((prev) => {
            return [
                ...prev,
                {
                    dis: "",
                    unit: "",
                    qty: "",
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
            }
            return item;
        });
        setItems(editItems);
    };
    const onChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    useEffect(() => {
        getUser(data.cc);
    }, [data.cc]);

    useEffect(() => {
        setRowsOfTable([]);
        if (selectedUsers.length > 0) {
            selectedUsers.map((user, index) => {
                setRowsOfTable((prev) => {
                    return [
                        ...prev,
                        {
                            key: user.id,
                            name: user.name,
                            email: user.email,
                        },
                    ];
                });
            });
        }
    }, [selectedUsers]);

    useEffect(() => {
        setTotalAmount(0);
        if (items.length > 0) {
            items.map((item) => {
                setTotalAmount((prev) => prev + item.qty * item.unit_price);
            });
        }
    }, [items]);

    useEffect(() => {
        setVat((Number(15) * Number(totalAmount)) / Number(100) ?? 0);
    }, [totalAmount]);

    useEffect(() => {
        props.projects.forEach((project) => {
            if (data.project_id == project.id) {
                setTablePrices(project);
            }
        });
    }, [data.project_id]);

    const resetData = () => {
        setData({
            content: "",
            date: moment().toDate(),
            project_id: "",
            subject: "",
            to: "",
            cc: "",
        });
        setIncludedVat(false);
        setVat(0);
        setTotalAmount(0);
        setItems([]);
        setSelectedUsers([]);
        setRowsOfTable([]);
        setTablePrices({});
        setFileList([]);
    };

    const preview = () => {
        let project = {};
        props.projects.forEach((e) => {
            if (e.id == data.project_id) {
                project.name = e.name;
            }
        });
        const url = route("user.prepetty_cashreturn", {
            subject: data.subject,
            content: data.content,
            project: { name: project.name },
            to: data.to,
            ref: data.ref,
            date: data.date,
            attributes: items,
            total: totalAmount,
            vat: vat,
        });
        window.open(url, "_blank");
    };

    const submit = () => {
        if (totalpoExpenses <= tablePrices.po_budget) {
            const formData = new FormData();

            formData.append("ref", data.ref);
            formData.append("project_id", data.project_id);
            formData.append("date", data.date);
            formData.append("no_vat", includedVat);
            formData.append("total", totalAmount);
            formData.append("vat", vat);
            formData.append("subject", data.subject);
            formData.append("content", data.content);
            formData.append("to", data.to);
            if (items.length > 0) {
                formData.append("attr", JSON.stringify(items));
            }
            if (selectedUsers > 0) {
                formData.append("users", JSON.stringify(selectedUsers));
            }
            formData.append("count", fileList.length);

            fileList.forEach((file, index) => {
                formData.append("files-" + index, file);
            });

            router.post("/user/petty_cashinsrting", formData);
        }
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
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Create petty cash
                    </span>
                </div>
                {totalAmount > tablePrices.po_budget ? (
                    <Alert
                        message="The current budget less than your order "
                        type="warning"
                        showIcon
                    />
                ) : null}
                <div className="bg-white dail-report">
                    <Table
                        dataSource={[
                            {
                                budget: tablePrices.po_budget,
                                total_expenses: tablePrices.po_expenses,
                                amount: totalAmount,
                                expenses: tablePrices.po_expenses - totalAmount,
                            },
                        ]}
                        columns={[
                            {
                                title: "Budget",
                                dataIndex: "budget",
                                key: "budget",
                            },
                            {
                                title: "Total expenses",
                                dataIndex: "total_expenses",
                                key: "total_expenses",
                            },
                            {
                                title: "Amount",
                                dataIndex: "amount",
                                key: "amount",
                            },
                            {
                                title: "Expenses",
                                dataIndex: "expenses",
                                key: "expenses",
                            },
                        ]}
                        pagination={{ hideOnSinglePage: true }}
                    />
                </div>
                <div className="bg-white p-4 rounded-md space-y-3">
                    <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Ref
                            </label>
                            <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                value={props.reference}
                                disabled
                                required
                            />
                        </div>
                        <div className="w-full h-full flex flex-col">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Date
                            </label>
                            <DatePicker
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
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Subject
                            </label>
                            <input
                                type="text"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Subject"
                                required
                                name="subject"
                                value={data.subject}
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Projects
                            </label>
                            <select
                                id="project_id"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                value={data.project_id}
                                name="project_id"
                                onChange={onChange}
                            >
                                <option>Choose a project</option>

                                {props.projects.map((project) => {
                                    return (
                                        <Fragment key={project.id}>
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
                                To
                            </label>
                            <input
                                type="text"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="to"
                                name="to"
                                value={data.to}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="relative">
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                CC
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
                    <div className="border rounded-lg dail-report">
                        <Table
                            size="small"
                            columns={[
                                {
                                    title: "Name",
                                    dataIndex: "name",
                                    key: "name",
                                },
                                {
                                    title: "Email",
                                    dataIndex: "email",
                                    key: "email",
                                },
                                {
                                    title: "Action",
                                    key: "action",
                                    render: (_, record) => (
                                        <Space size="middle">
                                            <Button
                                                type="primary"
                                                danger
                                                onClick={() =>
                                                    deleteUser(record.key)
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </Space>
                                    ),
                                },
                            ]}
                            dataSource={rowsOfTable}
                            pagination={{ hideOnSinglePage: true }}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">
                            Content
                        </label>
                        <textarea
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Write your thoughts here..."
                            name="content"
                            value={data.content}
                            onChange={onChange}
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
                    <div className="flex items-center justify-between">
                        <span className="text-lg text-gray-700">Items</span>
                        <Button
                            type="primary"
                            className="rounded-lg"
                            onClick={addItem}
                        >
                            Add
                        </Button>
                    </div>
                    <div className="grid lg:grid-cols-8 items-center gap-3">
                        {items.map((item, index) => {
                            return (
                                <>
                                    <div className="lg:col-span-3 flex items-center gap-3">
                                        <div className="max-w-[36px] w-full">
                                            {index == 0 ? (
                                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                                    No.
                                                </label>
                                            ) : null}
                                            <input
                                                type="text"
                                                className="border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                value={index + 1}
                                                required
                                                disabled
                                            />
                                        </div>
                                        <div className="w-full flex flex-col">
                                            {index == 0 ? (
                                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                                    Item dis
                                                </label>
                                            ) : null}
                                            <textarea
                                                name="dis"
                                                rows="1"
                                                className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                value={item.dis}
                                                placeholder="Item dis..."
                                                onChange={(e) =>
                                                    editItem(e, index)
                                                }
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div>
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Unit
                                            </label>
                                        ) : null}
                                        <input
                                            name="unit"
                                            type="text"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Unit"
                                            value={item.unit}
                                            required
                                            onChange={(e) => editItem(e, index)}
                                        />
                                    </div>
                                    <div>
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Unit Price
                                            </label>
                                        ) : null}
                                        <input
                                            name="unit_price"
                                            type="number"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Unit Price"
                                            value={item.unit_price}
                                            required
                                            onChange={(e) => editItem(e, index)}
                                        />
                                    </div>
                                    <div>
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Qty
                                            </label>
                                        ) : null}
                                        <input
                                            name="qty"
                                            type="number"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Qty"
                                            value={item.qty}
                                            required
                                            onChange={(e) => editItem(e, index)}
                                        />
                                    </div>
                                    <div>
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Total
                                            </label>
                                        ) : null}
                                        <input
                                            type="number"
                                            className="disabled:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Total"
                                            value={item.qty * item.unit_price}
                                            required
                                            disabled
                                        />
                                    </div>
                                    <div>
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Delete
                                            </label>
                                        ) : null}
                                        <Button
                                            type="primary"
                                            danger
                                            className=" !px-4 "
                                            onClick={() => deleteItem(index)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                    <div>
                        <span className="text-lg text-gray-700">
                            Total amount : {totalAmount}
                        </span>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md">
                    <Checkbox
                        onChange={(e) => {
                            setIncludedVat(e.target.checked);
                        }}
                        checked={includedVat}
                        className="!text-base !font-medium !text-gray-700"
                    >
                        Included vat
                    </Checkbox>
                    {includedVat ? (
                        <span className="!block mt-3 !text-base !font-medium !text-gray-700">
                            Vat is : {vat}
                        </span>
                    ) : null}
                </div>
                {totalAmount > tablePrices.po_budget ? (
                    <Alert
                        message="The current budget less than your order "
                        type="warning"
                        showIcon
                    />
                ) : null}
                <div className="flex items-center gap-2">
                    {totalAmount <= tablePrices.po_budget ? (
                        <div>
                            <Button type="primary" onClick={() => submit()}>
                                Create
                            </Button>
                        </div>
                    ) : null}
                    <Button type="default" onClick={() => preview()}>
                        Preview
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
