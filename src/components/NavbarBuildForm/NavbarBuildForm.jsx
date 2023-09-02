import "./navbarbuildform.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHouse,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Modal, Button } from "antd";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate  } from 'react-router-dom';

//Components
import InputText from "../inputText/InputText";
import UserDrawer from "../UserDrawer/UserDrawer";

function NavbarBuildForm(props) {
  const { id } = useParams();
  const [showLink, setShowLink] = useState(
    !(id === "encuesta" || id === "formulario" || id === "evaluacion")
  );
  const [isModalOpenLink, setIsModalOpenLink] = useState(false);

  const handleClickCopyLink = () => {
    const linkToCopy = `https://echosurvey.vercel.app/final-form/${id}/`;
    navigator.clipboard.writeText(linkToCopy);
    setIsModalOpenLink(false);
    toast.success("Link copiado!");
  };
  const [userDrawer, setUserDrawer] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <UserDrawer
        openUserDrawer={userDrawer}
      />
      <Modal
        title="Enlace de formulario"
        open={isModalOpenLink}
        onCancel={() => setIsModalOpenLink(false)}
        footer={[
          <Button key="submit" type="primary" onClick={handleClickCopyLink}>
            Copiar
          </Button>,
          <Button key="back" onClick={() => setIsModalOpenLink(false)}>
            Salir
          </Button>,
        ]}
      >
        <InputText
          readOnlyInput={true}
          textSize="0.9rem"
          placeholder="Link"
          maxlength={100}
          row={1}
          showIcons={false}
          value={`https://echosurvey.vercel.app/final-form/${id}/`}
        />
      </Modal>
      <div className="navbarBuildFormMainContainer">
      <FontAwesomeIcon icon={faHouse} className='iconsNavbar' onClick={() => navigate(`/userdashboard`)}/>
        <div className="iconsUser">
          <button className="enviarFormBtn" onClick={props.toHandleSendForm}>
            Guardar
          </button>
          <FontAwesomeIcon
            icon={faLink}
            className={showLink ? "iconsNavbar" : "notShowLink"}
            onClick={() => setIsModalOpenLink(true)}
          />
          <FontAwesomeIcon icon={faUser} className='iconsNavbar' onClick={() => setUserDrawer(true)}/>
        </div>
      </div>
    </div>
  );
}

export default NavbarBuildForm;
