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
                        unit: e.unit,
                        unit_price: e.unit_price,
                        expctedqty: e.expctedqty,
                        total: e.expctedqty * e.unit_price,
                    },
                ];
            });
        });
    }, [data]);
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
                    <div className="mb-3 row align-items-center">
                        <h1 className="title col-4 col-sm-1">contractor</h1>
                        <span className="t-points"> : </span>
                        {data.contractor ? (
                            <div className="col-6 col-sm-4 fw-md">
                                <span>
                                    {data.contractor.contractor_name
                                        ? data.contractor.contractor_name
                                        : data.contractor.comp}
                                </span>
                            </div>
                        ) : null}

                        <div className="col-6 col-sm-4 fw-md" v-else>
                            <span>{data.contractor_name}</span>
                        </div>
                    </div>

                    <div className="mb-2 row align-items-center">
                        <h1 className="title col-4 col-sm-1">Project</h1>
                        <span className="t-points"> : </span>
                        <div className="col-8">
                            {data.project ? (
                                <span className="text-decoration-underline fw-md">
                                    {data.project.name}
                                </span>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div className="matrials">
                    <p className="ms-5 text-decoration-underline fw-md">
                        conditions :{" "}
                    </p>
                    <div className="table-responsive-sm">
                        <table className="table table-bordered border-primary mb-2">
                            <thead>
                                <tr className="fw-md">
                                    <th scope="col" className="fw-md fs-6">
                                        No
                                    </th>

                                    <th scope="col" className="fw-md fs-6">
                                        condition
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.condition.map((condition, index) => {
                                    return (
                                        <tr key={condition.id}>
                                            <td className="text-center fs-6">
                                                {index + 1}
                                            </td>
                                            <td className="text-center fs-6">
                                                {condition.condition
                                                    ? condition.condition
                                                    : condition.dis}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="matrials">
                    <p className="ms-5 text-decoration-underline fw-md">
                        conditions :{" "}
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
                                        Qty
                                    </th>
                                    <th scope="col" className="fw-md fs-6">
                                        unit
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
                                {scaling.map((product, index) => {
                                    return (
                                        <tr key={product.id}>
                                            <td className="text-center fs-6">
                                                {index + 1}
                                            </td>
                                            <td className="text-center fs-6">
                                                {product.name
                                                    ? product.name
                                                    : product.dis}
                                            </td>
                                            <td className="text-center fs-6">
                                                {product.expctedqty}
                                            </td>
                                            <td className="text-center fs-6">
                                                {product.unit}
                                            </td>
                                            <td className="text-center fs-6">
                                                {product.unit_price}
                                            </td>
                                            <td className="text-center fs-6">
                                                {product.total}
                                            </td>
                                        </tr>
                                    );
                                })}

                                <tr>
                                    <td
                                        colspan="5"
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
                        {/* <qrcode-vue :value="route" size="90" level="L" /> */}
                        <QRCode
                            value="https://reactjs.org/"
                            renderAs="canvas"
                            size="90"
                        />
                    </div>
                </div>

                <div className="d-flex  row">
                    {data.contract_withsubcontractor_cycle.map(
                        (data, index) => {
                            return (
                                <div key={data.id} className="col-2">
                                    {data.comment_contract_withsubcontractor_cycle ? (
                                        <div className="col-2">
                                            <img
                                                src={`/uploads/sign/${data.comment_contract_withsubcontractor_cycle.user.sign}`}
                                                width="80"
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        </div>
    );
};

export default Preview;
