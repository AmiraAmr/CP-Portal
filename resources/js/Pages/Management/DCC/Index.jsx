import React, { Fragment, useEffect, useState } from "react";
import ManagementLayout from "@/Layouts/ManagementLayout";
import {
    Button,
    DatePicker,
    Modal,
    Pagination,
    Space,
    Steps,
    Table,
    Tag,
} from "antd";
import { stateOfWorkFlow } from "@/Components/States";
import { router, Link } from "@inertiajs/react";
import { showDeleteConfirm } from "@/Components/ModalDelete";
import Partials from "./Partials/Partials";
import useApi from "./Partials/useApi";
import { SyncOutlined, CheckCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { Line } from "@ant-design/plots";
import axios from "axios";
import Salaries from "./Partials/Salaries";

const Index = (props) => {
    const { RangePicker } = DatePicker;

    const today = moment().format("DD/MM/YYYY");

    const [filter, setFilter] = useState({
        project_id: "",
        from: "",
        to: "",
    });
    const [data, setData] = useState([]);

    const asyncFetch = (filter) => {
        axios
            .post("/managers/dcsummary", {
                project_id: filter.project_id,
                from: filter.from,
                to: filter.to,
            })
            .then((res) => {
                setData([]);
                res.data.data.forEach((item) => {
                    setData((prev) => {
                        return [
                            ...prev,
                            {
                                date: moment(item.date).format("MMM Do YY"),
                                value: item.total_cash_in
                                    ? item.total_cash_in
                                    : 0,
                                category: "Cash in",
                            },
                            {
                                date: moment(item.date).format("MMM Do YY"),
                                value: item.total_cash_out
                                    ? item.total_cash_out
                                    : 0,
                                category: "Cash out",
                            },
                        ];
                    });
                });
            })
            .catch((error) => {});
    };
    useEffect(() => {
        asyncFetch(filter);
    }, [filter]);

    const config = {
        data,
        xField: "date",
        yField: "value",
        seriesField: "category",
        yAxis: {
            label: {
                // 数值格式化为千分位
                formatter: (v) =>
                    `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
        },
        color: ["#1979C9", "#D62A0D", "#FAA219"],
    };

    return (
        <ManagementLayout auth={props.auth} errors={props.errors}>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        DCC
                    </span>
                </div>

                <div className="bg-white p-4 rounded-md flex flex-col gap-3">
                    <Line {...config} />
                </div>
                <div className="flex flex-col gap-4">
                    <Partials
                        name="Purchase Order"
                        url="/managers/jsondcpo"
                        filter={filter}
                        workflow={props.purchase_orderworkflow}
                        cylcePartials="purchase_order_cycle"
                        cols={[
                            {
                                title: "Delivery date",
                                dataIndex: "delivery_date",
                                key: "delivery_date",
                                responsive: ["lg"],
                            },
                            {
                                title: "Delivery feedback",
                                dataIndex: "delivery_feedback",
                                key: "delivery_feedback",
                                responsive: ["lg"],
                                render: (_, { delivery_feedback }) => (
                                    <>
                                        {delivery_feedback.delivery_date <
                                            today &&
                                        delivery_feedback.closed !== 1 ? (
                                            <Tag
                                                color="warning"
                                                style={{
                                                    borderRadius: "999px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                Warning
                                            </Tag>
                                        ) : null}
                                        {delivery_feedback.delivery_date >=
                                            today &&
                                        delivery_feedback.closed !== 1 ? (
                                            <Tag
                                                icon={<SyncOutlined spin />}
                                                color="processing"
                                                style={{
                                                    borderRadius: "999px",
                                                    cursor: "pointer",
                                                    display: "inline-flex ",
                                                    alignItems: "center ",
                                                }}
                                            >
                                                Pending
                                            </Tag>
                                        ) : null}
                                        {delivery_feedback.delivery_date >=
                                            today &&
                                        delivery_feedback.closed == 1 ? (
                                            <Tag
                                                icon={<CheckCircleOutlined />}
                                                color="success"
                                                style={{
                                                    borderRadius: "999px",
                                                    cursor: "pointer",
                                                    display: "inline-flex ",
                                                    alignItems: "center ",
                                                }}
                                            >
                                                Closed
                                            </Tag>
                                        ) : null}
                                    </>
                                ),
                            },
                            {
                                title: "Vat",
                                dataIndex: "vat",
                                key: "vat",
                                responsive: ["md"],
                            },
                            {
                                title: "Total",
                                dataIndex: "total",
                                key: "total",
                                responsive: ["md"],
                            },
                        ]}
                    />
                    <Partials
                        name="Petty Cash"
                        url="/managers/jsondcpetty_cash"
                        filter={filter}
                        workflow={props.petty_cashworkflow}
                        cylcePartials="petty_cash_cycle"
                        cols={[
                            {
                                title: "Vat",
                                dataIndex: "vat",
                                key: "vat",
                                responsive: ["md"],
                            },
                            {
                                title: "Total",
                                dataIndex: "total",
                                key: "total",
                                responsive: ["md"],
                            },
                        ]}
                    />
                    <Partials
                        name="Subcontractor"
                        url="/managers/jsondcsubcontractor"
                        filter={filter}
                        workflow={props.subcontrctorworkflow}
                        cylcePartials="subcontractor"
                        cols={[
                            {
                                title: "Vat",
                                dataIndex: "vat",
                                key: "vat",
                                responsive: ["md"],
                            },
                            {
                                title: "Total",
                                dataIndex: "total",
                                key: "total",
                                responsive: ["md"],
                            },
                        ]}
                    />
                    <Salaries name="Salaries" filter={filter}/>
                    <Partials
                        name="Matrial Request"
                        url="/managers/jsondcmatrial_request"
                        filter={filter}
                        workflow={props.matrial_requestworkflow}
                        cylcePartials="matrial_request_cycle"
                        cols={[]}
                    />
                </div>
            </div>
        </ManagementLayout>
    );
};

export default Index;
