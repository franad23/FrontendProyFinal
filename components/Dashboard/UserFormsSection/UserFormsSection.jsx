import './userformsection.css'
import { useState } from 'react';
import imgNotFoundForms from '../../../assets/notFoundForms.png'

//Components
import CardsUserForm from '../CardsUserForm/CardsUserForm';

function UserFormsSection(props) {
  const [infoToCards, setInfoToCards] = useState(props.handleData);
  
  return (
    <div className='userFormSectionMainContainer'>

        <div className='userFormsContainer'>
          <div className='headerCards'>
            <h1 className='titleHeaderCards'>Tus Formularios</h1>
          </div>
          <div className='cardsContainer'>
          {
            infoToCards.length === 0 ? (
              <p className='txtFormsNotFound'> <img src={imgNotFoundForms} alt="imgNotFound" className='svgNotFound'/> No se encontraron formularios.</p>
            ) : (
              infoToCards.map((card) => (
              <CardsUserForm
                key={card._id}
                handleData={card}
                tohandleLoading={props.tohandleLoading}
              />
              ))
            )
          }
          </div>
        </div>
      </div>

  )
}

export default UserFormsSection