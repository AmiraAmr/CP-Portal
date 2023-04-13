import { router } from "@inertiajs/react";
import { Button, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Create = ({ isModalOpen, setIsModalOpen, editData, users }) => {
    const [data, setData] = useState({});
    const [budget, setBudget] = useState(0);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        let formData = new FormData();
        if (data.name) {
            formData.append("name", data.name);
        }
        if (data.lat) {
            formData.append("lat", data.lat);
        }
        if (data.log) {
            formData.append("log", data.log);
        }
        if (data.duration) {
            formData.append("duration", data.duration);
        }
        if (data.bid_value) {
            formData.append("bid_value", data.bid_value);
        }
        if (data.receive_date) {
            formData.append("receive_date", data.receive_date);
        }
        if (data.po_budget) {
            formData.append("po_budget", data.po_budget);
        }
        if (data.subcontractor_budget) {
            formData.append("subcontractor_budget", data.subcontractor_budget);
        }
        if (data.employee_budget) {
            formData.append("employee_budget", data.employee_budget);
        }
        if (data.petty_cash_budget) {
            formData.append("petty_cash_budget", data.petty_cash_budget);
        }

        if (budget) {
            formData.append("budget", Math.round(budget));
        }

        if (data.projectmanager_id) {
            formData.append("projectmanager_id", data.projectmanager_id);
        }
        if (data.initial_delivery_date) {
            formData.append(
                "initial_delivery_date",
                data.initial_delivery_date
            );
        }
        if (data.final_delivery_date) {
            formData.append("final_delivery_date", data.final_delivery_date);
        }
        if (data.customer_id) {
            formData.append("customer_id", data.customer_id);
        }
        axios.post("/admin/post_project", formData).then((res) => {
            router.get(
                route("project.index", { message: "Created successfully" })
            );
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChange = (e) => {
        setData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    useEffect(() => {
        setBudget(0);
        var budgetx =
            Number(data.po_budget) +
            Number(data.subcontractor_budget) +
            Number(data.petty_cash_budget) +
            Number(data.employee_budget);
        setBudget(budgetx);
    }, [data]);

    useEffect(() => {
        setData([]);
        axios.get(`/admin/project_edit/${editData.id}`).then((res) => {
            setData(res.data);
        });
    }, [editData.id]);

    useEffect(() => {
        setData({
            comp: editData.comp,
            customer_name: editData.customer_name,
            email: editData.email,
            status: editData.status,
            country: editData.country,
        });
    }, [editData]);
    return (
        <>
            <Modal
                title="Modify Supplier"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Save"
                width={768}
            >
                <div className="flex flex-col gap-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Name
                        </label>
                        <input
                            name="name"
                            id="name"
                            type="text"
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Name"
                            value={data.name}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="lat"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Lat
                        </label>
                        <input
                            name="lat"
                            id="lat"
                            type="number"
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Lat"
                            value={data.lat}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="log"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Log
                        </label>
                        <input
                            name="log"
                            type="number"
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Log"
                            value={data.log}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Po budget
                        </label>
                        <input
                            name="po_budget"
                            type="number"
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Po budget"
                            value={data.po_budget}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Subcontractor Budget
                        </label>
                        <input
                            name="subcontractor_budget"
                            type="number"
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Subcontractor Budget"
                            value={data.subcontractor_budget}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Petty cash budget
                        </label>
                        <input
                            name="petty_cash_budget"
                            type="number"
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Petty cash budget"
                            value={data.petty_cash_budget}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Staff budget
                        </label>
                        <input
                            name="employee_budget"
                            type="number"
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Staff budget"
                            value={data.employee_budget}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Budget
                        </label>
                        <input
                            name="budget"
                            type="number"
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Budget"
                            value={budget}
                            disabled
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Bid Value
                        </label>
                        <input
                            name="bid_value"
                            type="number"
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Bid Value"
                            value={data.bid_value}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Duration
                        </label>
                        <input
                            name="duration"
                            type="text"
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Duration"
                            value={data.duration}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Receive date
                        </label>
                        <input
                            name="receive_date"
                            type="date"
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Receive date"
                            value={data.receive_date}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Initial delivery date
                        </label>
                        <input
                            name="initial_delivery_date"
                            type="date"
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Initial delivery date"
                            value={data.initial_delivery_date}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">
                            Final delivery date
                        </label>
                        <input
                            name="final_delivery_date"
                            type="date"
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Final delivery date"
                            value={data.final_delivery_date}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="status"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Project Manager
                        </label>
                        <select
                            id="users"
                            className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="projectmanager_id"
                            value={data.projectmanager_id}
                            onChange={onChange}
                        >
                            <option value={0}>Choose a user</option>
                            {users.map((user) => {
                                return (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Create;
