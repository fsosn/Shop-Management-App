import React, {useEffect, useState} from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../styles.css";
import ProductTable from "../components/ProductTable";
import {useTranslation} from 'react-i18next';

const DashboardProducts = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {t} = useTranslation();

    return (
        <div className="container-fluid">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
            <div className={`wrapper ${collapsed && "wrapper-max"}`}>
                <Header title={t('products')}/>
                <ProductTable/>
            </div>
        </div>
    );
};

export default DashboardProducts;
