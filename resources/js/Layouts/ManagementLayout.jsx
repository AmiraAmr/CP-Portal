import { useState } from "react";
import Navbar from "@/Components/Navbar";
import { ConfigProvider } from "antd";

import "../../css/app.css";
import "../../css/antd.less";
import Footer from "./Footer";
import Sidebar from "../Components/Managers/Sidebar";

export default function ManagementLayout({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [showingSidebar, setShowingSidebar] = useState(false);
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#00b96b",
                },
            }}
        >
            <div className="flex flex-col flex-1 h-full">
                <div>
                    <Sidebar
                        setShowingSidebar={setShowingSidebar}
                        auth={auth}
                    />
                    <Navbar
                        auth={auth}
                        header={header}
                        showingSidebar={showingSidebar}
                        setShowingSidebar={setShowingSidebar}
                    />
                </div>
                <div className="lg:pl-[18.5rem] lg:pr-10 flex flex-col h-full">
                    <main className="bg-[#F4F3FB] rounded-3xl p-6 flex-1">
                        {children}
                    </main>
                    <Footer />
                </div>
            </div>
        </ConfigProvider>
    );
}
