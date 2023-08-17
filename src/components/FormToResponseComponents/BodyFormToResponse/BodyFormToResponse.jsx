import { useState, useEffect } from "react";
import "./bodyformtoresponse.css";

//Components
import IdentifyFormToResp from "../IdentifyFormToResp/IdentifyFormToResp";
import QuestionSectionFormToResp from "../QuestionsSectionsFormToResp/QuestionSectionFormToResp";
import TitleSectionFormToResp from "../TitleSectionFormToResp/TitleSectionFormToResp";

function BodyFormToResponse(props) {
  const [objectForm, setObjectForm] = useState(props.toHandleformObject);
  const questions = objectForm.questionsForm;
  const initialUserAnswers = objectForm.questionsForm.map((question) => ({
    id: question.id,
    questionTitle: question.questionTitle,
    answers: [],
    imageUrl: question.url,
    isRequire: question.isRequire,
  }));
  const [userAnswers, setUserAnswers] = useState(initialUserAnswers);
  const [formRespToSend, setFormRespToSend] = useState({
    formId: objectForm._id,
    userId: objectForm.userId,
    titleForm: objectForm.titleForm,
    typeForm: objectForm.typeForm,
    identify: null,
    userAnswers: userAnswers,
    typeIdentify: objectForm.typeIdentify,
  });

  useEffect(() => {
    setFormRespToSend((prevFormResp) => ({
      ...prevFormResp,
      userAnswers: userAnswers,
    }));
  }, [userAnswers]);

  const handleIdentify = (data) => {
    setFormRespToSend((prevFormResp) => ({
      ...prevFormResp,
      identify: data,
    }));
  };

  const handleQuestionResponses = (data) => {
    const filteredAnswers = userAnswers.filter(
      (answer) => answer.questionTitle !== data.questionTitle
    );
    setUserAnswers([...filteredAnswers, data]);
  };

  return (
    <div className="bodyFormToResponseMainContainer">
      <div className="bodyFormToRespContainer">
        <TitleSectionFormToResp toHandleformObject={objectForm} />
        {props.handleFormSended ? (
          <div className="formSendedContainer">
            <h1 className="formSendedTitle">Formulario enviado!</h1>
          </div>
        ) : (
          <div className="bodyFormToRespQuestions">
            <IdentifyFormToResp
              identifyInfo={objectForm}
              toHandleInfoIndentify={(data) => handleIdentify(data)}
            />
            {questions.map((ques) => (
              <QuestionSectionFormToResp
                key={ques.id}
                toHandleformObject={ques}
                handleQuestionResponses={(data) =>
                  handleQuestionResponses(data)
                }
              />
            ))}
            <div className="btnSendRespContainer">
              {userAnswers.some(
                (answer) =>
                  answer.isRequire &&
                  (answer.answers.length === 0 ||
                    (Array.isArray(answer.answers[0]) &&
                      answer.answers[0].length === 0) ||
                    answer.answers[0] === "")
              ) ||
              (formRespToSend.typeIdentify && !formRespToSend.identify) ? (
                <button disabled className="btnSendResp banned">
                  Enviar
                </button>
              ) : (
                <button
                  onClick={() => props.toHandlePostFormToResp(formRespToSend)}
                  className="btnSendResp"
                >
                  Enviar
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BodyFormToResponse;
