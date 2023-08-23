import "./footerlandingpage.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "antd";

function FooterLandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="footerLadingPageMainContainer">
      <Modal
        title="Aviso Importante: Privacidad y Uso de Datos en Echosurvey"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)}>
            Cerrar
          </Button>,
        ]}
      >
        <div className="modalDisclaimer">
          <p>
            En Echosurvey, nos tomamos muy en serio la privacidad y la seguridad
            de tus datos. Queremos asegurarte que tu confianza es nuestra máxima
            prioridad, y nos comprometemos a proteger la información que
            compartes con nosotros a través de nuestra plataforma de
            formularios.
          </p>
          <ul>
            <li>
              <b>Compromiso con la Privacidad:</b>
              Nuestro compromiso principal es garantizar la privacidad y la
              confidencialidad de tus datos. Entendemos la importancia de tu
              información personal y la tratamos con el más alto nivel de
              seguridad y cuidado.
            </li>
            <li>
              <b>Uso Responsable de Datos:</b>
              Queremos dejarte claro que en Echosurvey no compartimos, vendemos
              ni alquilamos tus datos personales a terceros con fines
              comerciales, publicitarios o de cualquier otra índole. Los datos
              que proporcionas a través de nuestros formularios son utilizados
              exclusivamente para el propósito para el cual los proporcionaste.
            </li>
            <li>
              <b>Seguridad de la Información:</b>
              Implementamos medidas de seguridad avanzadas para proteger tus
              datos contra accesos no autorizados, divulgación, alteración o
              destrucción. Utilizamos tecnologías de encriptación y prácticas de
              seguridad robustas para mantener tu información a salvo.
            </li>
            <li>
              <b>Uso de Cookies:</b>
              Es posible que utilicemos cookies y tecnologías similares para
              mejorar tu experiencia en nuestra plataforma. Estas cookies nos
              ayudan a comprender cómo interactúas con nuestros servicios y a
              personalizar tu experiencia en función de tus preferencias.
            </li>
          </ul>
        </div>
      </Modal>
      <div className="infoFooterContainer">
        <button onClick={() => setIsModalOpen(true)} className="linksFooter btnfooter">Privacidad</button>
        <Link className="linksFooter" to='/error'>Nosotros</Link>
        <Link className="linksFooter" to='/register'>Registrarse</Link>
        <Link className="linksFooter" to='/login'>Iniciar sesion</Link>
      </div>
      <div className="iconFooterContainer">
        <h1 className="titleIconsFooter"> Buscanos!</h1>
        <div className="iconsFooter">
        <Link className="linksFooter" to='/error'><i className="bi bi-facebook"></i></Link>
        <Link className="linksFooter" to='/error'><i className="bi bi-instagram"></i></Link>
        <Link className="linksFooter" to='/error'><i className="bi bi-youtube"></i></Link>
        <Link className="linksFooter" to='/error'><i className="bi bi-github"></i></Link>
        </div>
      </div>
    </div>
  );
}

export default FooterLandingPage;
