import React, {useEffect, useState} from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Settings from "../components/Settings";
import "../styles.css";
import {useThemeContext} from "../context/ThemeProvider";

const DashboardSettings = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="container-fluid">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
            <div className={`wrapper ${collapsed && "wrapper-max"}`}>
                <Header title="Settings"/>
                <Settings/>
            </div>
        </div>
    );
};

export default DashboardSettings;
