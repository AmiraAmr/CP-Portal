import { Table } from "antd";
import React, { useEffect, useState } from "react";

const CashIn = ({ invoice }) => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        var sum = 0;
        if (invoice?.length > 0) {
            invoice.forEach((e) => {
                sum = Number(e.total) + Number(sum);
            });
        }
        setTotal(sum);
    }, [invoice]);
    return (
        <div className="mb-3 bg-white rounded-md p-3 space-y-3">
            <span className="block text-lg text-gray-700 font-semibold">
                CashIn
            </span>
            <Table
                dataSource={invoice}
                columns={[
                    {
                        title: "Code",
                        dataIndex: "code",
                        key: "code",
                    },
                    {
                        title: "Total",
                        dataIndex: "total",
                        key: "total",
                    },
                ]}
                pagination={{ hideOnSinglePage: true }}
            />
            <span className="block text-sm text-gray-500 font-semibold">
                Total : {total}
            </span>
        </div>
    );
};

export default CashIn;
