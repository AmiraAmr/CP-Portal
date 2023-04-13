import React, { useEffect, useState, Fragment } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import {
    Alert,
    Button,
    Checkbox,
    DatePicker,
    Modal,
    Pagination,
    Space,
    Steps,
    Table,
    Tag,
    Upload,
} from "antd";
import { router, Link } from "@inertiajs/react";
import { showDeleteConfirm } from "@/Components/ModalDelete";
import axios from "axios";
import moment from "moment";
const { RangePicker } = DatePicker;
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

const Index = (props) => {
    const [salaries, setSalaries] = useState({
        date: "",
    });

    const { Dragger } = Upload;

    const [editData, setEditData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [filter, setFilter] = useState({
        from: "",
        to: "",
        project_id: "",
    });
    const [workingDay, setWorkingDay] = useState("");
    const [weekends, setWeekends] = useState("");

    const [fileList, setFileList] = useState({});
    const [uploading, setUploading] = useState(false);

    const [inputs, setInputs] = useState([
        {
            name: "Amount_from",
        },
        {
            name: "Amount_to",
        },
        {
            name: "Deduction_to",
        },
        {
            name: "Deduction_from",
        },
        {
            name: "working_hour_to",
        },
        {
            name: "working_hour_from",
        },
        {
            name: "salary_Hour_to",
        },
        {
            name: "salary_day_to",
        },
        {
            name: "salary_day_from",
        },
        {
            name: "salary_Hour_from",
        },
    ]);

    const [rows, setRows] = useState([]);

    const fetch = () => {
        axios.post("/managers/salaries/jsonSalaries").then((res) => {
            setData(res.data.data);
        });
    };
    const onChange = (date, dateString) => {
        console.log(dateString);
        setFilter((prev) => {
            return { ...prev, from: dateString[0], to: dateString[1] };
        });
    };

    const uploadSalaries = () => {
        let formData = new FormData();

        formData.append("date", salaries.date);
        formData.append("files", fileList);

        axios.post("/managers/salaries/upload", formData);
    };
    useEffect(() => {
        setWorkingDay(moment(filter.from, "YYYY-MM").daysInMonth());
    }, [filter]);

    useEffect(() => {
        fetch();
    }, [filter]);

    useEffect(() => {
        setRows([]);
        data.data?.forEach((data) => {
            setRows((prev) => {
                return [
                    ...prev,
                    {
                        key: data.id,
                        name: data.employee ? data.employee.name : "",

                        basic_salary: data.salary_per_month,
                        salary_day: data.salaryPerDay,
                        salary_hour: data.salaryperHour,
                        transportation_allowance: data.Transportation_Allowance,
                        communication_allowance: data.Communication_Allowance,
                        food_allowance: data.Food_Allowance,
                        other_allowance: data.Other_Allowance,
                        whoc: data.working_hours,
                        working_hour: data.time,
                        amount: data.Amount,
                        deduction: data.Deduction,
                        over_time: data.overtime,
                        user_aproved_by: data.user_aproved_by
                            ? data.user_aproved_by.name
                            : "",
                    },
                ];
            });
        });
    }, [data2]);
    return (
        <ManagementLayout auth={props.auth} errors={props.errors}>
            <div className="timesheet space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Salaries
                    </span>
                </div>
                <div className="bg-white p-4 rounded-md flex flex-col gap-3">
                    <span className="text-base text-gray-700 font-semibold">
                        Upload salaries
                    </span>
                    <div className="ml-3 flex flex-col gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                Date
                            </label>
                            <DatePicker
                                onChange={(date, dateString) =>
                                    setSalaries((prev) => {
                                        return { ...prev, date: dateString };
                                    })
                                }
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">
                                Upload File
                            </label>
                            <Dragger
                                onRemove={(file) => {
                                    const index = fileList.indexOf(file);
                                    const newFileList = fileList.slice();
                                    newFileList.splice(index, 1);
                                    setFileList(newFileList);
                                }}
                                beforeUpload={(file) => {
                                    setFileList(file);
                                    return false;
                                }}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Click or drag file to this area to upload
                                </p>
                            </Dragger>
                        </div>
                        <div>
                            <Button
                                type="primary"
                                loading={false}
                                onClick={() => uploadSalaries()}
                            >
                                Upload
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-md flex flex-col gap-3">
                    <span className="text-base text-gray-700 font-semibold">
                        Filter
                    </span>
                    <div className="grid xl:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-3">
                        {inputs.map((input) => {
                            return (
                                <div>
                                    <label
                                        htmlFor={input.name}
                                        className="block mb-2 text-sm font-medium text-gray-900 "
                                    >
                                        {input.name}
                                    </label>
                                    <input
                                        id={input.name}
                                        rows="4"
                                        value={filter[input.name]}
                                        name={input.name}
                                        onChange={(e) =>
                                            setFilter((prev) => {
                                                return {
                                                    ...prev,
                                                    [e.target.name]:
                                                        e.target.value,
                                                };
                                            })
                                        }
                                        className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:!outline-blue-500 focus:!ring-blue-500 focus:!border-blue-500 block w-full p-2.5 "
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <Table
                    columns={[
                        {
                            title: "Name",
                            dataIndex: "name",
                            key: "name",
                        },
                        {
                            title: "Basic Salary",
                            dataIndex: "salary_per_month",
                            key: "salary_per_month",
                        },
                        {
                            title: "Salary / Day",
                            dataIndex: "salary_per_Day",
                            key: "salary_per_Day",
                        },
                        {
                            title: "Salary / Hour",
                            dataIndex: "salary_hour",
                            key: "salary_hour",
                        },
                        {
                            title: "Transportation Allowance",
                            dataIndex: "transportation_allowance",
                            key: "transportation_allowance",
                        },
                        {
                            title: "Communication Allowance",
                            dataIndex: "communication_allowance",
                            key: "communication_allowance",
                        },
                        {
                            title: "Food Allowance",
                            dataIndex: "food_allowance",
                            key: "food_allowance",
                        },
                        {
                            title: "Other Allowance",
                            dataIndex: "other_allowance",
                            key: "other_allowance",
                        },
                        {
                            title: "Working Hour on ",
                            dataIndex: "whoc",
                            key: "whoc",
                        },
                        {
                            title: "Working Hour",
                            dataIndex: "working_hour",
                            key: "working_hour",
                        },
                        {
                            title: "Over Time",
                            dataIndex: "over_time",
                            key: "over_time",
                        },
                        {
                            title: "Deduction",
                            dataIndex: "deduction",
                            key: "deduction",
                        },
                        {
                            title: "Amount",
                            dataIndex: "amount",
                            key: "amount",
                        },
                        {
                            title: "Approved by",
                            dataIndex: "user_aproved_by",
                            key: "user_aproved_by",
                        },
                    ]}
                    dataSource={rows}
                    pagination={{ hideOnSinglePage: true }}
                    mobileBreakPoint={768}
                    className="border rounded overflow-x-auto scrollbar"
                />
            </div>
        </ManagementLayout>
    );
};

export default Index;
