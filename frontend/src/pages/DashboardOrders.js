import React, {useEffect, useState} from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles.css";
import {useThemeContext} from "../context/ThemeProvider";

const DashboardOrders = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {setCurrentTheme} = useThemeContext();

    return (
        <div className="container-fluid">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
            <div className={`wrapper ${collapsed && "wrapper-max"}`}>
                <Header title="Orders"/>
                <div className="dashboard"/>
            </div>
        </div>
    );
};

export default DashboardOrders;
