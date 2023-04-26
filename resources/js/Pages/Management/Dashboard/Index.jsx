import ManagementLayout from "@/Layouts/ManagementLayout";
import { Head, Link } from "@inertiajs/react";
import { Space, Table, Tag } from "antd";
import ConstructionDepartment from "./Partials/ConstructionDepartment";
import Marketing from "./Partials/Marketing";
import Procurement from "./Partials/Procurement";
import Statistics from "./Partials/Statistics";
import Tender from "./Partials/Tender";
import axios from "axios";

export default function Dashboard(props) {
    axios.get("/managers/reports/performance/json").then((res) => console.log("res", res))
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
                    <RenderContainer title={"Accounting Department"} component={<Tender />} />
                    <RenderContainer title={"HR Department"} component={<Tender />} />
                    <RenderContainer title={"Manpower Performance"} component={<Tender />} />
                    <RenderContainer title={"Manpower Commitment"} component={<Tender />} />
                    <RenderContainer title={"Cash in KPI"} component={<Tender />} />
                    <RenderContainer title={"Cash out KPI"} component={<Tender />} />
                    <RenderContainer customStyle={"!col-span-12"} title={"Overall KPI"} component={<Tender />} />
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
