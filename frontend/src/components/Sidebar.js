import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useTranslation} from 'react-i18next';
import {
    faBars,
    faBox,
    faTags,
    faCog,
    faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({collapsed, setCollapsed}) => {
    const {t} = useTranslation();

    return (
        <div className="sidebar">
            <div className="logo-container" onClick={() => setCollapsed(!collapsed)}>
                <FontAwesomeIcon icon={faBars} className="toggle-icon"/>
                <h1 className="company-name">Salesman</h1>
            </div>

            {/*<div className="menu-item" onClick={() => window.location.href = "/orders"}>*/}
            {/*    <FontAwesomeIcon icon={faBox} className="menu-item-icon"/>*/}
            {/*    <span className="menu-link">{t('orders')}</span>*/}
            {/*</div>*/}

            <div className="menu-item" onClick={() => window.location.href = "/products"}>
                <FontAwesomeIcon icon={faTags} className="menu-item-icon"/>
                <span className="menu-link">{t('products')}</span>
            </div>

            <div className="menu-item" onClick={() => window.location.href = "/settings"}>
                <FontAwesomeIcon icon={faCog} className="menu-item-icon"/>
                <span className="menu-link">{t('settings')}</span>
            </div>
            <div className="spacer-logout"></div>
            <div className="menu-item" onClick={() => window.location.href = "/logout"}>
                <FontAwesomeIcon icon={faSignOutAlt} className="menu-item-icon"/>
                <span className="menu-link">{t('logout')}</span>
            </div>
        </div>
    );
};

export default Sidebar;
