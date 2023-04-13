import React, { useEffect, useRef, useState } from "react";
import "../../../../css/invoice/bootstrap.min.css";
import "../../../../css/invoice/style.css";
import "../../../../css/invoice/print2.css";
import QRCode from "qrcode.react";
const Preview = ({ dataFromController, routeFromController }) => {
    const [data, setData] = useState({});
    useEffect(() => {
        if (dataFromController) {
            setData(dataFromController);
        } else {
            let dataFromPreview = route().params;
            setData(dataFromPreview);
        }
    }, []);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (dataFromController) {
            setProducts([]);
            dataFromController.attributes?.map((e) => {
                setProducts((prev) => {
                    return [
                        ...prev,
                        {
                            id: e.id,
                            dis: e.pivot.dis,
                            qty: e.pivot.qty,
                            product_id: e.pivot.product_id,
                            unit: e.pivot.unit,
                            unit_price: e.pivot.unit_price,
                        },
                    ];
                });
            });
            dataFromController.attributes2?.map((e) => {
                setProducts((prev) => {
                    return [...prev, e];
                });
            });
        }
    }, [dataFromController]);

    useEffect(() => {
        let dataFromPreview = route().params;

        if (dataFromPreview.attributes) {
            setProducts([]);
            dataFromPreview.attributes.map((e) => {
                setProducts((prev) => {
                    return [
                        ...prev,
                        {
                            id: e.id,
                            dis: e.dis,
                            qty: e.qty,
                            product_id: e.product_id,
                            unit: e.unit,
                            unit_price: e.unit_price,
                            total: e.total,
                        },
                    ];
                });
            });
        }
    }, []);
    return (
        <div>
            <button class="btn btn-light" v-print="'#printMe'">
                Print{" "}
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
                        <h1 class="title col-6 col-sm-1">created by </h1>
                        <span class="t-points"> : </span>
                        <div class="col-6 col-sm-4">
                            {data.user ? data.user.name : me}
                        </div>
                    </div>

                    <div class="mb-3 row align-items-center">
                        <h1 class="title col-6 col-sm-1">employee </h1>
                        <span class="t-points"> : </span>
                        <div class="col-6 col-sm-4">
                            {data.employee
                                ? data.employee.name
                                : data.user_name}
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
                </div>

                <div class="subject mb-2 lh-base">{data.content}</div>
                <div class="matrials">
                    <p class="ms-5 text-decoration-underline fw-md">
                        services :{" "}
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
                                        amount
                                    </th>
                                    <th scope="col" class="fw-md fs-6">
                                        percentage
                                    </th>
                                    <th scope="col" class="fw-md fs-6">
                                        employee_cost
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products?.map((product, index) => {
                                    return (
                                        <tr key={product.id}>
                                            <td class="text-center fs-6">
                                                {index + 1}
                                            </td>
                                            <td class="text-center fs-6">
                                                {product.item}
                                            </td>
                                            <td class="text-center fs-6">
                                                {product.amount}
                                            </td>
                                            <td class="text-center fs-6">
                                                {product.percentage}
                                            </td>
                                            <td class="text-center fs-6">
                                                {product.employee_cost}
                                            </td>
                                        </tr>
                                    );
                                })}

                                <tr>
                                    <td colspan="4" class="text-center fs-6">
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

                <div class="d-flex  row">
                    {data.service_cycle?.map((data) => {
                        return (
                            <div key={data.id} class="col-2">
                                {data.service_comment_cycle ? (
                                    <div class="col-2">
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
