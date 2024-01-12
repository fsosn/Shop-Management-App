import React, {useState} from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles.css";
import ProductTable from "../components/ProductTable";

const DashboardProducts = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="container-fluid">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
            <div className={`wrapper ${collapsed && "wrapper-max"}`}>
                <Header title="Products"/>
                <ProductTable/>
            </div>
        </div>
    );
};

export default DashboardProducts;
