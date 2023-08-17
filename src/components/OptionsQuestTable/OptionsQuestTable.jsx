import './optionsquesttable.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faListCheck,
  faAlignLeft,
  faImage,
  faSquarePlus
} from "@fortawesome/free-solid-svg-icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useState } from 'react';


function OptionsQuestTable (props) {
  const [typeForm, setTypeForm] = useState(props.handleTypeForm);
  const [choiceOpt, setChoiceOpt] = useState("");

  const handleClick = (choice) => {
    setChoiceOpt(choice)
    props.toHandleChoice(choice);
  } 
  const handleClickImg = (imgChoice) => {
    props.toHandleClickImg(imgChoice);
  }
  return (
    <div className='optionsQuestMainContainer'>
        <OverlayTrigger
          placement="top"
          delay={{ show: 150, hide: 150 }}
          overlay={<Tooltip className="tooltip" id="button-tooltip">Unica respuesta</Tooltip>}
        > 
          <FontAwesomeIcon className='iconOptionsQuest' icon={faCheck} onClick={() => handleClick("singleChoice")}/>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          delay={{ show: 150, hide: 150 }}
          overlay={<Tooltip className="tooltip" id="button-tooltip">Varias respuestas</Tooltip>}
        >
          <FontAwesomeIcon className='iconOptionsQuest' icon={faListCheck} onClick={() => handleClick("multipleChoice")}/>
        </OverlayTrigger>
        {
          typeForm == "formulario" ?  
            <OverlayTrigger
              placement="top"
              delay={{ show: 150, hide: 150 }}
              overlay={<Tooltip className="tooltip" id="button-tooltip">Texto libre</Tooltip>}
            >
              <FontAwesomeIcon className='iconOptionsQuest' icon={faAlignLeft} onClick={() => handleClick("text")}/>
            </OverlayTrigger> : null
        }
        <OverlayTrigger
          placement="top"
          delay={{ show: 150, hide: 150 }}
          overlay={<Tooltip className="tooltip" id="button-tooltip">Añadir imagen</Tooltip>}
        >
          <FontAwesomeIcon icon={faImage} className="iconOptionsQuest" onClick={() => handleClickImg("image")}/>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          delay={{ show: 150, hide: 150 }}
          overlay={<Tooltip className="tooltip" id="button-tooltip">Añadir Seccion</Tooltip>}
        >
          <FontAwesomeIcon icon={faSquarePlus} className='iconOptionsQuest' onClick={props.toHandleAddSection}/>
        </OverlayTrigger>
    </div>
  )
}

export default OptionsQuestTable