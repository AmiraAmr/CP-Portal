import React, { useEffect, useRef, useState } from "react";
import "../../../../css/invoice/bootstrap.min.css";
import "../../../../css/invoice/style.css";
import "../../../../css/invoice/print2.css";
import QRCode from "qrcode.react";
const Preview = ({ data }) => {
    return (
        <div>
            <button class="btn btn-light" v-print="'#printMe'">
                Print{" "}
            </button>

            <div class="container" id="printMe">
                <header dir="ltr">
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
                        <h1 class="title col-6 col-sm-1">التاريخ</h1>
                        <span class="t-points"> : </span>
                        <div class="col-6 col-sm-4">{data.date}</div>
                    </div>
                    <div class="mb-3 row align-items-center">
                        <h1 class="title col-4 col-sm-1">عدد العمال</h1>
                        <span class="t-points"> : </span>
                        <div class="col-6 col-sm-4 fw-md">
                            <span>{data.number_of_staff}</span>
                        </div>
                    </div>

                    <div class="mb-3 row align-items-center">
                        <h1 class="title col-4 col-sm-1"> مكان العمل </h1>
                        <span class="t-points"> : </span>
                        <div class="col-6 col-sm-4 fw-md">
                            <span>{data.workplace}</span>
                        </div>
                    </div>

                    <div class="mb-3 row align-items-center">
                        <h1 class="title col-4 col-sm-1"> مشرف العمل </h1>
                        <span class="t-points"> : </span>
                        <div class="col-6 col-sm-4 fw-md">
                            <span>{data.supervisor.name}</span>
                        </div>
                    </div>

                    <div class="mb-2 row align-items-center">
                        <h1 class="title col-4 col-sm-1">نطاق العمل </h1>
                        <span class="t-points"> : </span>

                        <div class="col-8">
                            <span class="text-decoration-underline fw-md">
                                {data.The_scope_of_work}
                            </span>
                        </div>
                    </div>
                    <div class="mb-2 row align-items-center">
                        <h1 class="title col-4 col-sm-1">المشروع</h1>
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

                <div class="matrials">
                    <p class="ms-5 text-decoration-underline fw-md">
                        {" "}
                        :الانتجايه اليوميه{" "}
                    </p>
                    <div class="table-responsive-sm">
                        <table class="table table-bordered border-primary mb-2">
                            <thead>
                                <tr class="fw-md">
                                    <th scope="col" class="fw-md fs-6">
                                        م
                                    </th>
                                    <th scope="col" class="fw-md fs-6">
                                        بيان
                                    </th>
                                    <th scope="col" class="fw-md fs-6">
                                        العدد
                                    </th>
                                    <th scope="col" class="fw-md fs-6">
                                        الوحده
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.daily_productivity.map(
                                    (product, index) => {
                                        return (
                                            <tr key={product.id}>
                                                <td class="text-center fs-6">
                                                    {index + 1}
                                                </td>
                                                <td class="text-center fs-6">
                                                    {product.item}
                                                </td>
                                                <td class="text-center fs-6">
                                                    {product.quantity}
                                                </td>
                                                <td class="text-center fs-6">
                                                    {product.unit}
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="matrials">
                    <p class="ms-5 text-decoration-underline fw-md">
                        {" "}
                        : العماله{" "}
                    </p>
                    <div class="table-responsive-sm">
                        <table class="table table-bordered border-primary mb-2">
                            <thead>
                                <tr class="fw-md">
                                    <th scope="col" class="fw-md fs-6">
                                        م
                                    </th>
                                    <th scope="col" class="fw-md fs-6">
                                        الاسم
                                    </th>
                                    <th scope="col" class="fw-md fs-6">
                                        الالتزام
                                    </th>
                                    <th scope="col" class="fw-md fs-6">
                                        الاداء
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.users.map((user, index) => {
                                    return (
                                        <tr key={user.id}>
                                            <td class="text-center fs-6">
                                                {index + 1}
                                            </td>
                                            <td class="text-center fs-6">
                                                {user.name}
                                            </td>
                                            <td class="text-center fs-6">
                                                {user.pivot.commitment}
                                            </td>
                                            <td class="text-center fs-6">
                                                {user.pivot.performance}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="matrials">
                    <div class="table-responsive-sm">
                        <table class="table table-bordered border-primary mb-2">
                            <thead>
                                <tr class="fw-md">
                                    <th scope="col" class="fw-md fs-6">
                                        ملاحظات و اقترحات و مشاكل
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="text-center fs-6">
                                        {data.note}
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
                    <div key="data.id" class="col-2">
                        <template v-if="data.status == 1">
                            {data.status == 1 ? (
                                <div class="col-2">
                                    <img
                                        src={`/uploads/sign/${sign.sign}`}
                                        alt=""
                                        width="80"
                                    />
                                </div>
                            ) : null}
                        </template>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preview;
