import React, { useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import {
    Alert,
    Button,
    DatePicker,
    Dropdown,
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
import { stateOfWorkFlow } from "@/Components/States";
import { SyncOutlined, CheckCircleOutlined } from "@ant-design/icons";
import Filter from "./Partials/Filter";

const Index = (props) => {
    const [openWorkflow, setOpenWorkflow] = useState(false);

    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [weekends, setWeekends] = useState("");
    const [rows, setRows] = useState([]);

    const [attendance, setAttendance] = useState([]);

    const [filter, setFilter] = useState({
        ref: "",
        project_id: "",
        page: 1,
        from: moment().startOf("month").format("YYYY-MM-DD"),
        to: moment().endOf("month").format("YYYY-MM-DD"),
        size: 10,
        delivery_date: "",
        supplier_id: "",
        user_id: "",
    });

    const [workingDay, setWorkingDay] = useState(
        moment.duration(moment(filter.to).diff(moment(filter.from)))
    );

    const today = moment().format("DD/MM/YYYY");

    const onChange = (e) => {
        setFilter((prev) => {
            return { ...prev, page: e };
        });
    };

    const fetch = () => {
        let formData = new FormData();

        formData.append("project_id", filter.project_id);

        formData.append("to", filter.to);

        formData.append("from", filter.from);

        formData.append("name", filter.ref);

        formData.append("user_id", filter.user_id);

        formData.append("size", filter.size);

        axios
            .post(`/managers/jsonlaborer?page=${filter.page}`, formData)
            .then((res) => {
                setData2(res.data.data);
                setWeekends(res.data.weekends);
            });
    };

    useEffect(() => {
        fetch();
    }, [filter]);

    useEffect(() => {
        setRows([]);
        data.forEach((data) => {
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
                        salary_per_month: data.contract
                            ? data.contract.salary_per_month
                            : null,
                        salary_per_Day: data.salaryPerDay,
                        salary_hour: data.salaryperHour,
                        whoc: data.contract
                            ? data.contract.working_hours
                            : "Unknown",
                        attendance_days:
                            data.personal_overall_sum_num_of_attendance,
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
    }, [data]);

    useEffect(() => {
        const newData2 = [];
        if (data2.data?.length > 0) {
            data2.data.forEach((e) => {
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
                    newData2.push({
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
                    });
                }
            });
            console.log(newData2);
            setData(newData2);
        }
    }, [data2, weekends]);

    return (
        <ManagementLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-3 timesheet">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Laborers
                    </span>
                </div>

                {route().params.message ? (
                    <Alert
                        message={route().params.message}
                        type="success"
                        showIcon
                        closable
                    />
                ) : (
                    ""
                )}
                <div className="mb-3 bg-white px-6 py-3 rounded-md">
                    <Filter
                        filter={filter}
                        setFilter={setFilter}
                        projects={props.projects}
                    />
                </div>
                <div className="mb-3 bg-white px-6 py-3 rounded-md flex items-center gap-3">
                    <Button onClick={() => setOpenWorkflow(!openWorkflow)}>
                        Setting
                    </Button>
                    <Button>Export</Button>
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
                            title: "Days of attendance",
                            dataIndex: "attendance_days",
                            key: "attendance_days",
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
                    pagination={{ hideOnSinglePage: true }}
                    mobileBreakPoint={768}
                    className="border rounded overflow-x-auto scrollbar"
                />
            </div>
        </ManagementLayout>
    );
};

export default Index;
