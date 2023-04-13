import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
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

const Create = (props) => {
    const [checked, setChecked] = useState(false);
    const [cash, setCash] = useState(false);
    const [vat, setVat] = useState(0);
    const { Dragger } = Upload;
    const [fileList, setFileList] = useState([]);

    const [products, setProducts] = useState({ id: 0, data: [] });

    const [discount, setDiscount] = useState("");
    const [discountPercentage, setDiscountPercentage] = useState("");
    const [loading, setLoading] = useState(false);

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
    const [payment, setPayment] = useState([
        {
            name: "",
            percentage: "",
            amount: "",
            note: "",
            date: "",
        },
    ]);
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

    const editItem2 = (value, id) => {
        const editItems = items.map((item, index) => {
            if (index === id) {
                item.dis = value;
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

    const submit = () => {
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

        formData.append("count", fileList.length);
        fileList.forEach((file, index) => {
            formData.append("files-" + index, file);
        });

        router.post("/pricing_supplierinsert", formData);
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

    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Create pricing supplier
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
                        <div class="space-y-2">
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
                                defaultValue={0}
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
                            placeholder="Write here..."
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
                                    <div className="flex-1 ">
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Description
                                            </label>
                                        ) : null}
                                        <div className="w-full space-y-2 relative">
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
                                                                            index
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
                    </div>
                    <div>
                        <Button
                            type="primary"
                            className="rounded-lg"
                            onClick={addItem}
                        >
                            Add
                        </Button>
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
