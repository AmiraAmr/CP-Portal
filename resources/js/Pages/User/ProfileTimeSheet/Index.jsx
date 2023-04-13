import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    Alert,
    Button,
    DatePicker,
    Modal,
    Pagination,
    Space,
    Steps,
    Table,
    Tag,
} from "antd";
import { router, Link } from "@inertiajs/react";
import { showDeleteConfirm } from "@/Components/ModalDelete";
import axios from "axios";
import moment from "moment";
const { RangePicker } = DatePicker;

const Index = (props) => {
    const [editData, setEditData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({
        from: moment().startOf("month").format("YYYY-MM-DD"),
        to: moment().endOf("month").format("YYYY-MM-DD"),
        project_id: "",
    });
    const [WorkingDay, setWorkingDay] = useState("");

    const [rows, setRows] = useState([]);

    const fetch = () => {
        axios
            .post("/profile/jsontimesheet", {
                from: filter.from,
                to: filter.to,
                project_id: filter.project_id,
            })
            .then((res) => {
                setData(res.data?.data);
            });
    };
    const onChange = (date, dateString) => {
        console.log(dateString);
        setFilter((prev) => {
            return { ...prev, from: dateString[0], to: dateString[1] };
        });
    };
    useEffect(() => {
        setWorkingDay(moment(filter.from, "YYYY-MM").daysInMonth());
    }, [filter]);
    useEffect(() => {
        fetch();
    }, [filter]);

    useEffect(() => {
        if (data.contract) {
            var min = data.attending_and_leaving_sum_min / 60;
            var time = data.attending_and_leaving_sum_time_difference + min;
            time = Math.round(time);
            var salaryPerDay =
                Number(data.contract.salary_per_month) / Number(WorkingDay);
            salaryPerDay = salaryPerDay.toFixed(2);

            var salaryperHour = Number(salaryPerDay) / 9;
            salaryperHour = salaryperHour.toFixed(2);
            var overtime = Number(time) - Number(data.contract.working_hours);
            overtime = overtime.toFixed(2);
            var Absence = 0;
            if (data.Absence > 0) {
                Absence =
                    Number(salaryperHour) *
                    Number(data.contract.working_hours) *
                    Number(data.Absence);
                Absence = Absence.toFixed(2);
            }
            var amount =
                Number(overtime) * salaryperHour +
                Number(time) * Number(salaryperHour) -
                Absence;
            amount = amount.toFixed(2);
            setData({
                role: data.role,
                time: time,
                name: data.name,
                id: data.id,
                Deduction: Absence,
                contract: data.contract,
                salaryperHour: salaryperHour,
                salaryPerDay: salaryPerDay,
                overtime: overtime,
                amount: amount,
            });
        }
        setRows([]);
        setRows((prev) => {
            return [
                ...prev,
                {
                    key: data?.id,
                    name: data?.name,
                    project: data?.contract
                        ? data?.contract.project.name
                        : "unknown",
                    role: data?.role ? data?.role.name : "unknown",
                    basic_salary: data?.contract
                        ? data?.contract.salary_per_month
                        : "unknown",
                    salary_day: data?.contract ? data?.salaryPerDay : "unknown",
                    salary_hour: data?.contract
                        ? data?.salaryperHour
                        : "unknown",
                    transportation_allowance: data?.contract
                        ? data?.contract.Transportation_Allowance
                        : "unknown",
                    communication_allowance: data?.contract
                        ? data?.contract.Communication_Allowance
                        : "unknown",
                    food_allowance: data?.contract
                        ? data?.contract.Food_Allowance
                        : "unknown",
                    other_allowance: data?.contract
                        ? data?.contract.Other_Allowance
                        : "unknown",
                    whoc: data?.contract
                        ? data?.contract?.working_hours
                        : "unknown",
                    working_hour: data?.time,

                    amount: data?.amount,
                    deduction: data?.Deduction > 0 ? data?.Deduction : 0,
                    over_time:
                        data?.contract &&
                        data?.time >= data?.contract.working_hours
                            ? data?.overtime
                            : 0,
                },
            ];
        });
    }, [data]);

    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Timesheet User
                    </span>
                </div>
                <div className="flex items-center flex-wrap gap-4 bg-white p-4 rounded-md">
                    <RangePicker onChange={onChange} />
                </div>
                <Table
                    columns={[
                        {
                            title: "Name",
                            dataIndex: "name",
                            key: "name",
                        },
                        {
                            title: "Project",
                            dataIndex: "project",
                            key: "project",
                        },
                        {
                            title: "Role",
                            dataIndex: "role",
                            key: "role",
                        },
                        {
                            title: "Basic Salary",
                            dataIndex: "basic_salary",
                            key: "basic_salary",
                        },
                        {
                            title: "Salary / Day",
                            dataIndex: "salary_day",
                            key: "salary_day",
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
                            title: "Working Hour on contract",
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
                    ]}
                    dataSource={rows}
                    pagination={{ hideOnSinglePage: true }}
                    mobileBreakPoint={768}
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
