import './buttonaddfirstsection.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus} from "@fortawesome/free-solid-svg-icons";


function ButtonAddFirstSection(props) {

  return (
    <div className='addFirstSectionMaincontainer'>
      <FontAwesomeIcon icon={faPlus} className='iconAddfirstSection' onClick={props.handleClickAddFirstSection}/>
    </div>
  )
}

export default ButtonAddFirstSection