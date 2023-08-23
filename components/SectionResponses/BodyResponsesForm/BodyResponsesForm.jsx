import "./bodyresponsesform.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import imgNotFoundForms from "../../../assets/notFoundForms.png";


//Components
import ResponsesCards from "../ResponsesCards/ResponsesCards";
import SpinnerLoading from "../../SpinnerLoading/SpinnerLoading";
import ChartJSSection from "../ChartjJsSection/ChartJSSection";

//API
import { gettingResponses } from "../../../api/formOptions";

function BodyResponsesForm() {
  const { id } = useParams();
  const [responses, setResponses] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const gettingUserResponses = async () => {
      try {
        const res = await gettingResponses(id);
        setResponses(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    gettingUserResponses();
  }, [id]);

  return (
    <div className="bodyResponsesFormMainContainer">
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <div className="cardsResponsesContainer">
          {responses.length > 0 ? (
            <div className="cardsResponsesContainer">
              {responses[0].typeForm === "encuesta" ? (
                <ChartJSSection handleDataResp={responses} />
              ) : (
                responses.map((resp) => (
                  <div key={resp._id}>
                    <ResponsesCards handleDataResp={resp} />
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="noAnswersContainer">
              <img
                src={imgNotFoundForms}
                alt="imgNotFound"
                className="svgNotFound"
              />
              <h1 className="titleNoAnswers">No hay respuestas todavia!</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BodyResponsesForm;
