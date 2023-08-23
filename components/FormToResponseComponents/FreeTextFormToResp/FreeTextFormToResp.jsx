import './freetextformtoresp.css'

//Components
import InputText from '../../inputText/InputText'

function FreeTextFormToResp(props) {
  return (
    <div className='freeTextFormMainContainer'>
      <InputText
          textSize="1rem"
          placeholder="Responder"
          maxlength={1000}
          row={1}
          showIcons={false}
          tohandle={(data) => props.toHandleInfoFreeText(data)}
        />
    </div>
  )
}

export default FreeTextFormToResp