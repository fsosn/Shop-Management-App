import React, {useState} from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles.css";

const DashboardOrders = () => {
    const [collapsed, setCollapsed] = useState(false);

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
