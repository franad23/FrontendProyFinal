import './cardsplanssections.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'

function CardsplansSection() {
  return (
    <div className='cardsPlansMainContainer'>
      <div className='cardPlanContainer'>
        <div className='headerplan headerPlanBasic'>
          <h1 className='titleCardPlan'>Plan Basico</h1>
        </div>
        <div className='optionsCardPlan'>
          <div className='optionsLabelPlan'>
            <FontAwesomeIcon icon={faCircleCheck} style={{color: "#4a9659",}} />
            <h1 className='titleLabelOptionsCards'>Hasta 5 encuestas activas a la vez.</h1>
          </div>
          <div className='optionsLabelPlan'>
            <FontAwesomeIcon icon={faCircleCheck} style={{color: "#4a9659",}} />
            <h1 className='titleLabelOptionsCards'>Acceso a plantillas predefinidas.</h1>
          </div>
          <div className='optionsLabelPlan'>
            <FontAwesomeIcon icon={faCircleCheck} style={{color: "#4a9659",}} />
            <h1 className='titleLabelOptionsCards'>Informes de resultados basicos.</h1>
          </div>
          <div className='optionsLabelPlan'>
            <FontAwesomeIcon icon={faCircleCheck} style={{color: "#4a9659",}} />
            <h1 className='titleLabelOptionsCards'>Soporte por correo electronico.</h1>
          </div>
        </div>
        <div className='priceSection'>
          <h1 className='priceCardPlan'>$9.99/mes</h1>
          <Link className='btnCardSectionPlan' to='/register'>Empezar</Link>
        </div>
      </div>
      <div className='cardPlanContainer'>
        <div className='headerplan headerPlanFull'>
          <h1 className='titleCardPlan'>Plan Full</h1>
        </div>
        <div className='optionsCardPlan'>
          <div className='optionsLabelPlan'>
            <FontAwesomeIcon icon={faCircleCheck} style={{color: "#4a9659",}} />
            <h1 className='titleLabelOptionsCards'>Hasta 15 encuestas activas a la vez.</h1>
          </div>
          <div className='optionsLabelPlan'>
            <FontAwesomeIcon icon={faCircleCheck} style={{color: "#4a9659",}} />
            <h1 className='titleLabelOptionsCards'>Personalización de colores y logo en las encuestas.</h1>
          </div>
          <div className='optionsLabelPlan'>
            <FontAwesomeIcon icon={faCircleCheck} style={{color: "#4a9659",}} />
            <h1 className='titleLabelOptionsCards'>Analítica de resultados básica.</h1>
          </div>
          <div className='optionsLabelPlan'>
            <FontAwesomeIcon icon={faCircleCheck} style={{color: "#4a9659",}} />
            <h1 className='titleLabelOptionsCards'>Soporte por correo electrónico y chat en vivo.</h1>
          </div>
        </div>
          <div className='priceSection'>
            <h1 className='priceCardPlan'> $19.99/mes</h1>
            <Link className='btnCardSectionPlanFull' to='/register'>Empezar</Link>
          </div>
      </div>
      <div className='cardPlanContainer'>
        <div className='headerplan headerPlanPremium'>
          <h1 className='titleCardPlan'>Plan Premium</h1>
        </div>
        <div className='optionsCardPlan'>
        <div className='optionsLabelPlan'>
            <FontAwesomeIcon icon={faCircleCheck} style={{color: "#4a9659",}} />
            <h1 className='titleLabelOptionsCards'>Encuestas ilimitadas.</h1>
          </div>
          <div className='optionsLabelPlan'>
            <FontAwesomeIcon icon={faCircleCheck} style={{color: "#4a9659",}} />
            <h1 className='titleLabelOptionsCards'>Personalización avanzada de la interfaz y diseño.</h1>
          </div>
          <div className='optionsLabelPlan'>
            <FontAwesomeIcon icon={faCircleCheck} style={{color: "#4a9659",}} />
            <h1 className='titleLabelOptionsCards'>Acceso a plantillas premium y personalizadas.</h1>
          </div>
          <div className='optionsLabelPlan'>
            <FontAwesomeIcon icon={faCircleCheck} style={{color: "#4a9659",}} />
            <h1 className='titleLabelOptionsCards'>Analítica detallada de resultados y segmentación de respuestas.</h1>
          </div>
          <div className='optionsLabelPlan'>
            <FontAwesomeIcon icon={faCircleCheck} style={{color: "#4a9659",}} />
            <h1 className='titleLabelOptionsCards'>Soporte prioritario 24/7.</h1>
          </div>
        </div>
        <div className='priceSection'>
          <h1 className='priceCardPlan'>$39.99/mes</h1>
          <Link className='btnCardSectionPlanPremium' to='/register'>Empezar</Link>
        </div>
      </div>
    </div>
  )
}

export default CardsplansSection