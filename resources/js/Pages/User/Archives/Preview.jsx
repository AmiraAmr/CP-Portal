import React, { useEffect, useRef, useState } from "react";
import "../../../../css/invoice/bootstrap.min.css";
import "../../../../css/invoice/style.css";
import "../../../../css/invoice/print2.css";
import QRCode from "qrcode.react";

const Preview = ({ data, route }) => {
    const [scaling, setScaling] = useState([]);
    const canvasRef = useRef();

    useEffect(() => {
        data.attributes.forEach((e) => {
            var total_qty = Number(e.currentqty) + Number(e.previous_qty);
            setScaling((prev) => {
                return [
                    ...prev,
                    {
                        name: e.name ? e.name : e.dis,
                        qty: e.qty,
                        unit: e.unit,
                        previous_qty: e.previous_qty,

                        currentqty: e.currentqty,
                        total_qty: total_qty,
                        Excution_percentage: e.Excution_percentage,
                        unit_price: e.unit_price,
                        total: e.total,
                    },
                ];
            });
        });
    }, [data]);
    return (
        <div>
            <button type="button" class="btn btn-light">
                print
            </button>

            <div class="container" id="printMe">
                <header>
                    <img
                        src="/img/275129174_711180993589195_571670907052531278_n.jpg"
                        style={{ height: "120px" }}
                        class="rounded d-block img-fluid"
                        alt="Header"
                    />
                </header>
                <div class="details mt-2">
                    <div class="mb-2 row align-items-center">
                        <h1 class="title col-6 col-sm-1">Ref</h1>

                        <span class="t-points"> : </span>
                        <div class="col-6 col-sm-4">{data.ref}</div>
                    </div>
                    <div class="mb-3 row align-items-center">
                        <h1 class="title col-6 col-sm-1">Date</h1>
                        <span class="t-points"> : </span>
                        <div class="col-6 col-sm-4">{data.date}</div>
                    </div>
                    <div class="mb-3 row align-items-center">
                        <h1 class="title col-4 col-sm-1">To</h1>
                        <span class="t-points"> : </span>
                        <div class="col-6 col-sm-4 fw-md">
                            <span>{data.to}</span>
                        </div>
                    </div>
                    <div class="mb-2 row align-items-center">
                        <h1 class="title col-4 col-sm-1">Subject</h1>
                        <span class="t-points"> : </span>

                        <div class="col-8">
                            <span class="text-decoration-underline fw-md">
                                {data.subject}
                            </span>
                        </div>
                    </div>
                    <div class="mb-2 row align-items-center">
                        <h1 class="title col-4 col-sm-1">Project</h1>
                        <span class="t-points"> : </span>
                        <div class="col-8">
                            <span
                                class="text-decoration-underline fw-md"
                                v-if="data.project"
                            >
                                {data.project.name}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="subject mb-2 lh-base">{data.contract_no}</div>
                <div class="matrials">
                    <p class="ms-5 text-decoration-underline fw-md">
                        MATERIALS :{" "}
                    </p>
                    <div class="table-responsive-sm">
                        <table class="table table-bordered border-primary mb-2">
                            <thead>
                                <tr class="fw-md">
                                    <th scope="col" class="fw-md fs-6">
                                        No
                                    </th>
                                    <th scope="col" class="fw-md fs-6">
                                        Description
                                    </th>
                                    <th scope="col" class="fw-md fs-6">
                                        Qty
                                    </th>
                                    <th scope="col" class="fw-md fs-6">
                                        unit
                                    </th>

                                    <th scope="col" class="fw-md fs-6">
                                        previous_qty
                                    </th>

                                    <th scope="col" class="fw-md fs-6">
                                        total_qty
                                    </th>
                                    <th scope="col" class="fw-md fs-6">
                                        {" "}
                                        Percentage %
                                    </th>

                                    <th scope="col" class="fw-md fs-6">
                                        Unit Price
                                    </th>
                                    <th scope="col" class="fw-md fs-6">
                                        Amount (SAR)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {scaling.map((product, index) => {
                                    return (
                                        <tr key={product.id}>
                                            <td class="text-center fs-6">
                                                {index + 1}
                                            </td>
                                            <td class="text-center fs-6">
                                                {product.name
                                                    ? product.name
                                                    : product.dis}
                                            </td>
                                            <td class="text-center fs-6">
                                                {product.qty}
                                            </td>

                                            <td class="text-center fs-6">
                                                {product.unit}
                                            </td>
                                            <td class="text-center fs-6">
                                                {product.previous_qty}
                                            </td>

                                            <td class="text-center fs-6">
                                                {product.total_qty}
                                            </td>
                                            <td class="text-center fs-6">
                                                {product.Excution_percentage} %
                                            </td>
                                            <td class="text-center fs-6">
                                                {product.unit_price}
                                            </td>
                                            <td class="text-center fs-6">
                                                {product.total}
                                            </td>
                                        </tr>
                                    );
                                })}

                                <tr>
                                    <td colspan="8" class="text-center fs-6">
                                        {" "}
                                        VAT
                                    </td>
                                    <td class="text-center fs-6">{data.vat}</td>
                                </tr>

                                <tr>
                                    <td colspan="8" class="text-center fs-6">
                                        Total Cost
                                    </td>
                                    <td class="text-center fs-6">
                                        {data.total}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="qr row pt-4 pb-4">
                    <div class="col-6">
                        <QRCode
                            value={route ? route : ""}
                            renderAs="canvas"
                            size="90"
                        />
                    </div>
                </div>

                {data.subcontractor.map((data, index) => {
                    return (
                        <div key={data.id}>
                            {data.comment_subcontractor_cycle &&
                            data.status == 1 ? (
                                <div class="col-2">
                                    <img
                                        src={`/uploads/sign/${data.comment_subcontractor_cycle.user.sign}`}
                                        alt=""
                                        width="80"
                                    />
                                </div>
                            ) : null}

                            {data.comment_subcontractor_cycle &&
                            data.status == 2 ? (
                                <div class="col-2">
                                    <p class="text-danger">rejected</p>
                                </div>
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Preview;
