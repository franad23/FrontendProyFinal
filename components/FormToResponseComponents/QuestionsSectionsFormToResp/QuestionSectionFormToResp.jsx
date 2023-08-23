import './questionsectionsformtoresp.css'
import { useEffect, useState } from 'react';

//Components
import RadioBtnsFormToResp from '../RadioBtnsFormToResp/RadioBtnsFormToResp';
import CheckboxFormToResp from '../CheckBoxFormToResp/CheckboxFormToResp';
import FreeTextFormToResp from '../FreeTextFormToResp/FreeTextFormToResp';


function QuestionSectionFormToResp(props) {
  const [formObject, setFormObject] = useState(props.toHandleformObject);
  const [questionResponses, setQuestionResponses] = useState({
    id: props.toHandleformObject.id,
    questionTitle: props.toHandleformObject.questionTitle,
    answers: [],
    imageUrl: props.toHandleformObject.url,
    isRequire: props.toHandleformObject.isRequire
  });
  
  useEffect(() => {
    props.handleQuestionResponses(questionResponses)
  },[questionResponses, formObject])

  const handleInfoRadioBtn = (data) => {
    setQuestionResponses((prevResponses) => ({
      ...prevResponses,
      answers: [data],
    }));
  }

  const handleInfoFreeText = (data) => {
    setQuestionResponses((prevResponses) => ({
      ...prevResponses,
      answers: [data],
    }));
  }


  const handleInfoCheckbox = (data) => {
    setQuestionResponses((prevResponses) => ({
      ...prevResponses,
      answers: [data],
    }));
  }

  return (
    <div className='questSectFormToRespMainContainer'>
      <div className='HeaderquestSectFormToRespContainer'>
        <h1 className='titleSectionFormToResp'>{formObject.questionTitle}</h1>{formObject.isRequire ? <span className='spanRequire'>*</span> : null}
      </div>
      <div className='questSectFormToRespContainer'>
        {
          formObject.url != "" ? 
            <img className='imgContainerQuesToResp' src={formObject.url} alt="" />:null
        }
        {
          formObject.choice == "singleChoice" ? 
            <RadioBtnsFormToResp
              toHandleformObject={formObject.question}
              toHandleInfoRadioBtn = {(data) => handleInfoRadioBtn(data)}
            />:null
        }
        {
          formObject.choice == "multipleChoice" ? 
            <CheckboxFormToResp
              toHandleformObject={formObject.question}
              toHandleInfoCheckbox={(data) => handleInfoCheckbox(data)}
            />:null
        }
        {
          formObject.choice == "text" ? 
            <FreeTextFormToResp
              toHandleInfoFreeText = {(data) => handleInfoFreeText(data)}
            />:null
        }
      </div>
    </div>
  )
}

export default QuestionSectionFormToResp