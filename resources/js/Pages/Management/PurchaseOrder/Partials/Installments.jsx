import { Button, Checkbox, DatePicker } from "antd";
import React, { Fragment } from "react";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

const Installments = ({ payment, setPayment, overall, cash, setCash }) => {
    const addPayment = () => {
        setPayment((prev) => {
            return [
                ...prev,
                {
                    name: "",
                    percentage: "",
                    amount: "",
                    note: "",
                    date: "",
                },
            ];
        });
    };
    const deletePayment = (id) => {
        setPayment((prev) => {
            return prev.filter((item, index) => index !== id);
        });
    };
    const editPayment = (event, id) => {
        const edit = payment.map((item, index) => {
            if (index === id) {
                if (event.target.name !== "percentage") {
                    item[event.target.name] = event.target.value;
                }
                if (event.target.name == "percentage") {
                    if (item.percentage >= 0 && item.percentage <= 100) {
                        item.percentage = event.target.value;
                    }
                    if (item.percentage < 0) {
                        item.percentage = 0;
                    }
                    if (item.percentage > 100) {
                        item.percentage = 100;
                    }

                    item.amount = (item.percentage * overall) / 100;
                }
            }
            return item;
        });
        setPayment(edit);
    };
    return (
        <div className="bg-white p-4 rounded-md space-y-3">
            <div className="flex flex-col gap-2">
                <span className="text-lg">Installments</span>
                <Checkbox
                    checked={cash}
                    onChange={(e) => setCash(e.target.checked)}
                >
                    Divided Into Installments
                </Checkbox>
            </div>
            {cash ? (
                <>
                    <div className="flex items-center justify-between">
                        <span className="text-lg"></span>
                        <Button
                            type="primary"
                            className="rounded-lg"
                            onClick={addPayment}
                        >
                            Add
                        </Button>
                    </div>
                    <div className="flex flex-col gap-4">
                        {payment.map((item, index) => {
                            return (
                                <div
                                    className="flex md:flex-row flex-col md:items-center gap-4"
                                    key={index}
                                >
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
                                    <div className="flex-1">
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Installment
                                            </label>
                                        ) : null}
                                        <input
                                            name="name"
                                            rows="1"
                                            className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                            value={item.name}
                                            placeholder="Installment"
                                            onChange={(e) =>
                                                editPayment(e, index)
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Percentage
                                            </label>
                                        ) : null}
                                        <input
                                            name="percentage"
                                            type="number"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Percentage"
                                            value={item.percentage}
                                            required
                                            onChange={(e) =>
                                                editPayment(e, index)
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Amount
                                            </label>
                                        ) : null}
                                        <input
                                            name="amount"
                                            type="number"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="amount"
                                            value={item.amount}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Payment details
                                            </label>
                                        ) : null}
                                        <input
                                            name="note"
                                            type="text"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="Payment details"
                                            value={item.note}
                                            required
                                            onChange={(e) =>
                                                editPayment(e, index)
                                            }
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        {index == 0 ? (
                                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                                Date
                                            </label>
                                        ) : null}
                                        <DatePicker
                                            id="date"
                                            style={{
                                                maxHeight: "42px",
                                                height: "100%",
                                                borderRadius: "8px",
                                                padding: "0.625rem",
                                            }}
                                            value={moment(
                                                item.date,
                                                "YYYY/MM/DD"
                                            )}
                                            onChange={(date, dateString) =>
                                                editPayment(
                                                    {
                                                        target: {
                                                            name: "date",
                                                            value: dateString,
                                                        },
                                                    },
                                                    index
                                                )
                                            }
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
                                            onClick={() => deletePayment(index)}
                                        >
                                            <DeleteOutlined />
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default Installments;
