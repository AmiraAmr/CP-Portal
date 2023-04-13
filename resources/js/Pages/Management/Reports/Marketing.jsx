import React, { Fragment, useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import moment from "moment";
import { Line } from "@ant-design/plots";
import { Descriptions } from "antd";

const Marketing = (props) => {
    const [output, setOutput] = useState(0);
    const [growthRate, setGrowthRate] = useState([]);
    const [scaling, setScaling] = useState([]);
    const [data, setData] = useState([]);
    const [series, setSeries] = useState([]);
    const [xField, setXField] = useState([]);
    const [dataForLine, setDataForLine] = useState([]);
    const fetch = () => {
        axios.post(`/managers/report/department/marketing/json`).then((res) => {
            setData(res.data.data.monthly_section);
        });
    };

    const config = {
        data: dataForLine,
        padding: "auto",
        xField: "date",
        yField: "percentage",
        smooth: true,
    };

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        let scaling = [];
        let series = [];
        series.push({ name: "project", data: [] });
        var actual = 0;
        var overall = 0;

        data.forEach((e) => {
            var percentage_attendance = Number(e.percentage_attendance) * 0;

            var percentage_performance = Number(e.percentage_performance) * 0;

            var percentage_marketing_project =
                Number(e.percentage_marketing_project) * 0.6;
            var percentage_deal = Number(e.percentage_deal) * 0.4;

            var total =
                Number(percentage_performance) +
                Number(percentage_attendance) +
                Number(percentage_marketing_project) +
                Number(percentage_deal);

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
                series[0].data[0] / series[0].data[series[0].data.length - 1];

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

    return (
        <ManagementLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Marketing
                    </span>
                </div>
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
                    <Line {...config} />
                </div>
            </div>
        </ManagementLayout>
    );
};

export default Marketing;
