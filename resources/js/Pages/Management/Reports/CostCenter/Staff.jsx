import { stateOfWorkFlow } from "@/Components/States";
import { Dropdown, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import moment from "moment";

const Staff = ({ data, date, netSalaries, budget_expenses }) => {
    const config = {
        data: [
            {
                name: "budget",
                expenses: budget_expenses?.budget,
            },
            {
                name: "expenses",
                expenses: netSalaries,
            },
        ],
        xField: "name",
        yField: "expenses",
        columnWidthRatio: 0.8,
        color: ({ name }) => {
            if (name == "expenses") {
                return "#22c55e";
            }
        },
    };

    const [customizing, setCustomizing] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        var newData = [];
        if (data) {
            data.forEach((e) => {
                if (e.user) {
                    var min = e.user.attending_and_leaving_sum_min / 60;
                    var time =
                        e.user.attending_and_leaving_sum_time_difference + min;
                    time = Math.round(time);
                    var salaryPerDay =
                        Number(e.salary_per_month) /
                        Number(
                            moment(
                                moment(date).format("YYYY-MM-DD"),
                                "YYYY-MM"
                            ).daysInMonth()
                        );
                    salaryPerDay = salaryPerDay.toFixed(2);

                    var salaryperHour = Number(salaryPerDay) / 9;
                    salaryperHour = salaryperHour.toFixed(2);
                    var overtime = Number(time) - Number(e.working_hours);
                    overtime = overtime.toFixed(2);
                    var Absence = 0;
                    if (e.Absence > 0) {
                        Absence =
                            Number(salaryperHour) *
                            Number(e.working_hours) *
                            Number(e.Absence);
                        Absence = Absence.toFixed(2);
                    }
                    var amount =
                        Number(overtime) * salaryperHour +
                        Number(time) * Number(salaryperHour) -
                        Absence;
                    amount = amount.toFixed(2);
                    newData.push({
                        time: time,
                        name: e.user.name,
                        id: e.id,
                        Deduction: Absence,
                        contract: e,
                        salaryperHour: salaryperHour,
                        salaryPerDay: salaryPerDay,
                        overtime: overtime,
                        amount: amount,
                    });
                }
            });
        }
        setCustomizing(newData);
    }, [data]);

    useEffect(() => {
        setRows([]);
        customizing.forEach((data) => {
            setRows((prev) => {
                return [
                    ...prev,
                    {
                        key: data.id,
                        name: data.name,
                        project: data.contract
                            ? data.contract.project?.name
                            : "unknown",
                        role: data.role ? data.role.name : "unknown",
                        basic_salary: data.contract
                            ? data.contract.salary_per_month
                            : null,
                        salary_day: data.salaryPerDay,
                        salary_hour: data.salaryperHour,
                        whoc: data.contract
                            ? data.contract.working_hours
                            : "Unknown",
                        attendance_days:
                            data.personal_overall_sum_num_of_attendance,
                        Other_Allowance: data?.contract?.Other_Allowance,
                        Food_Allowance: data?.contract?.Food_Allowance,
                        Communication_Allowance:
                            data?.contract?.Communication_Allowance,
                        Transportation_Allowance:
                            data?.contract?.Transportation_Allowance,
                        working_hour: data.time,
                        amount: data.amount,
                        deduction: data.Deduction,
                        over_time: data.overtime,
                        user_aproved_by: data.user_aproved_by
                            ? data.user_aproved_by.name
                            : "",
                        data: data,
                    },
                ];
            });
        });
    }, [customizing]);
    return (
        <div className="mb-3 space-y-3">
            <span className="block text-lg text-gray-700 font-semibold">
                Staff
            </span>
            <div className="xl:grid-cols-3 grid grid-cols-1 gap-4">
                <div className="bg-white rounded-md p-3  col-span-2">
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
                                dataIndex: "Transportation_Allowance",
                                key: "Transportation_Allowance",
                            },
                            {
                                title: "Communication Allowance",
                                dataIndex: "Communication_Allowance",
                                key: "Communication_Allowance",
                            },
                            {
                                title: "Food Allowance",
                                dataIndex: "Food_Allowance",
                                key: "Food_Allowance",
                            },
                            {
                                title: "Other Allowance",
                                dataIndex: "Other_Allowance",
                                key: "Other_Allowance",
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
                                title: "Action",
                                dataIndex: "action",
                                key: "action",
                                render: (_, record) => (
                                    <Space size="middle">
                                        <Dropdown.Button
                                            menu={{
                                                items: [
                                                    {
                                                        label: "Edit",
                                                        key: "2",
                                                        onClick: () =>
                                                            router.get(
                                                                `/managers/Laborer_edit/${record.key}`
                                                            ),
                                                    },
                                                    {
                                                        label: "Report",
                                                        key: "2",
                                                        onClick: () =>
                                                            router.get(
                                                                `/managers/performance/${record.key}`
                                                            ),
                                                    },
                                                    {
                                                        label: `Attendance : ${record.name}`,
                                                        key: "2",
                                                        onClick: () =>
                                                            setAttendance(
                                                                record.data
                                                            ),
                                                    },
                                                    {
                                                        label: `Attendance : ${record.name}`,
                                                        key: "2",
                                                        onClick: () =>
                                                            setAttendance(
                                                                record.data
                                                            ),
                                                    },
                                                ],
                                            }}
                                        ></Dropdown.Button>
                                    </Space>
                                ),
                            },
                        ]}
                        dataSource={rows}
                        pagination={false}
                        mobileBreakPoint={768}
                        className="border rounded overflow-x-auto scrollbar"
                    />
                </div>
                <Column
                    {...config}
                    className="bg-white rounded-md p-3  max-h-64"
                />
            </div>
            <div className="bg-white rounded-md p-3 py-2">
                <span className="block text-base text-gray-700 font-medium">
                    Total Amount With Vat : {netSalaries}
                </span>
            </div>
        </div>
    );
};

export default Staff;
