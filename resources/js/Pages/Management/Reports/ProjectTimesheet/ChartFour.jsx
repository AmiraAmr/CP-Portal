import React, { Fragment, useEffect, useState } from "react";
import moment from "moment";
import { Line } from "@ant-design/plots";
import { Descriptions } from "antd";

const ChartFour = ({ data }) => {
    const [output, setOutput] = useState(0);
    const [growthRate, setGrowthRate] = useState([]);
    const [scaling, setScaling] = useState([]);

    const [series, setSeries] = useState([]);
    const [xField, setXField] = useState([]);
    const [dataForLine, setDataForLine] = useState([]);

    const config = {
        data: dataForLine,
        padding: "auto",
        xField: "date",
        yField: "percentage",
        smooth: true,
    };

    useEffect(() => {
        let scaling = [];
        let series = [];
        series.push({ name: "project", data: [] });
        var actual = 0;
        data.forEach((e) => {
            if (
                e.percentage_attendance !== null &&
                e.percentage_attendance >= 0
            ) {
                series[0].data.push(e.percentage_attendance);
            } else {
                series[0].data.push(0);
            }

            setXField((prev) => {
                return [...prev, moment(e.date).format("MMMM  yyyy")];
            });

            actual = Number(e.percentage_attendance) + Number(actual);
            var overall = series[0].data.length * 100;

            setOutput(((actual / overall) * 100).toFixed(2) )
            var exponent = 1 / series[0].data.length;
            var st =
                Number(series[0].data[series[0].data.length - 1]) /
                Number(
                    series[0].data[0] > 0 ? series[0].data[0] : 0.01
                );

            setGrowthRate(((Math.pow(st, exponent) - 1) * 100).toFixed(2))

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
            return { date: xF[index].date, percentage: Number(item) };
        });
        if (values !== undefined) {
            setDataForLine(values);
        }
    }, [xField, series]);

    return (
        <div className="bg-white p-4 rounded-md flex flex-col gap-3 space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-lg text-gray-700 font-semibold">
                    Attendance percentage
                </span>
            </div>
            <div className="p-4 flex flex-col gap-3 border-t">
                <Line {...config} />
            </div>
        </div>
    );
};

export default ChartFour;
