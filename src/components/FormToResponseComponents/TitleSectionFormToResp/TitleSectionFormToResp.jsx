import { useState } from 'react'
import './titlesectionformtoresp.css'

function TitleSectionFormToResp(props) {
  const [formObject, setFormObject] = useState(props.toHandleformObject);

  return (
    <div className='titleSectionFormToRespMainContainer'>
      <div className='headerFormToRespContainer'>
        <h1 className='titleFormToResp'>{formObject.titleForm.mainTitle}</h1>
        <p className='descriptionFormToResp'>{formObject.titleForm.mainDescription}</p>
      </div>
      <div className='footerTitleSectionFormToResp'>
        <span className='spanTitleSectionFooter'>*Secciones Obligatorias</span>
      </div>
    </div>
  )
}

export default TitleSectionFormToResp