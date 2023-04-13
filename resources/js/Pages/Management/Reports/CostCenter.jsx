import ManagementLayout from "@/Layouts/ManagementLayout";
import { List, Table } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import CashIn from "./CostCenter/CashIn";
import PettyCash from "./CostCenter/PettyCash";
import PurchaseOrder from "./CostCenter/PurchaseOrder";
import Staff from "./CostCenter/Staff";
import SubContractor from "./CostCenter/SubContractor";

const CostCenter = (props) => {
    const [data, setData] = useState({});

    const [amountBudget, setAmountBudget] = useState(0);
    const [totalCashOut, setTotalCashOut] = useState(0);
    const [sumPettyCash, setSumPettyCash] = useState(0);
    const [sumPo, setSumPo] = useState(0);
    const [sumSubcontractor, setSumSubcontractor] = useState(0);
    const [netSalaries, setNetSalaries] = useState(0);
    const [filter, setFilter] = useState({
        project_id: "",
    });

    const fetch = () => {
        axios
            .post(`/managers/report/projectJson/${filter.project_id}`)
            .then((res) => {
                setData(res.data.data);
            });
    };

    useEffect(() => {
        fetch();
    }, [filter]);

    useEffect(() => {
        var total = 0;
        if (data.subcontractor) {
            data.subcontractor.forEach((e) => {
                total = Number(e.total) + Number(total);
                total = total.toFixed(2);
            });
        }
        setSumSubcontractor(total);
    }, [data]);

    useEffect(() => {
        var total =
            Number(data?.po_budget ?? 0) +
            Number(data?.subcontractor_budget ?? 0) +
            Number(data?.petty_cash_budget ?? 0) +
            Number(data?.employee_budget ?? 0);
        setAmountBudget(total.toFixed(2));
    }, [data]);

    useEffect(() => {
        var total = 0;
        if (data.petty_cash) {
            data.petty_cash.forEach((e) => {
                total = Number(e.total) + Number(total);
                total = total.toFixed(2);
            });
        }
        setSumPettyCash(total);
    }, [data]);

    useEffect(() => {
        var total = 0;
        if (data.purchase_order) {
            data.purchase_order.forEach((e) => {
                total = Number(e.total) + Number(total);
                total = total.toFixed(2);
            });
        }
        setSumPo(total);
    }, [data]);

    useEffect(() => {
        var time = 0;
        var min = 0;
        var salary_per_hour = 0;
        var Net = 0;
        if (data.contract && data.contract.length > 0) {
            data.contract.forEach((e) => {
                if (e.user) {
                    min = e.user.attending_and_leaving_sum_min ?? 0 / 60;
                    time =
                        Number(
                            e.user.attending_and_leaving_sum_time_difference
                        ) ?? 0 + Number(min);
                    time = Math.round(time);

                    var salaryPerDay =
                        Number(e.salary_per_month) /
                        Number(
                            moment(data.receive_date, "YYYY-MM").daysInMonth()
                        );
                    salaryPerDay = salaryPerDay.toFixed(2);

                    var salaryperHour = Number(salaryPerDay) / 9;
                    salaryperHour = salaryperHour.toFixed(2);
                    var overtime = Number(time) - Number(e.working_hours);
                    overtime = overtime.toFixed(2);
                    var Absence = 0;
                    if (e.Absence > 0) {
                        Absence =
                            Number(salaryperHour) *
                            Number(e.working_hours) *
                            Number(e.Absence);
                        Absence = Absence.toFixed(2);
                    }
                    var Net =
                        Number(overtime) * salaryperHour +
                        Number(time) * Number(salaryperHour) -
                        Absence +
                        Number(Net);

                    Net = Net.toFixed(2);
                }
            });
        }

        setNetSalaries(Net);
    }, [data]);

    useEffect(() => {
        var total =
            Number(sumPettyCash) +
            Number(sumSubcontractor) +
            Number(sumPo) +
            Number(netSalaries);
        setTotalCashOut(total.toFixed(2));
    }, [sumPettyCash, sumPo, sumSubcontractor, netSalaries]);
    return (
        <ManagementLayout>
            <div className="space-y-3">
                <div className="mb-3 bg-white px-6 py-3 rounded-md">
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
                <div className="mb-3 rounded-md">
                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
                        <List
                            size="small"
                            bordered
                            style={{
                                borderRadius: "6px",
                                background: "#fff",
                                border: 0,
                            }}
                            className="shadow"
                            dataSource={[
                                "Date : 06/03/2023",
                                "Project Name : KAFD",
                                "Location : 46.64034 - 24.76198",
                                "Bid Amount : 1500000.00",
                                "Project Manger :",
                            ]}
                            renderItem={(item) => <List.Item>{item}</List.Item>}
                        />{" "}
                        <List
                            size="small"
                            bordered
                            style={{
                                borderRadius: "6px",
                                background: "#fff",
                                border: 0,
                            }}
                            className="shadow"
                            dataSource={[
                                "Start Date :",
                                "Expected Handover Date :",
                                "Remaing Days : NaN",
                            ]}
                            renderItem={(item) => <List.Item>{item}</List.Item>}
                        />
                    </div>
                </div>
                <div className="mb-3 bg-white rounded-md p-3 space-y-3">
                    <span className="block text-lg text-gray-700 font-semibold">
                        CashOut
                    </span>
                    <Table
                        dataSource={[
                            {
                                key: "1",
                                number: "1",
                                description: "PO",
                                amount_budget_vat: data?.po_budget,
                                amount_expenses_vat: sumPo,
                            },
                            {
                                key: "2",
                                number: "2",
                                description: "PC",
                                amount_budget_vat: data?.petty_cash_budget,
                                amount_expenses_vat: sumPettyCash,
                            },
                            {
                                key: "3",
                                number: "3",
                                description: "SI",
                                amount_budget_vat: data?.subcontractor_budget,
                                amount_expenses_vat: sumSubcontractor,
                            },
                            {
                                key: "4",
                                number: "4",
                                description: "Staff",
                                amount_budget_vat: data?.employee_budget,
                                amount_expenses_vat: netSalaries,
                            },
                            {
                                key: "5",
                                number: "total",
                                amount_budget_vat: amountBudget,
                                amount_expenses_vat: totalCashOut,
                            },
                        ]}
                        columns={[
                            {
                                title: "NO",
                                dataIndex: "number",
                                key: "number",
                                onCell: (_, index) => ({
                                    colSpan: index == 4 ? 1 : 1,
                                }),
                            },
                            {
                                title: "Description",
                                dataIndex: "description",
                                key: "description",
                            },
                            {
                                title: "Amount budget vat",
                                dataIndex: "amount_budget_vat",
                                key: "amount_budget_vat",
                            },
                            {
                                title: "Amount expenses vat",
                                dataIndex: "amount_expenses_vat",
                                key: "amount_expenses_vat",
                            },
                        ]}
                        pagination={{ hideOnSinglePage: true }}
                    />
                </div>
                <CashIn invoice={data?.invoice} />
                <PurchaseOrder
                    data={data?.purchase_order}
                    expenses={sumPo}
                    budget_expenses={data}
                />
                <PettyCash
                    data={data?.petty_cash}
                    expenses={sumPettyCash}
                    budget_expenses={data}
                />
                <SubContractor
                    data={data?.subcontractor}
                    expenses={sumSubcontractor}
                    budget_expenses={data}
                />
                <Staff
                    data={data?.contract}
                    date={data?.receive_date}
                    netSalaries={netSalaries}
                    budget_expenses={data}
                />
            </div>
        </ManagementLayout>
    );
};

export default CostCenter;
