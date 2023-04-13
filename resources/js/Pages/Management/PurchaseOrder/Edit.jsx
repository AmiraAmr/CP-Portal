import React, { Fragment, useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import {
    Alert,
    Button,
    Checkbox,
    Comment,
    DatePicker,
    List,
    message,
    Space,
    Table,
    Tooltip,
    Upload,
} from "antd";
import {
    InboxOutlined,
    DeleteOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
import { toWords } from "number-to-words";
import Installments from "./Partials/Installments";
import GetPricingSupplier from "./Partials/GetPricingSupplier";
import moment from "moment";

const Edit = (props) => {
    const [totalpoExpenses, setTotalpoExpenses] = useState(0);
    const [tablePrices, setTablePrices] = useState({});
    const [checked, setChecked] = useState(
        props.data.on_vat == 1 ? true : false
    );
    const [cash, setCash] = useState(props.data.cash == 1 ? true : false);
    const [vat, setVat] = useState(props.data.vat ? props.data.vat : 0);
    const { Dragger } = Upload;
    const [fileList, setFileList] = useState([]);

    const [products, setProducts] = useState({ id: 0, data: [] });

    const [discount, setDiscount] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectUser, setSelectUser] = useState([]);

    const [selectedUsers, setSelectedUsers] = useState([]);
    const [rowsOfTable, setRowsOfTable] = useState([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        attributes: [],
        content: props.data.order_for,
        date: props.data.date,
        files: [],
        supplier_id: props.data.supplier_id,
        ref: props.data.ref,
        contractor: {},
        total: 0,
        subject: props.data.subject,
        after_discount: 0,
        discount_total: 0,
        overall: 0,
        transportation: props.data.transportation,
        delivery_date: props.data.delivery_date,
        material_avalibility: props.data.material_avalibility,
        project_id: props.data.project_id,
        to: props.data.to,
    });
    const [files, setFiles] = useState(props.data.purchase_order_attachment);
    const [comment, setComment] = useState({
        content: "",
        files: [],
        status: 0,
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
            setFileList((prev) => {
                return [...prev, file];
            });
            return false;
        },
        fileList,
    };

    const [payment, setPayment] = useState(props.data.note);

    const [items, setItems] = useState([]);
    const addItem = () => {
        setItems((prev) => {
            return [
                ...prev,
                {
                    dis: "",
                    unit: "",
                    qty: 0,
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
                    event.target.name == "qty" ||
                    event.target.name == "unit_price"
                ) {
                    item.total = Number(item.qty) * Number(item.unit_price);
                }
            }
            return item;
        });
        setItems(editItems);
    };

    const editItem2 = (value, id, price) => {
        const editItems = items.map((item, index) => {
            if (index === id) {
                item.dis = value;
                item.value = price;
            }
            return item;
        });
        setItems(editItems);
    };

    const getProduct = (name, id) => {
        axios({
            url: "/autoCompleteProduct",
            method: "post",
            data: {
                name: name,
            },
        }).then((res) => {
            setProducts({ id: id, data: res.data.data });
            if (!name) setProducts([]);
        });
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

    const deleteUser = (id) => {
        console.log(id);
        setSelectedUsers((prev) => {
            return prev.filter((user, index) => user.id !== id);
        });
    };

    useEffect(() => {
        setItems([]);
        if (props.data.attributes.length > 0) {
            props.data.attributes.forEach((e) => {
                setItems((prev) => {
                    return [
                        ...prev,
                        {
                            id: e.id,
                            dis: e.pivot.dis,
                            qty: e.pivot.qty,
                            product_id: e.pivot.product_id,
                            unit: e.pivot.unit,
                            unit_price: e.pivot.unit_price,
                            total: e.pivot.total,
                        },
                    ];
                });
            });
        }
        if (props.data.attributes2.length > 0) {
            props.data.attributes2.forEach((e) => {
                setItems((prev) => {
                    return [...prev, e];
                });
            });
        }
    }, [props.data.attributes, props.data.attributes2]);

    useEffect(() => {
        let total = 0;
        items.forEach((item) => {
            if (!isNaN(item.total)) total += item.total;
            return item;
        });
        setData("total", total);
    }, [items]);

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

    const handleDiscount = (e) => {
        setDiscount(e.target.value);
        let discountPercentage = 0;
        if (data.total > 0) {
            discountPercentage =
                (Number(e.target.value) * Number(data.total)) / Number(100);
            setDiscountPercentage(discountPercentage.toFixed(2));
        }
    };

    const handleDiscountPercentage = (e) => {
        setDiscountPercentage(e.target.value);
        let discount = 0;
        if (data.total > 0) {
            discount =
                (Number(e.target.value) * Number(100)) / Number(data.total);
            setDiscount(discount.toFixed(2));
        }
    };

    useEffect(() => {
        if (data.total !== 0 && discountPercentage) {
            setData("discount_total", discountPercentage);
        }
    }, [discountPercentage, data.total]);

    useEffect(() => {
        setData(
            "after_discount",
            (Number(data.total) - Number(data.discount_total)).toFixed(2)
        );
    }, [data.discount_total, data.total]);

    useEffect(() => {
        let sum = 0;
        if (checked) {
            sum = (Number(15) * Number(data.after_discount)) / Number(100) ?? 0;
            sum = Math.round(sum);
            setVat(sum);
            setData("overall", Number(data.after_discount) + Number(sum));
        } else {
            setVat(0);
            setData("overall", Number(data.after_discount));
        }
    }, [checked, data.after_discount]);

    useEffect(() => {
        setTotalpoExpenses(
            Number(data.overall) + Number(tablePrices.po_expenses)
        );
    }, [data.overall, tablePrices]);

    useEffect(() => {
        props.projects.forEach((project) => {
            if (data.project_id == project.id) {
                setTablePrices(project);
            }
        });
    }, [data.project_id]);

    const handleDeleteFiles = (id) => {
        const newFiles = files.map((file) => {
            if (file.id == id) {
                if (file.deleted) {
                    file.deleted = !file.deleted;
                } else {
                    file.deleted = true;
                }
            }
            return file;
        });
        setFiles(newFiles);
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
            note: payment,
            order_for: data.content,
            project: { name: project.name },
            to: data.to,
            ref: data.ref,
            date: data.date,
            material_avalibility: data.material_avalibility,
            delivery_date: data.delivery_date,
            transportation: data.transportation,
            attributes: items,
            project_id: data.project_id,
            vat: vat,
            discount: data.discount,
            subtotal: data.total,
            total: data.overall,
            supplier_id: data.supplier_id,
        });
        window.open(url, "_blank");
    };

    const submit = () => {
        if (totalpoExpenses <= tablePrices.po_budget) {
            const formData = new FormData();
            if (payment.length > 0) {
                formData.append("payment", JSON.stringify(payment));
            }
            if (items.length > 0) {
                formData.append("attr", JSON.stringify(items));
            }
            formData.append("date", data.date);
            formData.append("no_vat", checked);
            formData.append("cash", cash);
            formData.append("discount", data.discount_total);
            formData.append("percentage_discount", discount);
            formData.append("vat", vat);
            formData.append("total", data.total);
            formData.append("subject", data.subject);
            formData.append("order_for", data.content);
            formData.append("overall", data.overall);
            formData.append("ref", data.ref);
            formData.append("supplier_id", data.supplier_id);
            formData.append("project_id", data.project_id);

            formData.append("transportation", data.transportation);
            formData.append("delivery_date", data.delivery_date);
            formData.append("material_avalibility", data.material_avalibility);

            formData.append("count", fileList.length);
            fileList.forEach((file, index) => {
                formData.append("files-" + index, file);
            });
            var deletedfiles = [];
            files.forEach((e) => {
                if (e.deleted) {
                    deletedfiles.push(e.id);
                }
            });
            formData.append("deletedfiles", deletedfiles);

            if (selectedUsers > 0) {
                formData.append("users", JSON.stringify(selectedUsers));
            }
            formData.append("contentmanager", comment.content);
            formData.append("status", comment.status);
            router.post(
                `/managers/action_purchase_order/${props.data.id}`,
                formData
            );
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
        setLoading(false);
    }, [errors, props.errors]);

    return (
        <ManagementLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Edit Purchase Order
                    </span>
                </div>
                {totalpoExpenses > tablePrices.po_budget ? (
                    <Alert
                        message="The current budget less than your order "
                        type="warning"
                        showIcon
                    />
                ) : null}

                <div className="bg-white p-4 rounded-md space-y-3">
                    <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
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
                                value={data.ref}
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
                                value={moment(data.date, "YYYY/MM/DD")}
                                onChange={(date, dateString) =>
                                    setData("date", dateString)
                                }
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="subject"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Subject
                            </label>
                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="subject"
                                value={data.subject}
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="supplier"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Supplier
                            </label>
                            <select
                                id="supplier"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                value={data.supplier_id}
                                name="supplier_id"
                                onChange={onChange}
                            >
                                <option value={0}>Choose a supplier</option>

                                {props.suppliers.map((supplier) => {
                                    return (
                                        <>
                                            <option
                                                value={supplier.id}
                                                key={supplier.id}
                                            >
                                                {supplier.comp
                                                    ? supplier.comp
                                                    : supplier.customer_name}
                                            </option>
                                        </>
                                    );
                                })}
                            </select>
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
                                <option value={0}>Choose a project</option>

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
                            <label
                                htmlFor="material_avalibility"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Material avalibility
                            </label>
                            <input
                                id="material_avalibility"
                                name="material_avalibility"
                                type="text"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Material avalibility"
                                value={data.material_avalibility}
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="transportation"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Transportation
                            </label>
                            <input
                                id="transportation"
                                name="transportation"
                                type="text"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Transportation"
                                value={data.transportation}
                                onChange={onChange}
                            />
                        </div>
                        <div className="w-full flex flex-col">
                            <label
                                htmlFor="delivery-date"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Delivery Date
                            </label>
                            <DatePicker
                                id="delivery-date"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "8px",
                                }}
                                value={moment(data.delivery_date, "YYYY/MM/DD")}
                                onChange={(date, dateString) =>
                                    setData("delivery_date", dateString)
                                }
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="transportation"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                To
                            </label>
                            <input
                                id="to"
                                name="to"
                                type="text"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="to"
                                value={data.to}
                                onChange={onChange}
                            />
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
                        ></textarea>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md">
                    <label className="block mb-2 text-base font-medium text-gray-900 ">
                        Attachments:
                    </label>
                    <Table
                        dataSource={files}
                        columns={[
                            {
                                title: "File",
                                dataIndex: "path",
                                key: "path",
                            },
                            {
                                title: "Action",
                                key: "action",
                                render: (_, record) => (
                                    <Space size="middle">
                                        <button>Preview </button>
                                        <a
                                            href={`/uploads/purchase_order/${props.data.ref}/${record.path}`}
                                            download
                                        >
                                            Download
                                        </a>
                                        <button
                                            onClick={() =>
                                                handleDeleteFiles(record.id)
                                            }
                                        >
                                            {record.deleted
                                                ? "Restore"
                                                : "Delete"}
                                        </button>
                                    </Space>
                                ),
                            },
                        ]}
                        pagination={{ hideOnSinglePage: true }}
                    />
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
                                    <div className="col-span-3 flex items-center gap-3 flex-1">
                                        <div className="w-full space-y-2 relative">
                                            {index == 0 ? (
                                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                                    Description
                                                </label>
                                            ) : null}
                                            <input
                                                name="dis"
                                                rows="1"
                                                className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                                value={item.dis}
                                                placeholder="Item dis..."
                                                onChange={(e) => {
                                                    getProduct(
                                                        e.target.value,
                                                        index
                                                    );
                                                    editItem(e, index);
                                                }}
                                            />
                                            {products?.data?.length > 0 &&
                                            products.id == index ? (
                                                <motion.div
                                                    initial={{ y: "-19px" }}
                                                    animate={{ y: "0" }}
                                                    className="absolute w-full bg-white border mt-2 shadow-lg p-2  rounded-lg z-10"
                                                >
                                                    {products?.data?.map(
                                                        (item) => {
                                                            return (
                                                                <div
                                                                    key={`product-${index}`}
                                                                    className="cursor-pointer p-2 transition-all hover:bg-gray-100 rounded-md"
                                                                    onClick={() => {
                                                                        editItem2(
                                                                            item.name,
                                                                            index,
                                                                            item.value
                                                                        );
                                                                        getProduct(
                                                                            ""
                                                                        );
                                                                    }}
                                                                >
                                                                    {item.name}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </motion.div>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Unit
                                            </label>
                                        ) : null}
                                        <input
                                            id={`unit-${index}`}
                                            name="unit"
                                            type="text"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Unit"
                                            value={item.unit}
                                            required
                                            onChange={(e) => editItem(e, index)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Qty
                                            </label>
                                        ) : null}
                                        <input
                                            id={`qty-${index}`}
                                            name="qty"
                                            type="number"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="qty"
                                            value={item.qty}
                                            required
                                            onChange={(e) => editItem(e, index)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Unit Price
                                            </label>
                                        ) : null}
                                        <input
                                            id={`qty-${index}`}
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
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Previous value
                                            </label>
                                        ) : null}
                                        <input
                                            type="number"
                                            className="disabled:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Previous value"
                                            value={item.value}
                                            disabled
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Total
                                            </label>
                                        ) : null}
                                        <input
                                            type="number"
                                            className="disabled:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Previous value"
                                            value={item.total}
                                            disabled
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
                        <span className="text-lg text-gray-700">
                            Total amount : {data.total}
                        </span>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="bg-white p-4 rounded-md ">
                        <span className="block text-base">SubtotalAmount</span>
                        <span className="block text-gray-500">
                            word total Amount : {toWords(data.total)}
                        </span>
                        <span className="block text-gray-500">
                            total Amount : {data.total}
                        </span>
                    </div>
                    <div className="bg-white p-4 rounded-md space-y-2">
                        <span className="block text-base">Discount</span>
                        <div className="grid grid-cols-2 gap-3">
                            <input
                                name="discount"
                                rows="1"
                                className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="discount"
                                value={discount}
                                onChange={(e) => handleDiscount(e)}
                            />
                            <input
                                name="discount-percentage"
                                rows="1"
                                className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="discount percentage"
                                value={discountPercentage}
                                onChange={(e) => handleDiscountPercentage(e)}
                            />
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-md space-y-2">
                        <span className="block text-base">After Discount</span>
                        <div className="grid md:grid-cols-2 grid-cols-1">
                            <input
                                name="after_discount"
                                rows="1"
                                className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="after discount"
                                value={data.after_discount}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-md space-y-2">
                        <div>
                            <span className="block text-base">Vat</span>
                            <Checkbox
                                onChange={(e) => setChecked(e.target.checked)}
                                checked={checked}
                            >
                                Included Vat
                            </Checkbox>
                        </div>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                            <input
                                className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                value={15}
                                disabled
                            />
                            <input
                                name="vat"
                                rows="1"
                                className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="vat"
                                value={vat}
                                disabled
                            />
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-md space-y-2">
                        <div>
                            <span className="block text-base">
                                Total Amount Included Vat & Discount
                            </span>
                        </div>
                        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                            <input
                                className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                value={toWords(data.overall)}
                                disabled
                            />
                            <input
                                name="vat"
                                rows="1"
                                className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="vat"
                                value={data.overall}
                                disabled
                            />
                        </div>
                    </div>
                </div>
                <Installments
                    payment={payment}
                    setPayment={setPayment}
                    overall={data.overall}
                    cash={cash}
                    setCash={setCash}
                />
                <div className="bg-white p-4 rounded-md">
                    <List
                        className="comment-list"
                        header={"Managers Comments"}
                        itemLayout="horizontal"
                        dataSource={props.data.purchase_order_cycle}
                        renderItem={(item) => (
                            <li className="my-4">
                                <Comment
                                    author={item.role.name}
                                    avatar={"/avatar.jpg"}
                                    content={
                                        item.comment_purchase_order_cycle
                                            ? item.comment_purchase_order_cycle
                                                  .content
                                            : "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain"
                                    }
                                    datetime={
                                        <Tooltip
                                            title={moment(
                                                item.created_at
                                                    ? item.created_at
                                                    : item.updated_at
                                            ).format("LL")}
                                        >
                                            <span>
                                                {moment(
                                                    item.created_at
                                                        ? item.created_at
                                                        : item.updated_at
                                                ).fromNow()}
                                            </span>
                                        </Tooltip>
                                    }
                                />
                            </li>
                        )}
                    />
                </div>
                <div className="bg-white p-4 rounded-md">
                    <span className="block mb-2 text-base font-medium text-gray-900 ">
                        {props.auth.user.role.name}
                    </span>
                    <span className="block mb-2 text-gray-400 text-sm">
                        Add a comment and an attachment
                    </span>
                    <div className="flex flex-col gap-3">
                        <textarea
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-400 rounded-lg border border-gray-200 focus:ring-blue-500 focus:border-blue-500 "
                            placeholder="Content"
                            value={comment.content}
                            onChange={(e) =>
                                setComment((prev) => {
                                    return { ...prev, content: e.target.value };
                                })
                            }
                        ></textarea>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Files
                            </label>
                            <Upload
                                name="Files"
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
                                <Button icon={<UploadOutlined />}>
                                    Click to Upload
                                </Button>
                            </Upload>
                        </div>
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

                <div className="flex items-center gap-2">
                    <div>
                        <Button
                            type="primary"
                            loading={loading}
                            onClick={() => submit()}
                        >
                            Update
                        </Button>
                    </div>
                </div>
            </div>
        </ManagementLayout>
    );
};

export default Edit;
