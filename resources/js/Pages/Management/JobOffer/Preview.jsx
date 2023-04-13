import React, { useEffect, useRef, useState } from "react";
import "../../../../css/invoice/bootstrap.min.css";
import "../../../../css/invoice/style.css";
import "../../../../css/invoice/print2.css";
import QRCode from "qrcode.react";
const Preview = ({ dataFromController, route }) => {
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

                    <div class="mb-2 row align-items-center">
                        <h1 class="title col-6 col-sm-1">Career Section</h1>

                        <span class="t-points"> : </span>
                        <div class="col-6 col-sm-4">{data.subject}</div>
                    </div>

                    <div class="mb-3 row align-items-center">
                        <h1 class="title col-6 col-sm-1">Dear Mr</h1>
                        <span class="t-points"> : </span>
                        <div class="col-6 col-sm-4">{data.name}</div>
                    </div>

                    <div class="mb-3 row align-items-center">
                        <h1 class="title col-6 col-sm-1">work location</h1>
                        <span class="t-points"> : </span>
                        <div class="col-6 col-sm-4">{data.work_location}</div>
                    </div>
                    <div class="mb-3 row align-items-center">
                        <h1 class="title col-6 col-sm-1">contract type</h1>
                        <span class="t-points"> : </span>
                        <div class="col-6 col-sm-4">{data.contract_type}</div>
                    </div>
                </div>

                <div class="subject mb-2 lh-base">{data.content}</div>

                <div class="matrials">
                    <p class="ms-5 text-decoration-underline fw-md">
                        Salary & Benefits Details as the following: :{" "}
                    </p>

                    <ul>
                        {data.benefits?.map((benefits, index) => {
                            return index <= 3 ? (
                                <li key={benefits.id}>
                                    {benefits.item} : {benefits.value}
                                </li>
                            ) : null;
                        })}

                        <li>salary package : {data.salary}</li>
                    </ul>

                    <ol>
                        {data.benefits?.map((benefits, index) => {
                            return index >= 3 ? (
                                <li key={benefits.id}>
                                    {benefits.item} : {benefits.value}
                                </li>
                            ) : null;
                        })}
                    </ol>
                </div>

                <div class="matrials">
                    <p class="ms-5 text-decoration-underline fw-md">
                        conditions :{" "}
                    </p>

                    <ol>
                        {data.condition?.map((condition) => {
                            return <li key={condition.id}>{condition.item}</li>;
                        })}
                    </ol>
                </div>

                <div class="subject mb-2 lh-base">
                    We are looking forward to you joining the company’s team and
                    receiving your acceptance of this offer and we wish you all
                    success
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
                    <div class="col-6">
                        {data.status == 1 ? (
                            <div class="col-6">
                                <img
                                    src="/signature/signature.jpg"
                                    alt=""
                                    width="200"
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preview;
