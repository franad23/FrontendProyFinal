import "./infosectionslandingpage.css";
import ImgFirstSection from "../../../assets/firstSectionLanding.svg";
import ImgSecondSection from "../../../assets/secondSectionLanding.svg";

function InfoSectionsLandingPage() {
  return (
    <div className="infoSectionsLandingMainContainer">
      <div className="firstInfoSection">
        <img src={ImgFirstSection} alt="" className="imgFirstSection" />
        <p className="infoParagraph">
          Echosurvey es tu aliado en la creación y gestión de encuestas y
          formularios de manera eficiente y personalizada. Nos especializamos en
          brindarte las herramientas necesarias para recopilar información
          valiosa de tus clientes, empleados o audiencia en general.
        </p>
      </div>
      <div className="firstInfoSection">
        <img src={ImgSecondSection} alt="" className="imgFirstSection" />
        <p className="infoParagraph">
          Simplifica tu proceso de recopilación de datos y lleva tus encuestas y
          formularios al siguiente nivel con Echosurvey. Tu camino hacia una
          toma de decisiones más informada y un mayor entendimiento de tu
          audiencia comienza aquí.
        </p>
      </div>
    </div>
  );
}

export default InfoSectionsLandingPage;
