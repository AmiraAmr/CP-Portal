import React, { useEffect, useState } from "react";
import moment from "moment";
import { Line } from "@ant-design/plots";
import { Descriptions, Select } from "antd";

const ConstructionDepartment = ({ projects }) => {
    const [output, setOutput] = useState([]);
    const [growthRate, setGrowthRate] = useState([]);
    const [scaling, setScaling] = useState([]);
    const [data, setData] = useState([]);
    const [series, setSeries] = useState([]);
    const [xField, setXField] = useState([]);
    const [dataForLine, setDataForLine] = useState([]);
    const [bidValue, setBidValue] = useState({});
    const [options, setOptions] = useState([]);
    const [selectedProjects, setSelectedProjects] = useState([]);
    const handleChange = (value) => {
        setSelectedProjects(value);
    };

    const fetch = () => {
        axios
            .post(`/managers/report/department/construction/json`, {
                project_id: selectedProjects,
            })
            .then((res) => {
                setData(res.data.data);
                setBidValue(res.data.bid_value);
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
    }, [selectedProjects]);

    useEffect(() => {
        let scaling = [];
        let series = [];
        series.push({ name: "project", data: [] });
        var actual = 0;
        var overall = 0;

        data.forEach((e) => {
            e.project_overall.forEach((element) => {
                var percentage_attendance =
                    Number(element.percentage_attendance) * 0.25;
                var percentage_performance =
                    Number(element.percentage_performance) * 0.25;
                var sum = Number(element.cash_in) - Number(element.cash_out);
                sum = (Number(sum) * 100) / element.cash_in;
                if (sum > 100) {
                    sum = 100;
                }
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
                var project_bid_value =
                    (Number(e.bid_value) * 100) /
                    Number(bidValue.bid_value_open) /
                    100;
                project_bid_value = project_bid_value.toFixed(2);
                var total =
                    Number(percentage_performance ?? 0) +
                    Number(percentage_attendance ?? 0) +
                    Number(comparison ?? 0);

                total = Number(total) * Number(project_bid_value);
                total = total.toFixed(2);
                let item = scaling.find((data) => element.date == data.date);
                if (item !== undefined) {
                    item.percentage = Number(total) + Number(item.percentage);
                    item.percentage = item.percentage.toFixed(2);
                } else {
                    scaling.push({ date: element.date, percentage: total });
                }
            });
        });

        scaling.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));

        scaling.forEach((e) => {
            series[0].data.push(e.percentage);
            actual = Number(e.percentage) + Number(actual);
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
        projects.map((project) => {
            setOptions((prev) => {
                return [...prev, { label: project.name, value: project.id }];
            });
        });
    }, [projects]);
    return (
        <div className="flex flex-col gap-3">
            <Select
                mode="multiple"
                allowClear
                showSearch={false}
                placeholder="Select a specific project"
                style={{
                    width: "100%",
                    marginTop: "8px",
                    height: "42px",
                }}
                showArrow
                onChange={handleChange}
                options={options}
            />
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

export default ConstructionDepartment;
