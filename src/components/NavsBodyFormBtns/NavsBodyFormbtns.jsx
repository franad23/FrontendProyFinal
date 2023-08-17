import './navsbodyformbtns.css'
import { useState } from 'react'

function NavsBodyFormbtns(props) {
  
  const [selectOptionToShow, setSelectOptionToShow] = useState("questions");

  const handleSelectOptionToShow = (option) => {
    setSelectOptionToShow(option);
    props.toHandleSelectOptiontoShow(option);
  }

  return (
    <div className='navsBtnsMainContainer'>
      <div className='btnsNavsContainer'>
        <button 
          className={selectOptionToShow ==  "questions"?"btnsNavBarSelected":'btnsNavBar'} 
          onClick={() => handleSelectOptionToShow("questions")}>Preguntas</button>
        <button 
          className={selectOptionToShow ==  "answers" ? "btnsNavBarSelected":'btnsNavBar'} 
          onClick={() => handleSelectOptionToShow("answers")}>Respuestas</button>
      </div>
    </div>
  )
}

export default NavsBodyFormbtns