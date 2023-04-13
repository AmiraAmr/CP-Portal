import { Button, Checkbox, DatePicker } from "antd";
import React, { Fragment } from "react";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";

const Installments = ({ payment, setPayment, loan, setLoan }) => {
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
                item[event.target.name] = event.target.value;
            }
            return item;
        });
        setPayment(edit);
    };
    return (
        <div className="bg-white p-4 rounded-md space-y-3">
            {loan ? (
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
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            No.
                                        </label>
                                        <input
                                            name="No."
                                            rows="1"
                                            className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                            value={index + 1}
                                            disabled
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Item description
                                        </label>
                                        <input
                                            name="item"
                                            rows="1"
                                            className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                            value={item.item}
                                            placeholder="Item"
                                            onChange={(e) =>
                                                editPayment(e, index)
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block mb-2 text-sm font-medium text-gray-900">
                                            Value
                                        </label>
                                        <input
                                            name="value"
                                            type="text"
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            placeholder="value"
                                            value={item.value}
                                            required
                                            onChange={(e) =>
                                                editPayment(e, index)
                                            }
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
