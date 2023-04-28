import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Avatar,
    Button,
    Checkbox,
    Comment,
    DatePicker,
    Space,
    Table,
    Tooltip,
    Upload,
} from "antd";
import { Link, router, useForm } from "@inertiajs/react";
import axios from "axios";
import { motion } from "framer-motion";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import InputHolder from "@/Components/InputHolder";

const containerStyle="bg-white p-6 rounded-3xl space-y-3"
const titleStyle = "font-bold capitalize text-lg mb-4"
const inputStyle = "border-none bg-transparent text-[#707070] text-base focus:ring-0 focus:border-none block w-full p-0"


const Edit = (props) => {
    const { Dragger } = Upload;
    const [fileList, setFileList] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        content: props.data.content,
        date: props.data.date,
        ref: props.data.ref,
        subject: props.data.subject,
        delivery_date: props.data.delivery_date,
    });
    const [files, setFiles] = useState(props.data.attachment);

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
    const submit = () => {
        const formData = new FormData();

        // Send Data
        formData.append("ref", data.ref);
        formData.append("date", data.date);
        formData.append("subject", data.subject);
        formData.append("delivery_date", data.delivery_date);
        formData.append("content", data.content);

        // Send Files
        formData.append("count", fileList.length);
        fileList.forEach((file, index) => {
            formData.append("files-" + index, file);
        });

        // Send Deleted Files
        var deletedfiles = [];
        files.forEach((e) => {
            if (e.deleted) {
                deletedfiles.push(e.id);
            }
        });
        formData.append("deletedfiles", deletedfiles);
        router.post(`/marketing/update/${props.data.id}`, formData);
    };

    const handleDeleteFiles = (id) => {
        const newFiles = files.map((file) => {
            if (file.id == id) {
                if (file.deleted) {
                    file.deleted = !file.deleted;
                } else {
                    file.deleted = true;
                }
            }
            return file;
        });
        setFiles(newFiles);
    };

    useEffect(() => {
        for (const property in props.errors) {
            message.warn({
                content: props.errors[property],
                style: {
                    textAlign: "right",
                },
            });
        }
    }, [errors, props.errors]);
    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold capitalize">
                        Edit marketing
                    </span>
                </div>
                <div className={containerStyle}>
                    <div className={titleStyle}>Date of contracting</div>
                    {/* <div className="bg-white rounded-md p-4 grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3"> */}
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-2">
                            <InputHolder
                                    label={"Ref"}
                                    htmlFor="ref"
                                    Input= {(
                                        <input
                                            type="text"
                                            className={inputStyle}
                                            value={data.ref}
                                            placeholder="ref"
                                            name="ref"
                                            id="ref"
                                            disabled
                                            required
                                        />
                                    )}
                                    disabled={true}
                                    Icon={(
                                        <svg id="document-text" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                            <path id="Vector" d="M16.5,6.6v4.125c0,4.125-1.65,5.775-5.775,5.775H5.775C1.65,16.5,0,14.85,0,10.725V5.775C0,1.65,1.65,0,5.775,0H9.9" transform="translate(1.75 1.75)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                            <path id="Vector-2" data-name="Vector" d="M7,7H3.5C.875,7,0,6.125,0,3.5V0Z" transform="translate(11.25 1.75)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                            <path id="Vector-3" data-name="Vector" d="M0,0H5.25" transform="translate(5.736 10.833)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                            <path id="Vector-4" data-name="Vector" d="M0,0H3.5" transform="translate(5.775 14.167)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                            <path id="Vector-5" data-name="Vector" d="M0,0H20V20H0Z" fill="none" opacity="0"/>
                                        </svg>
                                    )}
                                />
                        </div>
                        <div className="col-span-6">
                            <InputHolder
                                label={"Subject"}
                                htmlFor="Subject"
                                Input= {(
                                    <input
                                        type="text"
                                        className={inputStyle}
                                        placeholder="Subject"
                                        defaultValue={data.subject}
                                        onChange={(e) =>
                                            setData("subject", e.target.value)
                                        }
                                        required
                                    />
                                )}
                                Icon={(
                                    <svg id="document-text" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                        <path id="Vector" d="M16.5,6.6v4.125c0,4.125-1.65,5.775-5.775,5.775H5.775C1.65,16.5,0,14.85,0,10.725V5.775C0,1.65,1.65,0,5.775,0H9.9" transform="translate(1.75 1.75)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                        <path id="Vector-2" data-name="Vector" d="M7,7H3.5C.875,7,0,6.125,0,3.5V0Z" transform="translate(11.25 1.75)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                        <path id="Vector-3" data-name="Vector" d="M0,0H5.25" transform="translate(5.736 10.833)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                        <path id="Vector-4" data-name="Vector" d="M0,0H3.5" transform="translate(5.775 14.167)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                        <path id="Vector-5" data-name="Vector" d="M0,0H20V20H0Z" fill="none" opacity="0"/>
                                    </svg>
                                )}
                            />
                        </div>
                        <div className="col-span-4">
                            <InputHolder
                                label={"Date"}
                                htmlFor="date"
                                Input= {(
                                    <DatePicker
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderWidth: "0px",
                                        }}
                                        value={moment(data.date, "YYYY/MM/DD")}
                                        onChange={(date, dateString) =>
                                            setData("date", dateString)
                                        }
                                    />
                                )}
                                Icon={(
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                        <g id="vuesax_linear_calendar" data-name="vuesax/linear/calendar" transform="translate(-492 -188)">
                                            <g id="calendar" transform="translate(492 188)">
                                            <path id="Vector" d="M0,0V2.625" transform="translate(6.667 1.75)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                            <path id="Vector-2" data-name="Vector" d="M0,0V2.625" transform="translate(13.333 1.75)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                            <path id="Vector-3" data-name="Vector" d="M0,0H13.875" transform="translate(3.063 7.575)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                            <path id="Vector-4" data-name="Vector" d="M14.75,4.1v6.978c0,2.463-1.229,4.1-4.1,4.1H4.1c-2.868,0-4.1-1.642-4.1-4.1V4.1C0,1.642,1.229,0,4.1,0h6.556C13.521,0,14.75,1.642,14.75,4.1Z" transform="translate(2.625 3.063)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                            <path id="Vector-5" data-name="Vector" d="M0,0H20V20H0Z" fill="none" opacity="0"/>
                                            <path id="Vector-6" data-name="Vector" d="M.495.5H.5" transform="translate(12.584 10.917)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                            <path id="Vector-7" data-name="Vector" d="M.495.5H.5" transform="translate(12.584 13.417)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                            <path id="Vector-8" data-name="Vector" d="M.495.5H.5" transform="translate(9.502 10.917)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                            <path id="Vector-9" data-name="Vector" d="M.495.5H.5" transform="translate(9.502 13.417)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                            <path id="Vector-10" data-name="Vector" d="M.495.5H.5" transform="translate(6.417 10.917)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                            <path id="Vector-11" data-name="Vector" d="M.495.5H.5" transform="translate(6.417 13.417)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                            </g>
                                        </g>
                                    </svg>
                                )}
                            />
                        </div>
                        <div className="col-span-4">
                            <InputHolder
                                label={"Delivery Date"}
                                htmlFor="date"
                                Input= {(
                                    <DatePicker
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderWidth: "0px"
                                        }}
                                        value={moment(data.delivery_date, "YYYY/MM/DD")}
                                        onChange={(date, dateString) =>
                                            setData("delivery_date", dateString)
                                        }
                                    />
                                )}
                                Icon={(
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                        <g id="vuesax_linear_calendar" data-name="vuesax/linear/calendar" transform="translate(-492 -188)">
                                            <g id="calendar" transform="translate(492 188)">
                                            <path id="Vector" d="M0,0V2.625" transform="translate(6.667 1.75)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                            <path id="Vector-2" data-name="Vector" d="M0,0V2.625" transform="translate(13.333 1.75)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                            <path id="Vector-3" data-name="Vector" d="M0,0H13.875" transform="translate(3.063 7.575)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                            <path id="Vector-4" data-name="Vector" d="M14.75,4.1v6.978c0,2.463-1.229,4.1-4.1,4.1H4.1c-2.868,0-4.1-1.642-4.1-4.1V4.1C0,1.642,1.229,0,4.1,0h6.556C13.521,0,14.75,1.642,14.75,4.1Z" transform="translate(2.625 3.063)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                            <path id="Vector-5" data-name="Vector" d="M0,0H20V20H0Z" fill="none" opacity="0"/>
                                            <path id="Vector-6" data-name="Vector" d="M.495.5H.5" transform="translate(12.584 10.917)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                            <path id="Vector-7" data-name="Vector" d="M.495.5H.5" transform="translate(12.584 13.417)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                            <path id="Vector-8" data-name="Vector" d="M.495.5H.5" transform="translate(9.502 10.917)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                            <path id="Vector-9" data-name="Vector" d="M.495.5H.5" transform="translate(9.502 13.417)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                            <path id="Vector-10" data-name="Vector" d="M.495.5H.5" transform="translate(6.417 10.917)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                            <path id="Vector-11" data-name="Vector" d="M.495.5H.5" transform="translate(6.417 13.417)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                                            </g>
                                        </g>
                                    </svg>
                                )}
                            />
                        </div>

                        <div className="col-span-8">
                            <InputHolder
                                    customStyle={"border-dashed"}
                                    Input= {(
                                        <Dragger {...propsOfUploadFiles}>
                                            <p className="ant-upload-drag-icon flex items-center pt-3">
                                                <svg id="note" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                                    <path id="Vector" d="M0,0V2.5" transform="translate(6.667 1.667)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                                    <path id="Vector-2" data-name="Vector" d="M0,0V2.5" transform="translate(13.333 1.667)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                                    <path id="Vector-3" data-name="Vector" d="M0,0H6.667" transform="translate(5.833 10.833)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                                    <path id="Vector-4" data-name="Vector" d="M0,0H4.167" transform="translate(5.833 14.167)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                                    <path id="Vector-5" data-name="Vector" d="M10.833,0C13.608.15,15,1.208,15,5.125v5.15c0,3.433-.833,5.15-5,5.15H5c-4.167,0-5-1.717-5-5.15V5.125C0,1.208,1.392.158,4.167,0Z" transform="translate(2.5 2.917)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                                    <path id="Vector-6" data-name="Vector" d="M0,0H20V20H0Z" fill="none" opacity="0"/>
                                                </svg>

                                                <div className="flex justify-center w-4/5 text-lg text-[#707070] capitalize">update file</div>

                                            </p>
                                        </Dragger>
                                    )}
                                />
                        </div>

                        <div className="col-span-12">
                            <InputHolder
                                label={"Content"}
                                htmlFor="content"
                                customStyle={"!max-h-32 h-32"}
                                Input= {(
                                    <textarea
                                        id="message"
                                        rows="4"
                                        className={inputStyle}
                                        value={data.content}
                                        onChange={(e) => setData("content", e.target.value)}
                                    ></textarea>
                                )}
                                Icon={(
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                        <g id="vuesax_linear_document-text" data-name="vuesax/linear/document-text" transform="translate(-492 -252)">
                                            <g id="document-text" transform="translate(492 252)">
                                            <path id="Vector" d="M15,4.167V12.5c0,2.5-1.25,4.167-4.167,4.167H4.167C1.25,16.667,0,15,0,12.5V4.167C0,1.667,1.25,0,4.167,0h6.667C13.75,0,15,1.667,15,4.167Z" transform="translate(2.5 1.667)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                            <path id="Vector-2" data-name="Vector" d="M0,0V1.667A1.672,1.672,0,0,0,1.667,3.333H3.333" transform="translate(12.083 3.75)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                            <path id="Vector-3" data-name="Vector" d="M0,0H3.333" transform="translate(6.667 10.833)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                            <path id="Vector-4" data-name="Vector" d="M0,0H6.667" transform="translate(6.667 14.167)" fill="none" stroke="#5874b2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
                                            <path id="Vector-5" data-name="Vector" d="M0,0H20V20H0Z" fill="none" opacity="0"/>
                                            </g>
                                        </g>
                                    </svg>
                                )}
                            />
                        </div>

                    </div>
                </div>



                <div className={containerStyle}>
                    <label className={titleStyle}>
                        Attachments
                    </label>
                    <Table
                        dataSource={files}
                        columns={[
                            {
                                title: "File",
                                dataIndex: "path",
                                key: "path",
                            },
                            {
                                title: "Action",
                                key: "action",
                                render: (_, record) => (
                                    <DropdownButton buttonTitle={"Actions"}
                                        actions={[
                                            {
                                                label: "Preview"
                                            },
                                            {
                                                label: "Download",
                                                href: `/uploads/marketing/${props.data.ref}/${record.path}`,
                                                download: true
                                            },
                                            {
                                                label: record.deleted ? "Restore" : "Delete",
                                                action: () => handleDeleteFiles(record.id)
                                            }
                                        ]}
                                    />
                                ),
                            },
                        ]}
                        pagination={{ hideOnSinglePage: true }}
                    />
                </div>

                <div className={containerStyle}>
                    <label className={titleStyle}>
                        Attachments
                    </label>
                    <Table
                        dataSource={
                            props.data.tender_comment?.attachment
                        }
                        columns={[
                            {
                                title: "File",
                                dataIndex: "path",
                                key: "path",
                            },
                            {
                                title: "Action",
                                key: "action",
                                render: (_, record) => (
                                    <DropdownButton buttonTitle={"Actions"}
                                        actions={[
                                            {
                                                label: "Preview"
                                            },
                                            {
                                                label: "Download",
                                                href: `/uploads/marketing/${props.data.ref}/${record.path}`,
                                                download: true
                                            }
                                        ]}
                                    />
                                ),
                            },
                        ]}
                        pagination={{ hideOnSinglePage: true }}
                    />
                </div>
                <div className={containerStyle}>
                    <div >
                        <label className={titleStyle}>
                            Comments:
                        </label>
                        <Comment
                            content={
                                <p>{props.data.tender_comment?.content}</p>
                            }
                            datetime={
                                <Tooltip
                                    title={moment(
                                        props.data.tender_comment
                                            ?.created_at
                                    ).format("lll")}
                                >
                                    <span>
                                        {moment(
                                            props.data.tender_comment
                                                ?.created_at,
                                            "YYYYMMDD"
                                        ).fromNow()}
                                    </span>
                                </Tooltip>
                            }
                        />
                    </div>
                    <span className="block border"></span>

                </div>
                <div className="flex items-center gap-2">
                    <Button type="primary" onClick={() => submit()}
                        className="!bg-[#5874B2] !text-white !py-2 !px-5 !rounded-lg !text-base !h-auto">
                        Edit
                    </Button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
