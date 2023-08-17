import './footersectionbf.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash} from "@fortawesome/free-solid-svg-icons";
import { Switch } from 'antd';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useEffect, useState } from 'react';

//Components
import OptionsQuestTable from '../OptionsQuestTable/OptionsQuestTable';

function FooterSectionBF(props) {
  const [typeForm, setTypeForm] = useState(props.handleTypeForm);
  const [showQuesTable, setShowQuesTable] = useState(props.toHandleShowQuesTable);
  const [switchState, setSwitchState] = useState(props.isDefaultChecked );
  
  useEffect(() => {
    setShowQuesTable(props.toHandleShowQuesTable);
    props.toHandleSwitchState(switchState);
  }, [props.toHandleShowQuesTable, switchState]);

  const handleChoice = (choice) => {
    props.toHandleChoice(choice);
  } 

  const handleChangeSwitch = () => {
    setSwitchState(!switchState);
  };
  return (
    <div className={showQuesTable? 'footsectionMainContainer' : "withoutQuesTable"}>
      <div className={showQuesTable ? "" : "notShowQuestTableFooter"}>
        <OptionsQuestTable
          toHandleChoice={handleChoice}
          toHandleAddSection={props.toHandleAddSection}
          toHandleClickImg = {props.toHandleClickImg}
          handleTypeForm = {typeForm}
        />
      </div>
      <div className='obligatorioContainer'>
        {
          props.showTrash ?  
            <OverlayTrigger
            placement="top"
            delay={{ show: 150, hide: 150 }}
            overlay={<Tooltip className="tooltip" id="button-tooltip">Eliminar</Tooltip>}
            >
              <FontAwesomeIcon icon={faTrash} className='iconsFooter' onClick={props.toHandleDeleteSection}/>
            </OverlayTrigger>
            : ""
        }
        <OverlayTrigger
          placement="top"
          delay={{ show: 150, hide: 150 }}
          overlay={<Tooltip className="tooltip" id="button-tooltip">Campo Obligatorio</Tooltip>}
        >
          <Switch 
            onChange={handleChangeSwitch} 
            disabled={props.isDisabled} 
            defaultChecked={switchState}
          />
        </OverlayTrigger>
        
      </div>
    </div>
  )
}

export default FooterSectionBF