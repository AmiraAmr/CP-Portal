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
    return (
        <div>
            <button className="btn btn-light">Print </button>

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
                        <h1 className="title col-4 col-sm-1">To</h1>
                        <span className="t-points"> : </span>
                        <div className="col-6 col-sm-4 fw-md">
                            <span>{data.to}</span>
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
                    <div className="mb-2 row align-items-center">
                        <h1 className="title col-4 col-sm-1">Project</h1>
                        <span className="t-points"> : </span>
                        <div className="col-8">
                            {data.project ? (
                                <span className="text-decoration-underline fw-md">
                                    {data.project?.name}
                                </span>
                            ) : null}
                        </div>
                    </div>
                </div>

                <div className="subject mb-2 lh-base">{data.content}</div>
                <div className="matrials">
                    <p className="ms-5 text-decoration-underline fw-md">
                        MATERIALS :{" "}
                    </p>
                    <div className="table-responsive-sm">
                        <table className="table table-bordered border-primary mb-2">
                            <thead>
                                <tr className="fw-md">
                                    <th scope="col" className="fw-md fs-6">
                                        Description
                                    </th>
                                    <th scope="col" className="fw-md fs-6">
                                        Unit
                                    </th>
                                    <th scope="col" className="fw-md fs-6">
                                        Qty
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.attributes?.map((product, index) => {
                                    return (
                                        <tr key={product.id}>
                                            <td className="text-center fs-6">
                                                {product.name
                                                    ? product.name
                                                    : product.dis}
                                            </td>
                                            <td className="text-center fs-6">
                                                {product.unit}
                                            </td>
                                            <td className="text-center fs-6">
                                                {product.qty}
                                            </td>
                                        </tr>
                                    );
                                })}
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

                    <div className=" col-6 text-end">
                        {data.matrial_request_cycle?.map((data) => {
                            return (
                                <div key={data.id} className="col-2">
                                    {data.comment_matrial_cycle &&
                                    data.status == 1 ? (
                                        <div className="col-2">
                                            <img
                                                src={`/uploads/sign/${data.comment_matrial_cycle.user.sign}`}
                                                alt=""
                                                width="80"
                                            />
                                        </div>
                                    ) : null}

                                    {data.comment_matrial_cycle &&
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
    );
};

export default Preview;
