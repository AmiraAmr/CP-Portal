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

                    <div className="mb-3 row align-items-center">
                        <h1 className="title col-6 col-sm-1">created by </h1>
                        <span className="t-points"> : </span>
                        <div className="col-6 col-sm-4">
                            {data.user ? data.user.name : data.user_name}
                        </div>
                    </div>

                    <div className="mb-3 row align-items-center">
                        <h1 className="title col-6 col-sm-1">employee </h1>
                        <span className="t-points"> : </span>
                        <div className="col-6 col-sm-4">
                            {data.employee.name}
                        </div>
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

                <div className="subject mb-2 lh-base">{data.content}</div>
                <div className="matrials">
                    <p className="ms-5 text-decoration-underline fw-md">
                        services :{" "}
                    </p>
                    <div className="table-responsive-sm">
                        <table className="table table-bordered border-primary mb-2">
                            <thead>
                                <tr className="fw-md">
                                    <th scope="col" className="fw-md fs-6">
                                        No
                                    </th>
                                    <th scope="col" className="fw-md fs-6">
                                        Description
                                    </th>
                                    <th scope="col" className="fw-md fs-6">
                                        amount
                                    </th>
                                    <th scope="col" className="fw-md fs-6">
                                        percentage
                                    </th>
                                    <th scope="col" className="fw-md fs-6">
                                        employee_cost
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
                                                {product.item}
                                            </td>
                                            <td className="text-center fs-6">
                                                {product.amount}
                                            </td>
                                            <td className="text-center fs-6">
                                                {product.percentage}
                                            </td>
                                            <td className="text-center fs-6">
                                                {product.employee_cost}
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
                                        {data.total}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="qr row pt-4 pb-4">
                    <div className="col-6">
                        <QRCode
                            value={route ? route : ""}
                            renderAs="canvas"
                            size="90"
                        />
                    </div>
                </div>

                <div className="d-flex  row">
                    {data.service_cycle.map((data) => {
                        return (
                            <div key={data.id} className="col-2">
                                {data.service_comment_cycle ? (
                                    <div className="col-2">
                                        <img
                                            src={`/uploads/sign/${data.service_comment_cycle.user.sign}`}
                                            alt=""
                                            width="80"
                                        />
                                    </div>
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Preview;
