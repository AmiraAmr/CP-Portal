import React, { useEffect, useRef, useState } from "react";
import "../../../../css/invoice/bootstrap.min.css";
import "../../../../css/invoice/style.css";
import "../../../../css/invoice/print2.css";
import QRCode from "qrcode.react";

const Preview = ({ data, route }) => {
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
                                {data.subject}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="subject mb-2 lh-base">{data.order_for}</div>
                <div className="matrials">
                    <p className="ms-5 text-decoration-underline fw-md">
                        MATERIALS :{" "}
                    </p>
                    <div className="table-responsive-sm">
                        <table className="table table-bordered border-primary mb-2">
                            <thead>
                                <tr className="fw-md">
                                    <th>
                                        <strong>No.</strong>
                                    </th>
                                    <th scope="col" className="fw-md fs-6">
                                        Description
                                    </th>
                                    <th scope="col" className="fw-md fs-6">
                                        Qty
                                    </th>
                                    <th scope="col" className="fw-md fs-6">
                                        Unit Price
                                    </th>
                                    <th scope="col" className="fw-md fs-6">
                                        Amount (SAR)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.attributes.map((product, index) => {
                                    return (
                                        <tr key={product.id}>
                                            <td className="text-center fs-6">
                                                {index + 1}
                                            </td>
                                            <td className="text-center fs-6">
                                                {product.pivot.dis
                                                    ? product.pivot.dis
                                                    : product.name}
                                            </td>
                                            <td className="text-center fs-6">
                                                {product.pivot.qty
                                                    ? product.pivot.qty
                                                    : product.qty}
                                            </td>
                                            <td className="text-center fs-6">
                                                {product.pivot.unit_price
                                                    ? product.pivot.unit_price
                                                    : product.unit_price}
                                            </td>
                                            <td className="text-center fs-6">
                                                {product.pivot.total
                                                    ? product.pivot.total
                                                    : product.pivot.unit_price *
                                                      product.pivot.qty}
                                            </td>
                                        </tr>
                                    );
                                })}

                                {data.attributes2.map((product, index) => {
                                    return (
                                        <tr key={product.id}>
                                            <td className="text-center fs-6">
                                                {index + 1}
                                            </td>
                                            <td className="text-center fs-6">
                                                {product.dis}
                                            </td>
                                            <td className="text-center fs-6">
                                                {product.qty}
                                            </td>
                                            <td className="text-center fs-6">
                                                {product.unit_price}
                                            </td>
                                            <td className="text-center fs-6">
                                                {product.unit_price *
                                                    product.qty}
                                            </td>
                                        </tr>
                                    );
                                })}

                                <tr>
                                    <td
                                        colspan="4"
                                        className="text-center fs-6"
                                    >
                                        {" "}
                                        VAT
                                    </td>
                                    <td className="text-center fs-6">
                                        {data.vat}
                                    </td>
                                </tr>

                                <tr>
                                    <td
                                        colspan="4"
                                        className="text-center fs-6"
                                    >
                                        Total Cost
                                    </td>
                                    <td className="text-center fs-6">
                                        {data.total}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="endsub mt-1 mb-1">
                    <p className="text-decoration-underline fw-md">
                        {" "}
                        Payment Terms :
                    </p>
                    <div className="matrials">
                        <p className="ms-5 text-decoration-underline fw-md">
                            MATERIALS :{" "}
                        </p>
                        <div className="table-responsive-sm">
                            <table className="table table-bordered border-primary mb-2">
                                <thead>
                                    <tr className="fw-md">
                                        <th scope="col">percentage</th>
                                        <th scope="col">value</th>
                                        <th scope="col">Payment details</th>
                                        <th scope="col"> date</th>
                                        <th scope="col"> note</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.note.map((note, index) => {
                                        return (
                                            <tr key={note.id}>
                                                <td>{note.name}</td>

                                                <td>{note.percentage}</td>

                                                <td>{note.amount}</td>

                                                <td>{note.date}</td>
                                                <td>{note.dis}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
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
                        <div className="col-6 border">
                            <div className="tab p-2">
                                <h6 className="text-start">
                                    Accepted on behalf of M/s{" "}
                                </h6>
                                <div className="mb-1 row align-items-center">
                                    <h1 className="title col-3">Name</h1>
                                    <span className="t-points"> : </span>
                                    <div className="col-6 fw-bold"></div>
                                </div>
                                <div className="mb-1 row align-items-center">
                                    <h1 className="title col-3">
                                        Sign & Stamp
                                    </h1>
                                    <span className="t-points"> : </span>
                                    <div className="col-6 fw-bold"></div>
                                </div>
                                <div className="mb-1 row align-items-center">
                                    <h1 className="title col-3">Date</h1>
                                    <span className="t-points"> : </span>
                                    <div className="col-6 fw-bold"></div>
                                </div>
                            </div>
                        </div>

                        <div className="  row mt-3">
                            {data.princing_supplier_cycle?.map((data) => {
                                return (
                                    <div key={data.id} className="col-2">
                                        {data.princing_supplier_comment_cycle &&
                                        data.status == 1 ? (
                                            <div className="col-2">
                                                <img
                                                    src={`/uploads/sign/${data.princing_supplier_comment_cycle.user.sign}`}
                                                    alt=""
                                                    width="80"
                                                />
                                            </div>
                                        ) : null}
                                        {data.princing_supplier_comment_cycle &&
                                        data.status == 2 ? (
                                            <div className="col-2">
                                                <p className="text-danger">
                                                    rejected
                                                </p>
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preview;
