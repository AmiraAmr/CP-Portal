import React, { useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import {
    Avatar,
    Breadcrumb,
    ConfigProvider,
    Descriptions,
    List,
    Statistic,
    Table,
    Tag,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Line } from "@ant-design/plots";
import moment from "moment";
import arEG from "antd/es/locale/ar_EG";

const Profile = ({ data, auth, errors }) => {
    const [output, setOutput] = useState(0);
    const [growthRate, setGrowthRate] = useState([]);
    const [scaling, setScaling] = useState([]);
    const [series, setSeries] = useState([]);
    const [xField, setXField] = useState([]);
    const [dataForLine, setDataForLine] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [rows, setRows] = useState([]);

    const config = {
        data: dataForLine,
        xField: "date",
        yField: "percentage",
        smooth: true,
    };

    useEffect(() => {
        let scaling = [];
        let series = [];
        series.push({ name: "project", data: [] });
        var actual = 0;
        var overall = 0;

        data.personal_overall.forEach((e) => {
            var percentage_attendance = Number(e.percentage_attendance) * 0.25;
            var percentage_performance =
                Number(e.percentage_performance) * 0.25;
            var sum = Number(e.cash_in) - Number(e.cash_out);
            sum = (Number(sum) * 100) / e.cash_in;
            var comparison = 0;
            if (sum <= 20 && sum > 0) {
                comparison = sum * 2.5;
            }
            if (sum > 20) {
                comparison = 50;
            }
            if (sum <= 0) {
                comparison = 0;
            }
            var total =
                Number(percentage_performance) +
                Number(percentage_attendance) +
                Number(comparison);
            total = total.toFixed(2);
            actual = Number(total) + Number(actual);
            series[0].data.push(total);

            setXField((prev) => {
                return [...prev, moment(e.date).format("MMMM  yyyy")];
            });
            overall = series[0].data.length * 100;

            setOutput(((actual / overall) * 100).toFixed(2));
            var exponent = 1 / series[0].data.length;

            var st =
                Number(series[0].data[series[0].data.length - 1]) /
                Number(series[0].data[0] > 0 ? series[0].data[0] : 0.01);

            setGrowthRate(((Math.pow(st, exponent) - 1) * 100).toFixed(2));
        });
        setSeries(series);
        setScaling(scaling);
    }, [data]);

    useEffect(() => {
        setDataForLine([]);
        const xF = xField.map((x) => {
            return { date: x };
        });
        const values = series[0]?.data.map((item, index) => {
            return { date: xF[index].date, percentage: item };
        });
        if (values !== undefined) {
            setDataForLine(values);
        }
    }, [xField, series]);

    useEffect(() => {
        setTasks([]);
        data.task.map((task) => {
            setTasks((prev) => {
                return [
                    ...prev,
                    {
                        title: task.name,
                        date: task.start_at,
                        status: task.status,
                    },
                ];
            });
        });
    }, [data]);

    useEffect(() => {
        setRows([]);
        data?.user_daily_report.map((item) => {
            setRows((prev) => {
                return [
                    ...prev,
                    {
                        report: item.ref,
                        performance: item.pivot.performance,
                        commitment: item.pivot.commitment,
                    },
                ];
            });
            return item;
        });
    }, [data]);
    return (
        <ManagementLayout auth={auth} errors={errors}>
            <div className="space-y-3">
                <div>
                    <span className="text-lg text-gray-900 font-bold">
                        Profile
                    </span>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <a href="" className="font-medium !text-gray-400">
                                Home
                            </a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <a href="" className="font-medium !text-gray-400">
                                HR
                            </a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item className="font-semibold ">
                            Profile
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="bg-white rounded-md px-6 py-6">
                    <div className="flex lg:flex-row flex-col gap-4">
                        <div>
                            <Avatar
                                shape="square"
                                size={160}
                                icon={<UserOutlined />}
                            />
                        </div>
                        <div className="flex-grow space-y-3">
                            <div className="flex flex-col gap-2">
                                <div>
                                    <span className="text-xl text-gray-900 font-bold">
                                        {data.name}
                                    </span>
                                </div>
                                <div className="flex flex-wrap font-semibold gap-3 ">
                                    <a
                                        href="#"
                                        className="flex items-center text-gray-400 space-x-1"
                                    >
                                        <span>
                                            <svg
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    opacity="0.3"
                                                    d="M16.5 9C16.5 13.125 13.125 16.5 9 16.5C4.875 16.5 1.5 13.125 1.5 9C1.5 4.875 4.875 1.5 9 1.5C13.125 1.5 16.5 4.875 16.5 9Z"
                                                    fill="currentColor"
                                                ></path>
                                                <path
                                                    d="M9 16.5C10.95 16.5 12.75 15.75 14.025 14.55C13.425 12.675 11.4 11.25 9 11.25C6.6 11.25 4.57499 12.675 3.97499 14.55C5.24999 15.75 7.05 16.5 9 16.5Z"
                                                    fill="currentColor"
                                                ></path>
                                                <rect
                                                    x="7"
                                                    y="6"
                                                    width="4"
                                                    height="4"
                                                    rx="2"
                                                    fill="currentColor"
                                                ></rect>
                                            </svg>
                                        </span>
                                        <span>
                                            {data.role
                                                ? data.role.name
                                                : "Role unknown"}
                                        </span>
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center text-gray-400 space-x-1"
                                    >
                                        <span>
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    opacity="0.3"
                                                    d="M18.0624 15.3453L13.1624 20.7453C12.5624 21.4453 11.5624 21.4453 10.9624 20.7453L6.06242 15.3453C4.56242 13.6453 3.76242 11.4453 4.06242 8.94534C4.56242 5.34534 7.46242 2.44534 11.0624 2.04534C15.8624 1.54534 19.9624 5.24534 19.9624 9.94534C20.0624 12.0453 19.2624 13.9453 18.0624 15.3453Z"
                                                    fill="currentColor"
                                                ></path>
                                                <path
                                                    d="M12.0624 13.0453C13.7193 13.0453 15.0624 11.7022 15.0624 10.0453C15.0624 8.38849 13.7193 7.04535 12.0624 7.04535C10.4056 7.04535 9.06241 8.38849 9.06241 10.0453C9.06241 11.7022 10.4056 13.0453 12.0624 13.0453Z"
                                                    fill="currentColor"
                                                ></path>
                                            </svg>
                                        </span>
                                        <span>
                                            {data.contract
                                                ? data.contract.country
                                                : "unknown"}
                                        </span>
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center text-gray-400 space-x-1"
                                    >
                                        <span>
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    opacity="0.3"
                                                    d="M21 19H3C2.4 19 2 18.6 2 18V6C2 5.4 2.4 5 3 5H21C21.6 5 22 5.4 22 6V18C22 18.6 21.6 19 21 19Z"
                                                    fill="currentColor"
                                                ></path>
                                                <path
                                                    d="M21 5H2.99999C2.69999 5 2.49999 5.10005 2.29999 5.30005L11.2 13.3C11.7 13.7 12.4 13.7 12.8 13.3L21.7 5.30005C21.5 5.10005 21.3 5 21 5Z"
                                                    fill="currentColor"
                                                ></path>
                                            </svg>
                                        </span>
                                        <span>{data.email}</span>
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center text-gray-400 space-x-1"
                                    >
                                        <span>
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M20 14H18V10H20C20.6 10 21 10.4 21 11V13C21 13.6 20.6 14 20 14ZM21 19V17C21 16.4 20.6 16 20 16H18V20H20C20.6 20 21 19.6 21 19ZM21 7V5C21 4.4 20.6 4 20 4H18V8H20C20.6 8 21 7.6 21 7Z"
                                                    fill="currentColor"
                                                ></path>
                                                <path
                                                    opacity="0.3"
                                                    d="M17 22H3C2.4 22 2 21.6 2 21V3C2 2.4 2.4 2 3 2H17C17.6 2 18 2.4 18 3V21C18 21.6 17.6 22 17 22ZM10 7C8.9 7 8 7.9 8 9C8 10.1 8.9 11 10 11C11.1 11 12 10.1 12 9C12 7.9 11.1 7 10 7ZM13.3 16C14 16 14.5 15.3 14.3 14.7C13.7 13.2 12 12 10.1 12C8.10001 12 6.49999 13.1 5.89999 14.7C5.59999 15.3 6.19999 16 7.39999 16H13.3Z"
                                                    fill="currentColor"
                                                ></path>
                                            </svg>
                                        </span>
                                        <span>
                                            {data.contract
                                                ? data.contract.phone
                                                : " "}
                                        </span>
                                    </a>
                                </div>
                            </div>
                            <div className="flex sm:flex-row flex-col items-center gap-3">
                                <div className="sm:max-w-[160px] w-full p-2 border border-dashed rounded-md">
                                    <span className="text-lg block text-gray-900 font-semibold">
                                        {
                                            data.attending_and_leaving_sum_time_difference
                                        }
                                    </span>
                                    <span className="text-gray-500 font-medium">
                                        working hour(s)
                                    </span>
                                </div>
                                <div className="sm:max-w-[160px] w-full p-2 border border-dashed rounded-md">
                                    <span className="text-lg block text-gray-900 font-semibold">
                                        {data.Absence}
                                    </span>
                                    <span className="text-gray-500 font-medium">
                                        Absence
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-md px-6 py-6 space-y-3">
                    <div class="cursor-pointer border-b pb-2">
                        <div>
                            <span class="font-semibold text-gray-900 text-xl">
                                Profile Details
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div class="grid grid-cols-12">
                            <label class="lg:col-span-4 font-semibold text-gray-500">
                                Full Name
                            </label>
                            <div class="lg:col-span-8">
                                <span class="font-bold fs-6 text-gray-900">
                                    {data.name}
                                </span>
                            </div>
                        </div>
                        <div class="grid grid-cols-12">
                            <label class="lg:col-span-4 font-semibold text-gray-500">
                                Role
                            </label>
                            <div class="lg:col-span-8">
                                <span class="font-bold fs-6 text-gray-900">
                                    {data.role ? data.role.name : ""}
                                </span>
                            </div>
                        </div>
                        <div class="grid grid-cols-12">
                            <label class="lg:col-span-4 font-semibold text-gray-500">
                                Address
                            </label>
                            <div class="lg:col-span-8">
                                <span class="font-bold fs-6 text-gray-900">
                                    {data.contract
                                        ? data.contract.country
                                        : " "}
                                </span>
                            </div>
                        </div>
                        <div class="grid grid-cols-12">
                            <label class="lg:col-span-4 font-semibold text-gray-500">
                                Phone
                            </label>
                            <div class="lg:col-span-8">
                                <span class="font-bold fs-6 text-gray-900">
                                    {data.contract ? data.contract.phone : " "}
                                </span>
                            </div>
                        </div>
                        <div class="grid grid-cols-12">
                            <label class="lg:col-span-4 font-semibold text-gray-500">
                                Contract Expiry Date
                            </label>
                            <div class="lg:col-span-8">
                                <span class="font-bold fs-6 text-gray-900">
                                    {data.contract
                                        ? data.contract.contract_ex
                                        : " "}
                                </span>
                            </div>
                        </div>
                        <div class="grid grid-cols-12">
                            <label class="lg:col-span-4 font-semibold text-gray-500">
                                Salary per month
                            </label>
                            <div class="lg:col-span-8">
                                <span class="font-bold fs-6 text-gray-900">
                                    {data.contract
                                        ? data.contract.salary_per_month
                                        : " "}
                                </span>
                            </div>
                        </div>
                        <div class="grid grid-cols-12">
                            <label class="lg:col-span-4 font-semibold text-gray-500">
                                Transportation Allowance
                            </label>
                            <div class="lg:col-span-8">
                                <span class="font-bold fs-6 text-gray-900">
                                    {data.contract
                                        ? data.contract.Transportation_Allowance
                                        : " "}
                                </span>
                            </div>
                        </div>
                        <div class="grid grid-cols-12">
                            <label class="lg:col-span-4 font-semibold text-gray-500">
                                Communication Allowance
                            </label>
                            <div class="lg:col-span-8">
                                <span class="font-bold fs-6 text-gray-900">
                                    {data.contract
                                        ? data.contract.Communication_Allowance
                                        : " "}
                                </span>
                            </div>
                        </div>
                        <div class="grid grid-cols-12">
                            <label class="lg:col-span-4 font-semibold text-gray-500">
                                Food Allowance
                            </label>
                            <div class="lg:col-span-8">
                                <span class="font-bold fs-6 text-gray-900">
                                    {data.contract
                                        ? data.contract.Food_Allowance
                                        : " "}
                                </span>
                            </div>
                        </div>
                        <div class="grid grid-cols-12">
                            <label class="lg:col-span-4 font-semibold text-gray-500">
                                Other Allowance
                            </label>
                            <div class="lg:col-span-8">
                                <span class="font-bold fs-6 text-gray-900">
                                    {data.contract
                                        ? data.contract.Other_Allowance
                                        : " "}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="bg-white p-4 rounded-md flex flex-col gap-3">
                        <Descriptions
                            bordered
                            column={{
                                xxl: 2,
                                xl: 3,
                                lg: 3,
                                md: 3,
                                sm: 2,
                                xs: 1,
                            }}
                        >
                            <Descriptions.Item label="KPI">
                                <span
                                    className={`${
                                        output >= 50
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {output} %
                                </span>
                            </Descriptions.Item>
                            <Descriptions.Item label="Growth rate">
                                <span
                                    className={`${
                                        growthRate >= 0.5
                                            ? "text-green-500"
                                            : "text-red-500"
                                    }`}
                                >
                                    {growthRate} %
                                </span>
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                    <div className="bg-white p-4 rounded-md flex flex-col gap-3">
                        <ConfigProvider locale={arEG}>
                            <Line {...config} />
                        </ConfigProvider>
                    </div>
                </div>
                <div className="bg-white rounded-md px-6 py-6 ">
                    <div className="border-b pb-2">
                        <span class="font-semibold text-gray-900 text-xl ">
                            Tasks
                        </span>
                    </div>
                    <List
                        itemLayout="horizontal"
                        dataSource={tasks}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={
                                        <a href="https://ant.design">
                                            {item.title}
                                        </a>
                                    }
                                    description={item.date}
                                />
                                <div>
                                    {item.status == 0 ? (
                                        <Tag
                                            style={{
                                                borderRadius: "999px",
                                                cursor: "pointer",
                                            }}
                                            color="blue"
                                        >
                                            Pending
                                        </Tag>
                                    ) : null}
                                    {item.status == 1 ? (
                                        <Tag
                                            style={{
                                                borderRadius: "999px",
                                                cursor: "pointer",
                                            }}
                                            color="success"
                                        >
                                            Processing
                                        </Tag>
                                    ) : null}
                                    {item.status == 2 ? (
                                        <Tag
                                            style={{
                                                borderRadius: "999px",
                                                cursor: "pointer",
                                            }}
                                            color="red"
                                        >
                                            Rejected
                                        </Tag>
                                    ) : null}
                                    {item.status == 3 ? (
                                        <Tag
                                            style={{
                                                borderRadius: "999px",
                                                cursor: "pointer",
                                            }}
                                            color="success"
                                        >
                                            Closed
                                        </Tag>
                                    ) : null}
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
                <div>
                    <Table
                        columns={[
                            {
                                title: "Report",
                                dataIndex: "report",
                                key: "report",
                            },
                            {
                                title: "Performance",
                                dataIndex: "performance",
                                key: "performance",
                                responsive: ["sm"],
                            },
                            {
                                title: "Commitment",
                                dataIndex: "commitment",
                                key: "commitment",
                                responsive: ["md"],
                            },
                        ]}
                        dataSource={rows}
                    />
                </div>
                <div className="bg-white p-4 rounded-md">
                    <label className="block mb-2 text-base font-medium text-gray-900 ">
                        Attachments:
                    </label>
                    <Table
                        dataSource={data.user_file}
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
                                    <Space size="middle">
                                        <button>Preview </button>
                                        <a
                                            href={`/uploads/user_file/${record.path}`}
                                            download
                                        >
                                            Download
                                        </a>
                                    </Space>
                                ),
                            },
                        ]}
                        pagination={{ hideOnSinglePage: true }}
                    />
                </div>
            </div>
        </ManagementLayout>
    );
};

export default Profile;
