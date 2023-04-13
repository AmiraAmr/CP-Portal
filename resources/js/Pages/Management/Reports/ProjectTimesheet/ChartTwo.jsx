import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import { Descriptions } from "antd";
import moment from "moment";

const ChartTwo = ({ data }) => {
    const [output, setOutput] = useState(0);
    const [growthRate, setGrowthRate] = useState([]);
    const [scaling, setScaling] = useState([]);

    const [series, setSeries] = useState([]);
    const [xField, setXField] = useState([]);
    const [dataForLine, setDataForLine] = useState([]);
    const config = {
        data: dataForLine,
        isGroup: true,
        xField: "date",
        yField: "percentage",
        seriesField: "name",

        /** 设置颜色 */
        //color: ['#1ca9e6', '#f88c24'],

        /** 设置间距 */
        // marginRatio: 0.1,
        label: {
            // 可手动配置 label 数据标签位置
            position: "middle",
            // 'top', 'middle', 'bottom'
            // 可配置附加的布局方法
            layout: [
                // 柱形图数据标签位置自动调整
                {
                    type: "interval-adjust-position",
                }, // 数据标签防遮挡
                {
                    type: "interval-hide-overlap",
                }, // 数据标签文颜色自动调整
                {
                    type: "adjust-color",
                },
            ],
        },
    };

    useEffect(() => {
        let scaling = [];
        let series = [];
        series.push(
            { name: "Cash out", data: [] },

            { name: "Cash in", data: [] },
            { name: "Net profit", data: [] }
        );
        var total = 0;
        var actual = 0;
        var overall = 0;

        data.forEach((e) => {
            var out = Number(e.cash_out ?? 0);
            out = out.toFixed(2);
            var _in = Number(e.cash_in ?? 0);
            _in = _in.toFixed(2);
            var net_profit = Number(e.cash_in ?? 0) - Number(e.cash_out ?? 0);
            net_profit = net_profit.toFixed(2);
            series[0].data.push(out);
            series[1].data.push(_in);
            series[2].data.push(net_profit);
            actual = Number(net_profit) + Number(actual);
            overall = Number(_in) + Number(overall);

            setOutput(((actual / overall) * 100).toFixed(2));
            var exponent = 1 / series[0].data.length;
            var st =
                Number(series[0].data[series[0].data.length - 1]) /
                Number(series[0].data[0] > 0 ? series[0].data[0] : 0.01);

            setGrowthRate(((Math.pow(st, exponent) - 1) * 100).toFixed(2));
            setXField((prev) => {
                return [...prev, moment(e.date).format("MMMM  yyyy")];
            });
        });
        setSeries(series);
        setScaling(scaling);
    }, [data]);

    useEffect(() => {
        setDataForLine([]);
        const newData = [];

        const xF = xField.map((x) => {
            return { date: x };
        });
        const values = series.map((item) => {
            return item.data.map((item1, index) => {
                newData.push({
                    date: xF[index].date,
                    percentage: Number(item1),
                    name: item.name,
                });
            });
        });
        if (values !== undefined) {
            setDataForLine(newData);
        }
    }, [xField, series]);
    return (
        <div className="bg-white p-4 rounded-md flex flex-col gap-3 space-y-3">
            <div className="flex items-center justify-between">
                <span className="text-lg text-gray-700 font-semibold">
                    Cash out & in
                </span>
            </div>
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
                <Column {...config} />
            </div>
        </div>
    );
};

export default ChartTwo;
