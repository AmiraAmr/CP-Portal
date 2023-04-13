import { router } from "@inertiajs/react";
import { Button, Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Edit = ({ isModalOpen, setIsModalOpen, editData }) => {
    const [data, setData] = useState({
        comp: "",
        customer_name: "",
        email: "",
        status: 0,
        country: "",
    });
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        axios.post(`/managers/updatesupp/${editData.id}`, data).then((res) => {
            router.get(route('suppliertable', { message: 'Modifiy successfully' }))
        })
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
        setData({
            comp: editData.comp,
            customer_name: editData.customer_name,
            email: editData.email,
            status: editData.status,
            country: editData.country,
        })
    }, [editData])
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
                            htmlFor="comp"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Company Name
                        </label>
                        <input
                            name="comp"
                            id="comp"
                            type="text"
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Company Name"
                            value={data.comp}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="customer_name"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Supplier name
                        </label>
                        <input
                            name="customer_name"
                            id="customer_name"
                            type="text"
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Company Name"
                            required=""
                            value={data.customer_name}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            E-Mail
                        </label>
                        <input
                            name="email"
                            id="email"
                            type="email"
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Email"
                            required=""
                            value={data.email}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="status"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Supplier status
                        </label>
                        <select
                            id="status"
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="status"
                            onChange={onChange}
                            value={data.status}
                        >
                            <option value="0">Choose a status</option>
                            <option value="1">Active</option>
                            <option value="2">Idle</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="country"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Country
                        </label>
                        <input
                            name="country"
                            id="country"
                            type="text"
                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            placeholder="Country"
                            required=""
                            value={data.country}
                            onChange={onChange}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Edit;
