import React, { Fragment, useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import moment from "moment";
import { Line } from "@ant-design/plots";
import { Descriptions } from "antd";

const Tender = (props) => {
    const [output, setOutput] = useState([]);
    const [growthRate, setGrowthRate] = useState([]);
    const [scaling, setScaling] = useState([]);
    const [data, setData] = useState([]);
    const [series, setSeries] = useState([]);
    const [xField, setXField] = useState([]);
    const [dataForLine, setDataForLine] = useState([]);
    const fetch = () => {
        axios.post(`/managers/report/department/tender/json`).then((res) => {
            setData(res.data.data.monthly_section);
        });
    };

    const config = {
        data: dataForLine,
        xField: "date",
        yField: "percentage",
        seriesField: "category",
        yAxis: {
            label: {
                // 数值格式化为千分位
                formatter: (v) =>
                    `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
        },
        smooth: true,
        color: ["#1979C9", "#D62A0D", "#FAA219"],
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
            var percentage_pricing = Number(e.percentage_pricing) * 0.6;
            var deal =
                e.num_deal >= 1
                    ? Number(100) * 0.2 + (Number(e.num_deal) - 1 * 100 * 0.1)
                    : 0;
            deal = deal.toFixed(2);
            var total = Number(deal) + Number(percentage_pricing);

            total = total.toFixed(2);

            actual = Number(total) + Number(actual);

            series[0].data.push(total);

            setXField((prev) => {
                return [...prev, moment(e.date).format("MMMM  yyyy")];
            });

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
        <div className="p-4 flex flex-col gap-3 space-y-3">
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
                            output >= 50 ? "text-green-500" : "text-red-500"
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
            <div className="p-4 flex flex-col gap-3 border-t">
                <Line {...config} />
            </div>
        </div>
    );
};

export default Tender;
