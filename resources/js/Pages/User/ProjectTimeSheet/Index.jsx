import React, { useEffect, useState, Fragment } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
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
    const [data2, setData2] = useState([]);
    const [filter, setFilter] = useState({
        from: moment().startOf("month").format("YYYY-MM-DD"),
        to: moment().endOf("month").format("YYYY-MM-DD"),
        project_id: "",
    });
    const [workingDay, setWorkingDay] = useState("");
    const [weekends, setWeekends] = useState("");

    const [rows, setRows] = useState([]);

    const fetch = () => {
        axios
            .post("/project_manager/timesheet/jsontimesheet", {
                from: filter.from,
                to: filter.to,
                project_id: filter.project_id,
            })
            .then((res) => {
                setData(res.data.data);
                setWeekends(res.data.weekends);
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
        if (data.data?.length > 0) {
            setData2([]);
            data.data.forEach((e) => {
                if (e.contract) {
                    var time = e.timesheet_project_personal_sum_time
                        ? e.timesheet_project_personal_sum_time / 60
                        : e.personal_overall_sum_time / 60;

                    time = time.toFixed(2);
                    var days = Number(workingDay) - Number(weekends);
                    var salaryPerDay =
                        Number(e.contract.salary_per_month) / days;
                    salaryPerDay = salaryPerDay.toFixed(2);

                    var salaryperHour = Number(salaryPerDay) / 9;
                    salaryperHour = salaryperHour.toFixed(2);
                    var overtime = 0;
                    if (e.overtimecheck == false) {
                        overtime =
                            Number(time) -
                                Number(
                                    e.personal_overall_sum_num_of_attendance
                                ) *
                                    9 >
                            0
                                ? Number(time) -
                                  Number(
                                      e.personal_overall_sum_num_of_attendance
                                  ) *
                                      9
                                : 0;
                    }
                    overtime = overtime.toFixed(2);
                    var Absence = 0;
                    if (e.Absence > 0) {
                        Absence =
                            Number(salaryperHour) *
                            Number(9) *
                            Number(e.Absence);
                        Absence = Absence.toFixed(2);
                    }
                    var defaultt =
                        Number(time) -
                            Number(e.personal_overall_sum_num_of_attendance) *
                                9 >
                        0
                            ? Number(time) -
                              Number(e.personal_overall_sum_num_of_attendance) *
                                  9
                            : 0;

                    var overall =
                        Number(time) - Number(defaultt) > 0
                            ? Number(time) - Number(defaultt)
                            : 0;
                    var amount =
                        Number(overtime) * salaryperHour +
                        overall * Number(salaryperHour) -
                        Absence;
                    amount = amount.toFixed(2);
                    setData2((prev) => {
                        return [
                            ...prev,
                            {
                                time: time ?? 0,
                                overtimecheck: true,
                                personal_overall_sum_num_of_attendance:
                                    e.personal_overall_sum_num_of_attendance,
                                name: e.name,
                                role: e.role,
                                id: e.id,
                                Deduction: Absence,
                                contract: e.contract,
                                salaryperHour: salaryperHour,
                                salaryPerDay: salaryPerDay,
                                overtime: overtime ?? 0,
                                amount: amount ?? 0,
                            },
                        ];
                    });
                }
            });
        }
    }, [data]);
    useEffect(() => {
        setRows([]);
        data2.forEach((data) => {
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
                        salary_day: data?.contract
                            ? data?.salaryPerDay
                            : "unknown",
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
                        check_box: data?.overtimecheck,
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
        });
    }, [data2]);
    return (
        <AuthenticatedLayout auth={props.auth} errors={props.errors}>
            <div className="timesheet space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Timesheet User
                    </span>
                </div>
                <div className="bg-white p-4 rounded-md flex flex-col gap-3">
                    <span className="text-base text-gray-700 font-semibold">
                        Filter
                    </span>
                    <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Projects
                            </label>
                            <select
                                id="project_id"
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
                                {props.projects.map((project) => {
                                    return (
                                        <Fragment key={project.id}>
                                            <option value={project.id}>
                                                {project.name}
                                            </option>
                                        </Fragment>
                                    );
                                })}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="user"
                                className="block mb-2 text-sm font-medium text-gray-900 "
                            >
                                User
                            </label>
                            <input
                                id="user"
                                rows="4"
                                value={filter.name}
                                name="name"
                                onChange={(e) =>
                                    setFilter((prev) => {
                                        return {
                                            ...prev,
                                            name: e.target.value,
                                        };
                                    })
                                }
                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:!outline-blue-500 focus:!ring-blue-500 focus:!border-blue-500 block w-full p-2.5 "
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">
                                Date
                            </label>
                            <RangePicker
                                className="!p-[9px] !rounded-lg w-full"
                                placeholder={["From", "To"]}
                                onChange={(date, dateString) => {
                                    setFilter((prev) => {
                                        return {
                                            ...prev,
                                            from: dateString[0],
                                            to: dateString[1],
                                        };
                                    });
                                }}
                            />
                        </div>
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
                            title: "Check Box Over Time",
                            dataIndex: "check_box",
                            key: "check_box",
                            render: (_, record) => (
                                <Checkbox defaultChecked={record.check_box}></Checkbox>
                            ),
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
                    className="border rounded overflow-x-auto scrollbar"
                />
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
