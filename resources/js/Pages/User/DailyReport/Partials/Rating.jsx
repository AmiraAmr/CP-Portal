import axios from "axios";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Rating = ({ ratings, setRatings }) => {
    const [users, setUsers] = useState({ key: "", data: [] });
    const [query, setQuery] = useState("");

    const editRating = (event, id) => {
        const edit = ratings.map((item, index) => {
            if (index === id) {
                item[event.target.name] = event.target.value;
            }
            return item;
        });
        setRatings(edit);
    };

    const getUser = (value, name, indexOfRating) => {
        const edit = ratings.map((item, index) => {
            if (index === indexOfRating) {
                item[name] = value;
            }
            return item;
        });
        setRatings(edit);

        axios({
            url: "/user/userautocomplete",
            method: "post",
            data: {
                name: value,
            },
        }).then((res) => {
            setUsers({ key: indexOfRating, data: res.data.data });
        });
    };

    const editRating2 = (name, indexOfRating, id) => {
        const edit = ratings.map((item, index) => {
            if (index === indexOfRating) {
                item.name = name;
                item.id = id;
            }
            return item;
        });
        setRatings(edit);
    };

    const addRating = () => {
        setRatings((prev) => {
            return [
                ...prev,
                {
                    name: "",
                    performance: "",
                    commitment: "",
                },
            ];
        });
    };
    const deleteRating = (id) => {
        setRatings((prev) => {
            return prev.filter((item, index) => index !== id);
        });
    };
    return (
        <div className="bg-white p-4 rounded-md space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-lg">Ratings</span>
            </div>
            <div className="flex flex-col gap-4">
                {ratings.map((rating, index) => {
                    return (
                        <div className="flex md:flex-row flex-col md:items-center gap-4">
                            <div className="max-w-[36px] w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    No.
                                </label>
                                <input
                                    name="No."
                                    rows="1"
                                    className=" text-center block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:outline-blue-500 focus:ring-blue-500 focus:border-blue-500"
                                    value={index + 1}
                                    disabled
                                />
                            </div>
                            <div className="flex-1 relative">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Name
                                </label>
                                <input
                                    name="name"
                                    rows="1"
                                    className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                    value={rating.name}
                                    placeholder="Name..."
                                    onChange={(e) =>
                                        getUser(
                                            e.target.value,
                                            e.target.name,
                                            index
                                        )
                                    }
                                />
                                {users.data.length > 0 && users.key == index ? (
                                    <motion.div
                                        initial={{ y: "-19px" }}
                                        animate={{ y: "0" }}
                                        className="absolute w-full bg-white border mt-2 shadow-lg p-2  rounded-lg z-10"
                                    >
                                        {users.data.map((item) => {
                                            return (
                                                <div
                                                    key={item.id}
                                                    className="cursor-pointer p-2 transition-all hover:bg-gray-100 rounded-md"
                                                    onClick={() => {
                                                        editRating2(
                                                            item.name,
                                                            index,
                                                            item.id
                                                        );
                                                        setUsers((prev) => {
                                                            return {
                                                                ...prev,
                                                                data: [],
                                                            };
                                                        });
                                                    }}
                                                >
                                                    {item.name}
                                                </div>
                                            );
                                        })}
                                    </motion.div>
                                ) : null}
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Performance
                                </label>
                                <input
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    type="text"
                                    name="performance"
                                    placeholder="Performance"
                                    value={rating.performance}
                                    onChange={(e) => editRating(e, index)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Commitment
                                </label>
                                <input
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    type="text"
                                    name="commitment"
                                    placeholder="Performance"
                                    value={rating.commitment}
                                    onChange={(e) => editRating(e, index)}
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
                                    onClick={() => deleteRating(index)}
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
                        onClick={addRating}
                    >
                        Add
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Rating;
