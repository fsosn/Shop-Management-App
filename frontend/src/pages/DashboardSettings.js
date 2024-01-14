import React, {useState} from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Settings from "../components/Settings";
import "../styles.css";
import {useTranslation} from "react-i18next";

const DashboardSettings = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {t} = useTranslation();

    return (
        <div className="container-fluid">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed}/>
            <div className={`wrapper ${collapsed && "wrapper-max"}`}>
                <Header title={t('settings')}/>
                <Settings/>
            </div>
        </div>
    );
};

export default DashboardSettings;
