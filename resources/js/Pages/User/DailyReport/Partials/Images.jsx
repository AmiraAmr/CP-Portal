import axios from "axios";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Images = ({ images, setImages }) => {
    const editImage = (event, id) => {
        const edit = images.map((item, index) => {
            if (index === id && event.target.name == "name") {
                item[event.target.name] = event.target.value;
            }
            if (index === id && event.target.name == "files") {
                item.files = [];
                [...Array(event.target.files.length).keys()].map((file) => {
                    console.log(event.target.files[file]);
                    item.files.push(event.target.files[file]);
                });
            }
            return item;
        });
        setImages(edit);
    };

    const addImage = () => {
        setImages((prev) => {
            return [
                ...prev,
                {
                    name: "",
                    files: [],
                },
            ];
        });
    };
    const deleteImage = (id) => {
        setImages((prev) => {
            return prev.filter((item, index) => index !== id);
        });
    };

    return (
        <div className="bg-white p-4 rounded-md space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-lg">Images</span>
            </div>
            <div className="flex flex-col gap-4">
                {images.map((images, index) => {
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
                            <div className="flex-grow">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Description
                                </label>
                                <input
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    type="text"
                                    name="name"
                                    placeholder="Description"
                                    value={images.name}
                                    onChange={(e) => editImage(e, index)}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Files
                                </label>
                                <input
                                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    type="file"
                                    name="files"
                                    multiple
                                    onChange={(e) => editImage(e, index)}
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
                                    onClick={() => deleteImage(index)}
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
                        onClick={addImage}
                    >
                        Add
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Images;
