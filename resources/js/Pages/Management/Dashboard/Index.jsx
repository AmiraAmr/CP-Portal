import ManagementLayout from "@/Layouts/ManagementLayout";
import { Head } from "@inertiajs/react";
import ConstructionDepartment from "./Partials/ConstructionDepartment";
import Marketing from "./Partials/Marketing";
import Procurement from "./Partials/Procurement";
import Tender from "./Partials/Tender";
import axios from "axios";
import CashIn from "./Partials/CashIn";
import CashOut from "./Partials/CashOut";
import ManpowerPerformance from "./Partials/ManpowerPerformance";
import ManpowerCommitment from "./Partials/ManpowerCommitment";
import Company from "./Partials/Company";
import Hr from "./Partials/HR";
import Accounting from "./Partials/Accounting";

export default function Dashboard(props) {

    // axios.post("/managers/report/performance/json").then((res) => console.log("performance", res.data))
    // axios.post("/managers/report/commitment/json").then((res) => console.log("commitment", res.data))
    axios.post("/managers/report/cash_in/json").then((res) => console.log("Cash in", res.data))
    // axios.post("/managers/report/cash_out/json").then((res) => console.log("cash_out", res.data.data))
    // axios.post("/managers/report/company/json").then((res) => console.log("company", res.data))
    return (
        <ManagementLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-bold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-12 gap-12">
                    <RenderContainer title={"Construction Department"} component={<ConstructionDepartment projects={props.projects}/>} />
                    <RenderContainer title={"Tender Department"} component={<Tender />} />
                    <RenderContainer title={"Marketing Department"} component={<Marketing />} />
                    <RenderContainer title={"Procurement Department"} component={<Procurement />} />
                    <RenderContainer title={"Accounting Department"} component={<Accounting />} />
                    <RenderContainer title={"HR Department"} component={<Hr />} />
                    <RenderContainer title={"Manpower Performance"} component={<ManpowerPerformance />} />
                    <RenderContainer title={"Manpower Commitment"} component={<ManpowerCommitment />} />
                    <RenderContainer title={"Cash in KPI"} component={<Tender />} />
                    <RenderContainer title={"Cash out KPI"} component={<CashOut />} />
                    <RenderContainer customStyle={"!col-span-12"} title={"Overall KPI"} component={<Company />} />
                </div>
            </div>
        </ManagementLayout>
    );
}

const RenderContainer = ({ title, component, customStyle }) => {
    return (
        <div className={`${customStyle} md:col-span-6 col-span-12 bg-[#FFF] py-4 px-6 rounded-3xl`}>
            <div className="flex flex-col gap-5">
                <div className="text-lg text-center pt-3 font-semibold">
                    {title}
                </div>
                {component}
            </div>
        </div>
    )
}
