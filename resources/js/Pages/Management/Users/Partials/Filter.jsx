import { DatePicker } from "antd";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Filter = ({ filter, setFilter, projects, roles }) => {
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
                    User
                </label>
                <input
                    type="text"
                    className="border border-gray-300  text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    name="id"
                    placeholder="User.."
                    onChange={(e) =>
                        setFilter((prev) => {
                            return { ...prev, employee: e.target.value };
                        })
                    }
                />
            </div>
            <div>
                <label
                    htmlFor="project"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Projects
                </label>
                <select
                    id="project"
                    className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    name="project_id"
                    value={filter.project_id}
                    onChange={(e) =>
                        setFilter((prev) => {
                            return {
                                ...prev,
                                project_id: e.target.value,
                            };
                        })
                    }
                >
                    <option value={0}>Choose a project</option>
                    {projects.map((project) => {
                        return (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div>
                <label
                    htmlFor="roles"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Roles
                </label>
                <select
                    id="roles"
                    className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    name="user_id"
                    value={filter.user_id}
                    onChange={(e) =>
                        setFilter((prev) => {
                            return {
                                ...prev,
                                role_id: e.target.value,
                            };
                        })
                    }
                >
                    <option value={0}>Choose a user</option>
                    {roles.map((user) => {
                        return (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                    Contract date
                </label>
                <DatePicker
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
                                contract_date: dateString,
                            };
                        })
                    }
                    placeholder="From"
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                    Contract ex
                </label>
                <DatePicker
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
                                contract_ex: dateString,
                            };
                        })
                    }
                    placeholder="To"
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                    Identity date
                </label>
                <DatePicker
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
                                identity_date: dateString,
                            };
                        })
                    }
                    placeholder="Date Of Delivery"
                />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                    Type
                </label>
                <select
                    className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    value={filter.laborer}
                    onChange={(e) =>
                        setFilter((prev) => {
                            return {
                                ...prev,
                                laborer: e.target.value,
                            };
                        })
                    }
                >
                    <option value="1">Choose a type</option>
                    <option value="1">laborer</option>
                    <option value="0">employee</option>
                </select>
            </div>
        </div>
    );
};

export default Filter;
