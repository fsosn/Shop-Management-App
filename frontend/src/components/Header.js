import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleUser} from "@fortawesome/free-solid-svg-icons";
import "../styles.css";

const Header = ({title}) => {
    return (
        <div className="header bg-body">
            <h1 className="title-font title-dashboard">{title}</h1>
            <div className="user-info">
                <span className="account-name">{localStorage.getItem('userEmail')}</span>
                <FontAwesomeIcon icon={faCircleUser} className="icon user-icon"/>
            </div>
        </div>
    );
};

export default Header;
