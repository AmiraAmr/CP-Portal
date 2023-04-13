import ManagementLayout from "@/Layouts/ManagementLayout";
import { List, Table } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

const Stock = (props) => {
    const [data, setData] = useState({});
    const [future, setFuture] = useState("");
    const [start, setStart] = useState("");
    const [remaing, setRemaing] = useState("");
    const [rows, setRows] = useState([]);
    const [filter, setFilter] = useState({
        project_id: "",
    });

    const fetch = () => {
        axios
            .post(`/managers/report/stockJson/${filter.project_id}`)
            .then((res) => {
                setData(res.data.data);
            });
    };

    useEffect(() => {
        fetch();
    }, [filter]);

    useEffect(() => {
        setFuture(moment(data.receive_date, "DD/MM/YYYY"));
    }, [data]);

    useEffect(() => {
        setStart(moment(data.final_delivery_date, "DD/MM/YYYY"));
    }, [data]);

    // useEffect(() => {
    //     setRemaing(moment.duration(start.diff(future)).asDays());
    // }, [future, start]);

    useEffect(() => {
        setRows([]);
        data.purchase_order?.forEach((e) => {
            e.attributes.forEach((attributes) => {
                var name = attributes.name ?? attributes.dis;
                setRows((prev) => {
                    return [
                        ...prev,
                        {
                            name: name,
                            delivery_date: e.delivery_date,
                            date: e.date,
                            po: e.ref,
                            rowspan: e.attributes.length + e.attributes2.length,
                        },
                    ];
                });
            });
            var start = 0;
            e.attributes2.forEach((attributes) => {
                var name = attributes.name ?? attributes.dis;
                if (e.attributes.length == 0) {
                    if (start == 0) {
                        setRows((prev) => {
                            return [
                                ...prev,
                                {
                                    name: name,
                                    delivery_date: e.delivery_date,
                                    date: e.date,
                                    po: e.ref,
                                    rowspan:
                                        e.attributes.length +
                                        e.attributes2.length,
                                },
                            ];
                        });
                        start = 1;
                    } else {
                        setRows((prev) => {
                            return [...prev, { name: name }];
                        });
                    }
                } else {
                    setRows((prev) => {
                        return [
                            ...prev,
                            {
                                name: name,
                                delivery_date: e.delivery_date,
                                date: e.date,
                                po: e.ref,
                            },
                        ];
                    });

                }
            });
        });
    }, [data]);
    return (
        <ManagementLayout>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Stock page
                    </span>
                </div>
                <div className="mb-3 bg-white p-3 rounded-md">
                    <div className="grid md:grid-cols-3 gap-2 grid-cols-1">
                        <div>
                            <label
                                htmlFor="project"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Projects
                            </label>
                            <select
                                id="project"
                                className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
                                        <option
                                            key={project.id}
                                            value={project.id}
                                        >
                                            {project.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mb-3 bg-white p-3 rounded-md">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
                        <List
                            size="small"
                            bordered
                            style={{ borderRadius: "6px" }}
                            dataSource={[
                                `Date : ${moment().format("DD/MM/YYYY")}`,
                                `Project Name : ${data.name ? data.name : ""}`,
                                `Location : - ${data.log ? data.log : ""}  - ${
                                    data.lat ? data.lat : ""
                                }`,
                                `Bid Amount : ${
                                    data.bid_value ? data.bid_value : ""
                                }`,
                                `Project Manger :`,
                            ]}
                            renderItem={(item) => <List.Item>{item}</List.Item>}
                        />
                        <List
                            size="small"
                            bordered
                            style={{ borderRadius: "6px" }}
                            dataSource={[
                                `Start Date : ${
                                    data.receive_date ? data.receive_date : ""
                                }`,
                                `Expected Handover Date : ${
                                    data.final_delivery_date
                                        ? data.final_delivery_date
                                        : ""
                                }`,
                                `Remaing Days : `,
                            ]}
                            renderItem={(item) => <List.Item>{item}</List.Item>}
                        />
                    </div>
                </div>
                <Table
                    columns={[
                        {
                            title: "Po",
                            dataIndex: "po",
                            key: "po",
                        },
                        {
                            title: "Delivery date",
                            dataIndex: "delivery_date",
                            key: "delivery_date",
                            responsive: ["xl"],
                        },
                        {
                            title: "Date",
                            dataIndex: "date",
                            key: "date",
                            responsive: ["xl"],
                        },
                        {
                            title: "Name",
                            dataIndex: "name",
                            key: "name",
                            responsive: ["xl"],
                        },
                    ]}
                    dataSource={rows}
                    pagination={false}
                />
            </div>
        </ManagementLayout>
    );
};

export default Stock;
