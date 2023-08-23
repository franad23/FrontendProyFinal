import "./navbarladingpage.css";
import { Link } from "react-router-dom";
import { Dropdown } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

//Components
import Logo from "../../Logo/Logo.jsx";

function NavbarLadingPage() {
  const items = [
    {
      label: (
        <Link className="btnUserOptDropdownLadingPage" to="/register">
          Registrarse
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link className="btnUserOptDropdownLadingPage" to="/login">
          Iniciar Sesion
        </Link>
      ),
      key: "1",
    },
  ];
  return (
    <div className="navbarLandingPageMainContainer">
      <Logo />
      <div className="userOptionsContainer">
        <div className="showDropdownNavbar">
          <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
            
          >
            <FontAwesomeIcon icon={faBars} style={{ color: "#1f1f1f" }} />
          </Dropdown>
        </div>
        <Link className="btnUserOptLadingPage hideBtnNavBar" to="/register">
          Registrarse
        </Link>
        <Link className="btnUserOptLadingPage hideBtnNavBar" to="/login">
          Iniciar Sesion
        </Link>
      </div>
    </div>
  );
}

export default NavbarLadingPage;
