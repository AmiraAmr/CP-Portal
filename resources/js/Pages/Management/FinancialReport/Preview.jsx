import React, { useEffect, useRef, useState } from "react";
import "../../../../css/invoice/bootstrap.min.css";
import "../../../../css/invoice/style.css";
import "../../../../css/invoice/print2.css";
import QRCode from "qrcode.react";
const Preview = ({ data, route }) => {
    const [customising, setCustomising] = useState([]);
    const [items, setItems] = useState(data.item ? data.item : []);

    useEffect(() => {
        items.forEach((e) => {
            var value =
                Number(
                    e.purchase_order
                        ? e.purchase_order.paid
                        : e.petty_cash
                        ? e.petty_cash.paid
                        : e.subcontractor
                        ? e.subcontractor.paid
                        : 0
                ) + Number(e.pay);
            e.remaining_amount =
                Number(
                    e.purchase_order
                        ? e.purchase_order.total
                        : e.petty_cash
                        ? e.petty_cash.total ?? e.petty_cash.expected_amount
                        : e.subcontractor
                        ? e.subcontractor.total
                        : 0
                ) - Number(value);
        });
        setCustomising(items);
    }, [data, items]);
    return (
        <div>
            <button className="btn btn-light" v-print="'#printMe'">
                Print{" "}
            </button>

            <div className="container" id="printMe">
                <header>
                    <img
                        src="/img/275129174_711180993589195_571670907052531278_n.jpg"
                        style={{ height: "120px" }}
                        className="rounded d-block img-fluid"
                        alt="Header"
                    />
                </header>

                <div className="details mt-2">
                    <div className="mb-2 row align-items-center">
                        <h1 className="title col-6 col-sm-1">Ref</h1>

                        <span className="t-points"> : </span>
                        <div className="col-6 col-sm-4">{data.ref}</div>
                    </div>
                    <div className="mb-3 row align-items-center">
                        <h1 className="title col-6 col-sm-1">Date</h1>
                        <span className="t-points"> : </span>
                        <div className="col-6 col-sm-4">{data.date}</div>
                    </div>

                    <div className="mb-2 row align-items-center">
                        <h1 className="title col-4 col-sm-1">Subject</h1>
                        <span className="t-points"> : </span>

                        <div className="col-8">
                            <span className="text-decoration-underline fw-md">
                                daily payment list
                            </span>
                        </div>
                    </div>
                </div>

                <div className="matrials">
                    <p className="ms-5 text-decoration-underline fw-md">
                        payment :{" "}
                    </p>
                    <div className="table-responsive-sm">
                        <table className="table table-bordered border-primary mb-2">
                            <thead>
                                <tr className="fw-md">
                                    <th scope="col" className="fw-md fs-6">
                                        item
                                    </th>
                                    <th scope="col" className="fw-md fs-6">
                                        supplier
                                    </th>

                                    <th scope="col" className="fw-md fs-6">
                                        PAY
                                    </th>
                                    <th scope="col" className="fw-md fs-6">
                                        PAID
                                    </th>
                                    <th scope="col" className="fw-md fs-6">
                                        TOTAL
                                    </th>

                                    <th scope="col" className="fw-md fs-6">
                                        remaining amount
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {customising?.map((data) => {
                                    return (
                                        <tr key={data?.id}>
                                            {data?.petty_cash ? (
                                                <td className="text-center fs-6">
                                                    {data?.petty_cash.ref}
                                                </td>
                                            ) : null}
                                            {data?.purchase_order ? (
                                                <td className="text-center fs-6">
                                                    {data?.purchase_order.ref}
                                                </td>
                                            ) : null}
                                            {data?.subcontractor ? (
                                                <td className="text-center fs-6">
                                                    {data?.subcontractor.ref}
                                                </td>
                                            ) : null}
                                            {data?.purchase_order &&
                                            data?.purchase_order?.project
                                                .name ? (
                                                <td className="text-center fs-6">
                                                    {
                                                        data?.purchase_order
                                                            .project.name
                                                    }
                                                </td>
                                            ) : null}
                                            {data?.petty_cash &&
                                            data?.purchase_order?.petty_cash ? (
                                                <td className="text-center fs-6">
                                                    {
                                                        data?.petty_cash.project
                                                            .name
                                                    }
                                                </td>
                                            ) : null}
                                            {data?.subcontractor &&
                                            data?.purchase_order?.subcontractor ? (
                                                <td className="text-center fs-6">
                                                    {
                                                        data?.subcontractor
                                                            .project.name
                                                    }
                                                </td>
                                            ) : (
                                                <td v-else>unknown</td>
                                            )}

                                            {data?.supplier ? (
                                                <td className="text-center fs-6">
                                                    {data?.supplier.comp
                                                        ? data?.supplier.comp
                                                        : data?.supplier
                                                              .supplier_name}
                                                </td>
                                            ) : (
                                                <td v-else>unknown</td>
                                            )}

                                            <td
                                                data-table="PAY"
                                                className="text-center fs-6"
                                            >
                                                {data?.pay ? (
                                                    <p>{data?.pay}</p>
                                                ) : null}
                                            </td>
                                            {data?.purchase_order ? (
                                                <td
                                                    data-table="Paid"
                                                    className="text-center fs-6"
                                                >
                                                    {data?.purchase_order ? (
                                                        <p>
                                                            {
                                                                data
                                                                    ?.purchase_order
                                                                    .paid
                                                            }
                                                        </p>
                                                    ) : null}
                                                </td>
                                            ) : null}

                                            {data?.petty_cash ? (
                                                <td
                                                    data-table="Paid"
                                                    className="text-center fs-6"
                                                >
                                                    {data?.petty_cash ? (
                                                        <p>
                                                            {
                                                                data?.petty_cash
                                                                    .paid
                                                            }
                                                        </p>
                                                    ) : null}
                                                </td>
                                            ) : null}

                                            {data?.subcontractor ? (
                                                <td
                                                    data-table="Paid"
                                                    className="text-center fs-6"
                                                >
                                                    {data?.subcontractor ? (
                                                        <p>
                                                            {
                                                                data
                                                                    .subcontractor
                                                                    .paid
                                                            }
                                                        </p>
                                                    ) : null}
                                                </td>
                                            ) : null}

                                            <td
                                                data-table="TOTAL"
                                                className="text-center fs-6"
                                            >
                                                {data?.purchase_order ? (
                                                    <p>
                                                        {
                                                            data?.purchase_order
                                                                .total
                                                        }
                                                    </p>
                                                ) : null}
                                                {data?.petty_cash ? (
                                                    <p>
                                                        {data?.petty_cash.total}
                                                    </p>
                                                ) : null}
                                                {data?.subcontractor ? (
                                                    <p>
                                                        {
                                                            data?.subcontractor
                                                                .total
                                                        }
                                                    </p>
                                                ) : null}
                                            </td>
                                        </tr>
                                    );
                                })}

                                <tr>
                                    <td
                                        colspan="4"
                                        className="text-center fs-6"
                                    >
                                        Total Cost
                                    </td>
                                    <td className="text-center fs-6">
                                        {data?.total}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="row align-items-center">
                    <div className="qr row pt-4 pb-4">
                        <div className="col-6">
                            <QRCode
                                value={route ? route : ""}
                                renderAs="canvas"
                                size="90"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preview;
