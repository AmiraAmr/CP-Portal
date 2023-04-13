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
                <label
                    htmlFor="suppliers"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Po
                </label>
                <input
                    type="text"
                    className="border border-gray-300  text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    name="id"
                    placeholder="PO.."
                    onChange={(e) =>
                        setFilter((prev) => {
                            return { ...prev, ref: e.target.value };
                        })
                    }
                />
            </div>
            <div className="relative w-full">
                <label
                    htmlFor="suppliers"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Suppliers
                </label>
                <input
                    id="suppliers"
                    type="text"
                    className="border border-gray-300  text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    name="suppliers"
                    placeholder="Suppliers"
                    value={query}
                    onChange={(e) => getSuppliers(e)}
                />
                {suppliers.length > 0 ? (
                    <motion.div
                        initial={{ y: "-19px" }}
                        animate={{ y: "0" }}
                        className="absolute w-full bg-white border mt-2 shadow-lg p-2 py-3 rounded-lg z-10"
                    >
                        {suppliers?.map((supplier, index) => {
                            return (
                                <div
                                    key={index}
                                    className="text-sm cursor-pointer p-2 transition-all hover:bg-gray-100 rounded whitespace-nowrap overflow-hidden"
                                    style={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: "1",
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                    }}
                                    onClick={() => {
                                        setFilter((prev) => {
                                            return {
                                                ...prev,
                                                supplier_id: supplier.id,
                                            };
                                        });
                                        setSuppliers([]);
                                        setQuery(
                                            supplier.comp
                                                ? supplier.comp
                                                : supplier.supplier_name
                                        );
                                    }}
                                >
                                    {supplier.comp
                                        ? supplier.comp
                                        : supplier.supplier_name}
                                </div>
                            );
                        })}
                    </motion.div>
                ) : null}
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
                    htmlFor="users"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Users
                </label>
                <select
                    id="users"
                    className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    name="user_id"
                    value={filter.user_id}
                    onChange={(e) =>
                        setFilter((prev) => {
                            return {
                                ...prev,
                                user_id: e.target.value,
                            };
                        })
                    }
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
            <div>
                <label
                    htmlFor="from"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    From
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
                                from: dateString,
                            };
                        })
                    }
                    placeholder="From"
                />
            </div>
            <div>
                <label
                    htmlFor="to"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    To
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
                                to: dateString,
                            };
                        })
                    }
                    placeholder="To"
                />
            </div>
            <div>
                <label
                    htmlFor="delivery_date"
                    className="block mb-2 text-sm font-medium text-gray-900"
                >
                    Delivery date
                </label>
                <DatePicker
                    id="delivery_date"
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
                                delivery_date: dateString,
                            };
                        })
                    }
                    placeholder="Date Of Delivery"
                />
            </div>
            {/* <div>
                <button
                    title="Filter"
                    type="button"
                    className="filament-icon-button flex items-center justify-center rounded-full relative hover:bg-gray-500/5 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none text-primary-500 focus:bg-primary-500/10  w-10 h-10 filament-tables-filters-trigger"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="sr-only">Filter</span>
                    <svg
                        className="stroke-blue-600 w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        ></path>
                    </svg>
                </button>

                {isOpen ? (
                    <motion.form
                        initial={{ y: "-19px" }}
                        animate={{ y: "0" }}
                        className="max-w-xs w-full rounded-lg z-10 absolute bg-white shadow-lg border top-12 right-0"
                    >
                        <div className="p-4 space-y-6">
                            <div className="grid grid-cols-1 gap-4"></div>
                            <div className="text-end">
                                <button
                                    type="reset"
                                    className="inline-flex items-center justify-center gap-0.5 font-medium hover:underline focus:outline-none focus:underline text-sm text-red-600 hover:text-red-500 dark:text-red-500 dark:hover:text-red-400"
                                >
                                    Reset filters
                                </button>
                            </div>
                        </div>
                    </motion.form>
                ) : null}
            </div> */}
        </div>
    );
};

export default Filter;
