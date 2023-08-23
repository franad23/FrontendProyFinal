import './addsectionbuildform.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useCallback  } from 'react'
import { Modal } from 'antd';

//Components
import InputText from '../inputText/InputText'
import CheckboxQuestion from '../CheckboxQuestion/CheckboxQuestion'
import RadioButtonsQuestions from '../RadioButtonQuestion/RadioButtonsQuestions'
import FooterSectionBF from '../FooterSectionBuildForm/FooterSectionBF';
import Uploadimg from '../Uploadimg/Uploadimg';

function Addsectionbuildform(props) {
  
  const data = props.handleData?? ""
  const urlImg = props.handleData?.url?? ""
  const radio = data?.choice == "singleChoice" ? props.handleData.question : null
  const checkbox = data?.choice == "multipleChoice" ? props.handleData.question : null
  
  
  const [typeForm, setTypeForm] = useState(props.handleTypeForm)
  const [radioOptions, setRadioOptions] = useState(radio?? {});
  const [checkboxOptions, setCheckboxOptions] = useState(checkbox?? {});
  const [titleQuestion, setTitleQuestion] = useState(props.handleData?.questionTitle ?? "");
  const [choice, setChoice] = useState(props.handleData?.choice ?? "singleChoice");
  const [isImg, setIsImg] = useState(urlImg != "" ? true : false);
  const [showQuesTable, setShowQuesTable] = useState(false);
  const [url, setUrl] = useState(urlImg || "");
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [require, setRequire] = useState(null);



  const handleCheckboxOptions = useCallback((options) => {
    setCheckboxOptions(options);
  }, []);

  useEffect (() => {
    props.tohandleFinal(finalQuestion)
  }, [radioOptions, checkboxOptions, titleQuestion, choice, url, isImg, require])

  const finalQuestion = {
    id: props.id,
    questionTitle: titleQuestion,
    choice: choice,
    url,
    isRequire: require
  }
  if (finalQuestion.choice == "singleChoice") {
    finalQuestion.question = radioOptions;
  }
  else if (finalQuestion.choice == "multipleChoice") {
    finalQuestion.question = checkboxOptions;
  }
  else if (finalQuestion.choice == "text") {
    finalQuestion.question = "FreeText";
  }
  else if (isImg) {
    finalQuestion.url = url;
  }
  const handleMouseEnter = () => {
    setShowQuesTable(true);
  };

  const handleMouseLeave = () => {
    setShowQuesTable(false);
  };

  const handleDeleteImg = () => {
    setModalText(``);
    setOpen(true)
  }
  
  const handleDeleteImgConfirm = () => {
    setModalText(`Eliminado imagen...`);
    setConfirmLoading(true);
    setTimeout(() => {
      setUrl("");
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };
  
  return (
    
    <div className='addsectionbuildMainSection' 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Modal
        title="Seguro de eliminar imagen?"
        open={open}
        onOk={handleDeleteImgConfirm}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
      >
        <p>{modalText}</p>
      </Modal>
      <div className='headerAddSectionForm'>
        <InputText
          textSize="1.5rem"
          placeholder="Pregunta"
          maxlength={100}
          row={1}
          showIcons={true}
          tohandle={(data) => setTitleQuestion(data)}
          value={titleQuestion}
        />
      </div>
      <div className='questionsAddSectionFormContainer'>
        <div className={isImg ? "showSectionImgUrl" : "notShowOption"}>
          <div className={url != '' ? 'imgUrlContainer' : "notShowOption"}>
          <FontAwesomeIcon icon={faTrashCan} className='iconDeleteImg' onClick={handleDeleteImg}/>
            <img src={url} alt="" />
          </div>
          <Uploadimg
            toHandleUrlImg={(data) => setUrl(data)}
          />
        </div>
        <div className={choice == "singleChoice" ? "showSection" : "notShowOption"}>
          <RadioButtonsQuestions
            toHandleRadioOptions={(data) => setRadioOptions(data)}
            handleData = {radioOptions}
            handleTypeForm = {typeForm}
            />
        </div>
        <div className={choice == "multipleChoice" ? "showSection" : "notShowOption"}>
          <CheckboxQuestion 
            toHandleCheckboxOptions={handleCheckboxOptions}
            handleData = {checkboxOptions}
            handleTypeForm = {typeForm}
          />
        </div>
        {
          typeForm == "formulario" ? 
          <div className={choice == "text" ? "showSection" : "notShowOption"}>
          <InputText 
            textSize="1rem"
            placeholder="Responderan Aqui"
            maxlength={1000}
            row={1}
            showIcons={false}
            handleDisable={true}
          />
        </div> : null
        }
      </div>
      <div className='footerSection'>
        <FooterSectionBF 
          toHandleChoice={(data) => setChoice(data)} 
          toHandleShowQuesTable={showQuesTable}
          toHandleAddSection={props.toHandleAddSection}
          toHandleDeleteSection={() => props.toHandleDeleteSection(props.id)}
          toHandleClickImg={() => setIsImg(true)}
          toHandleSwitchState={(data) => setRequire(data)}
          isDisabled={false}
          isDefaultChecked={props.handleData?.isRequire ?? false}
          showTrash={true}
          handleTypeForm = {typeForm}
        />
      </div>
    </div>
  )
}

export default Addsectionbuildform