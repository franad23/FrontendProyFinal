import { useEffect, useState } from 'react';
import './bodybuildform.css';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from 'antd';


//Components
import Addsectionbuildform from '../AddSectionBuildform/Addsectionbuildform'
import AddTitleSection from '../AddTitleBuildFormSection/AddTitleSection'
import ButtonAddFirstSection from '../ButtonAddFirstSection/ButtonAddFirstSection';
import AddIdentifySection from '../AddIdentifySection/AddIdentifySection';
import NavsBodyFormbtns from '../NavsBodyFormBtns/NavsBodyFormbtns';
import BodyResponsesForm from '../SectionResponses/BodyResponsesForm/BodyResponsesForm'


function BodyBuildForm(props) {
  const dataForm = props.handleData ?? "";
  const dataFormQuest = props.handleData?.questionsForm ?? "";

  const [sectionToShow, setSectionToShow] = useState(""); 
  const [questions, setQuestions] = useState(dataFormQuest || "");
  const [mainTitleForm, setMainTitleForm] = useState({});
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState("");
  const [typeIdentify, setTypeIdentify] = useState(null);
  const [typeForm, setTypeForm] = useState(props.handletypeForm || dataForm.typeForm || null);
  const [selectOptionToShow, setSelectOptionToShow] = useState("questions");

    const finalForm = {
      titleForm: mainTitleForm,
      typeIdentify: typeIdentify,
      questionsForm: questions,
      typeForm: typeForm,
      urlImgPort:""
    }

  useEffect(() => {
    props.toHandleFinalForm(finalForm);
  }, [mainTitleForm, questions, typeIdentify])

  const handleFinalQuestion = (data) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((ques) => (ques.id === data.id ? data : ques))
    );
  };

  const handleAddSection = () => {
    const newQuestion = {
      id: uuidv4()
    };
    setQuestions([...questions, newQuestion]);
  }

  const handleOpenModal = (data) => {
    setQuestionToDelete(data);
    const questTitle = (questions.find((ques) => ques.id == data)).questionTitle;
    setModalText(`seguro de eliminar pregunta ${questTitle}?`);
    setOpen(true)
  }

  const handleDeleteSection = () => {
    setModalText(`Eliminado pregunta...`);
    setConfirmLoading(true);
    setQuestions(questions.filter((ques) => ques.id !== questionToDelete));
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleSelectOption = (data) => {
    setSelectOptionToShow(data);
  }
  return (
    <div className='bodyBuildFormMainContainer'>
      <Modal title="Unica pregunta" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
        <p>Recomendamos no eliminar la ultima pregunta</p>
      </Modal>
      <Modal
        title="Eliminar Pregunta"
        open={open}
        onOk={handleDeleteSection}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
        >
        <p>{modalText}</p>
      </Modal>
      <div className='bodybuildContainer'>
        <NavsBodyFormbtns
        toHandleSelectOptiontoShow = {handleSelectOption}
        />
        {selectOptionToShow == "answers" ? 
          <BodyResponsesForm/> :
          <div>
            <AddTitleSection
              toHandleMainTitle={(data) => setMainTitleForm(data)}
              //
                handleData = {dataForm.titleForm}
              //
              />
            {
              typeForm == "encuesta" ? null :
              <AddIdentifySection
                toHandleTypeIdentify={(data) => setTypeIdentify(data)}
                //
                handleData = {dataForm.typeIdentify}
                //
              />
            }
            {
              questions.length === 0 ? 
              <ButtonAddFirstSection
              handleClickAddFirstSection={handleAddSection}
              /> : 
              questions.map((ques) => (
                <Addsectionbuildform 
                key={ques.id} 
                toHandleAddSection={handleAddSection}
                tohandleFinal={handleFinalQuestion}
                id={ques.id}
                toHandleDeleteSection={(data) => handleOpenModal(data)}
                handleData = {ques}
                handleTypeForm = {typeForm}
                />
              ))
            }
          </div>
        }
        
      </div>
    </div>
  )
}

export default BodyBuildForm
