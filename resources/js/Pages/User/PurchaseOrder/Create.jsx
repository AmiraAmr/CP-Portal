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
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import { router, useForm } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
import { toWords } from "number-to-words";
import Installments from "./Partials/Installments";
import GetPricingSupplier from "./Partials/GetPricingSupplier";

const Create = (props) => {
    const [totalpoExpenses, setTotalpoExpenses] = useState(0);
    const [tablePrices, setTablePrices] = useState({});
    const [checked, setChecked] = useState(false);
    const [cash, setCash] = useState(false);
    const [vat, setVat] = useState(0);
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
        content:
            "with reference to the above subject your quotation no xxxxxx (rev.0) Dated on XXXXX , we would like to place the purchase order for Below Items.",
        date: "",
        files: [],
        supplier_id: "",
        ref: props.reference,
        contractor: {},
        total: 0,
        subject: "",
        after_discount: 0,
        discount_total: 0,
        overall: 0,
        transportation: "",
        delivery_date: "",
        material_avalibility: "",
        project_id: "",
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
    const [payment, setPayment] = useState([]);
    const [items, setItems] = useState([
        {
            dis: "",
            unit: "",
            qty: 0,
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

    const editItem2 = (value, id, price, idProduct) => {
        const editItems = items.map((item, index) => {
            if (index === id) {
                item.dis = value;
                item.value = price;
                item.id = idProduct;
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
        let total = 0;
        items.forEach((item) => {
            if (!isNaN(item.total)) total += item.total;
        });
        setData("total", total);
    }, [items]);

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

    const resetData = () => {
        setData({
            content: "",
            date: moment().toDate(),
            project_id: "",
            subject: "",
            to: "",
            cc: "",
        });
        setSelectedUsers([]);
        setRowsOfTable([]);
        setFileList([]);
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
            if (selectedUsers > 0) {
                formData.append("users", JSON.stringify(selectedUsers));
            }
            router.post("/user/insarting_data", formData);
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
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Create Purchase Order
                    </span>
                </div>
                {totalpoExpenses > tablePrices.po_budget ? (
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
                                amount: data.total,
                                expenses: tablePrices.po_expenses - data.total,
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
                                htmlFor="subject"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Subject
                            </label>
                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                        <GetPricingSupplier
                            data={data}
                            setData={setData}
                            setItems={setItems}
                            setPayment={setPayment}
                            setDiscount={setDiscount}
                            setDiscountPercentage={setDiscountPercentage}
                            setCash={setCash}
                            setChecked={setChecked}
                        />
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
                                defaultValue={0}
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
                                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                                class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                placeholder="Material avalibility"
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
                                onChange={(date, dateString) =>
                                    setData("delivery_date", dateString)
                                }
                            />
                        </div>
                        <div className="relative">
                            <label
                                htmlFor="cc"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
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
                    <div className="border">
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
                                    responsive: ["md"],
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
                        <span class="text-lg text-gray-700">
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
                    <span className="block text-base">Discount %</span>
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
                {totalpoExpenses > tablePrices.po_budget ? (
                    <Alert
                        message="The current budget less than your order "
                        type="warning"
                        showIcon
                    />
                ) : null}

                <div className="flex items-center gap-2">
                    {totalpoExpenses <= tablePrices.po_budget ? (
                        <div>
                            <Button
                                type="primary"
                                loading={loading}
                                onClick={() => submit()}
                            >
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
