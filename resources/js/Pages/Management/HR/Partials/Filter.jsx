import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Filter = ({ filter, setFilter, projects, users }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [query, setQuery] = useState("");

    const getSuppliers = (e) => {
        setQuery(e.target.value);
        axios({
            url: "/managers/getselectboxsupp",
            method: "post",
            data: {
                name: e.target.value,
            },
        }).then((res) => {
            setSuppliers(res.data.data);
        });
    };

    return (
        <div className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center gap-3">
            <div className="relative w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                    Name
                </label>
                <input
                    type="text"
                    className="border border-gray-300  text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    name="id"
                    placeholder="Mohamed.."
                    onChange={(e) =>
                        setFilter((prev) => {
                            return { ...prev, name: e.target.value };
                        })
                    }
                />
            </div>
            <div className="relative w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                    Supervisor
                </label>
                <input
                    type="text"
                    className="border border-gray-300  text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    name="id"
                    placeholder="Mohamed.."
                    onChange={(e) =>
                        setFilter((prev) => {
                            return { ...prev, supervisor: e.target.value };
                        })
                    }
                />
            </div>
            <div className="relative w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900">
                    Project
                </label>
                <input
                    type="text"
                    className="border border-gray-300  text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    name="id"
                    placeholder="Project"
                    onChange={(e) =>
                        setFilter((prev) => {
                            return { ...prev, project: e.target.value };
                        })
                    }
                />
            </div>
            <div>
                <label
                    htmlFor="from"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Date
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
                        setFilter((prev) => {
                            return {
                                ...prev,
                                date: dateString,
                            };
                        })
                    }
                />
            </div>
        </div>
    );
};

export default Filter;
