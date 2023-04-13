import ManagementLayout from "@/Layouts/ManagementLayout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ChartOne from "./ProjectTimesheet/ChartOne";
import ChartTwo from "./ProjectTimesheet/ChartTwo";
import ChartThree from "./ProjectTimesheet/ChartThree";
import ChartFour from "./ProjectTimesheet/ChartFour";
import ChartFive from "./ProjectTimesheet/ChartFive";
import ChartSix from "./ProjectTimesheet/ChartSix";

const ProjectTimesheet = () => {
    const [name, setName] = useState("");
    const [filter, setFilter] = useState({
        project_id: "",
    });

    const [projects, setProjects] = useState([]);

    const [data, setData] = useState({});

    useEffect(() => {
        axios
            .post("/managers/report/project_search", { project_name: name })
            .then((res) => {
                setProjects(res.data.data);
            });
    }, [name]);

    useEffect(() => {
        axios
            .post("/managers/report/project/jsonprojectReport", {
                project_id: filter.project_id,
            })
            .then((res) => {
                setData(res.data.data);
            });
    }, [filter.project_id]);
    return (
        <ManagementLayout>
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <span className="text-lg text-gray-700 font-semibold">
                        Analysis HR
                    </span>
                </div>
                <div className="mb-3 bg-white px-6 py-3 rounded-md">
                    <div className="grid md:grid-cols-3 gap-2 grid-cols-1">
                        <div className="relative">
                            <label
                                htmlFor="project"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Project
                            </label>
                            <input
                                id="project"
                                type="text"
                                className="border border-gray-300  text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                name="project"
                                placeholder="Project name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {projects.length > 0 ? (
                                <motion.div
                                    initial={{ y: "-19px" }}
                                    animate={{ y: "0" }}
                                    className="absolute w-full bg-white border mt-2 shadow-lg p-2 py-3 rounded-lg z-10"
                                >
                                    {projects?.map((project, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="text-sm cursor-pointer p-2 transition-all hover:bg-gray-100 rounded whitespace-nowrap overflow-hidden"
                                                style={{
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: "1",
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                }}
                                                onClick={() => {
                                                    setFilter((prev) => {
                                                        return {
                                                            ...prev,
                                                            project_id:
                                                                project.id,
                                                        };
                                                    });
                                                    setProjects([]);
                                                }}
                                            >
                                                {project.name}
                                            </div>
                                        );
                                    })}
                                </motion.div>
                            ) : null}
                        </div>
                    </div>
                </div>
                <div>
                    {data?.project_overall?.length > 0 ? (
                        <div className="flex flex-col gap-4">
                            <ChartOne data={data.project_overall} />
                            <ChartTwo data={data.project_overall} />
                            <div className="xl:grid-cols-2 grid-cols-1 grid gap-4">
                                <ChartThree data={data.project_overall} />
                                <ChartFour data={data.project_overall} />
                            </div>
                            <div className="xl:grid-cols-2 grid-cols-1 grid gap-4">
                                <ChartFive data={data.project_overall} />
                                <ChartSix data={data.project_overall} />
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </ManagementLayout>
    );
};

export default ProjectTimesheet;
