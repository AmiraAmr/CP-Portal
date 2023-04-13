import { stateOfWorkFlow } from "@/Components/States";
import { Space, Table, Tag } from "antd";
import React from "react";
import { Column } from "@ant-design/plots";

const SubContractor = ({ data, expenses, budget_expenses }) => {
    const config = {
        data: [
            {
                name: "budget",
                expenses: budget_expenses?.subcontractor_budget,
            },
            {
                name: "expenses",
                expenses: expenses,
            },
        ],
        xField: "name",
        yField: "expenses",
        columnWidthRatio: 0.8,
        color: ({ name }) => {
            if (name == "expenses") {
                return "#22c55e";
            }
        },
    };
    return (
        <div className="mb-3 space-y-3">
            <span className="block text-lg text-gray-700 font-semibold">
                SubContractor
            </span>
            <div className="xl:grid-cols-3 grid grid-cols-1 gap-4">
                <div className="bg-white rounded-md p-3  col-span-2">
                    <Table
                        columns={[
                            {
                                title: "Code",
                                dataIndex: "ref",
                                key: "ref",
                            },
                            {
                                title: "Date",
                                dataIndex: "date",
                                key: "date",
                                responsive: ["xl"],
                            },
                            {
                                title: "Description",
                                dataIndex: "subject",
                                key: "subject",
                                responsive: ["xl"],
                            },
                            {
                                title: "Vat",
                                dataIndex: "vat",
                                key: "vat",
                            },
                            {
                                title: "Total",
                                dataIndex: "total",
                                key: "total",
                            },
                            {
                                title: "Status",
                                dataIndex: "status",
                                key: "status",
                                responsive: ["sm"],
                                render: (_, { status, cylce }) => (
                                    <>
                                        {status !== null && (
                                            <Tag
                                                color={
                                                    stateOfWorkFlow[status]
                                                        .color
                                                }
                                                style={{
                                                    borderRadius: "999px",
                                                    cursor: "pointer",
                                                }}
                                            >
                                                {stateOfWorkFlow[status].name}
                                            </Tag>
                                        )}
                                    </>
                                ),
                            },
                            // {
                            //     title: "Action",
                            //     dataIndex: "action",
                            //     key: "action",
                            //     render: (_, record) => (
                            //         <Space size="middle">
                            //             <a
                            //                 href={`/managers/subcontractor_requestreturn/${record.id}`}
                            //                 className="flex items-center text-green-500 hover:text-green-700"
                            //                 target={"_blank"}
                            //             >
                            //                 <svg
                            //                     className="w-4 h-4 mr-1 rtl:ml-1"
                            //                     viewBox="0 0 24 24"
                            //                     fill="currentColor"
                            //                     xmlns="http://www.w3.org/2000/svg"
                            //                 >
                            //                     <path d="M11.9999 16.3299C9.60992 16.3299 7.66992 14.3899 7.66992 11.9999C7.66992 9.60992 9.60992 7.66992 11.9999 7.66992C14.3899 7.66992 16.3299 9.60992 16.3299 11.9999C16.3299 14.3899 14.3899 16.3299 11.9999 16.3299ZM11.9999 9.16992C10.4399 9.16992 9.16992 10.4399 9.16992 11.9999C9.16992 13.5599 10.4399 14.8299 11.9999 14.8299C13.5599 14.8299 14.8299 13.5599 14.8299 11.9999C14.8299 10.4399 13.5599 9.16992 11.9999 9.16992Z" />
                            //                     <path d="M12.0001 21.02C8.24008 21.02 4.69008 18.82 2.25008 15C1.19008 13.35 1.19008 10.66 2.25008 8.99998C4.70008 5.17998 8.25008 2.97998 12.0001 2.97998C15.7501 2.97998 19.3001 5.17998 21.7401 8.99998C22.8001 10.65 22.8001 13.34 21.7401 15C19.3001 18.82 15.7501 21.02 12.0001 21.02ZM12.0001 4.47998C8.77008 4.47998 5.68008 6.41998 3.52008 9.80998C2.77008 10.98 2.77008 13.02 3.52008 14.19C5.68008 17.58 8.77008 19.52 12.0001 19.52C15.2301 19.52 18.3201 17.58 20.4801 14.19C21.2301 13.02 21.2301 10.98 20.4801 9.80998C18.3201 6.41998 15.2301 4.47998 12.0001 4.47998Z" />
                            //                 </svg>
                            //                 Preview
                            //             </a>
                            //         </Space>
                            //     ),
                            // },
                        ]}
                        dataSource={data}
                        pagination={false}
                    />
                </div>
                <Column
                    {...config}
                    className="bg-white rounded-md p-3  max-h-64"
                />
            </div>
            <div className="bg-white rounded-md p-3 py-2">
                <span className="block text-base text-gray-700 font-medium">
                    Total Amount With Vat : {expenses}
                </span>
            </div>
        </div>
    );
};

export default SubContractor;
