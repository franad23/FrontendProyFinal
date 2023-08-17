import { useState } from "react";
import "./radiobtnsformtoresp.css";
import { Radio, Space } from "antd";

//Components
import InputText from "../../inputText/InputText";

function RadioBtnsFormToResp(props) {
  const [formObject, setFormObject] = useState(props.toHandleformObject);
  const [value, setValue] = useState(2);
  const onChange = (e) => {
    props.toHandleInfoRadioBtn(e.target.value);
    setValue(e.target.value);
  };

  return (
    <div className="RadioBtnsFormToRespMainContainer">
      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical">
          {formObject
            .filter((quest) => quest.type == "radio")
            .map((questFiltered) => (
              <Radio
                className="radioBtnsFormToResp"
                key={questFiltered.value}
                value={questFiltered.answer}
              >
                {questFiltered.answer}
              </Radio>
            ))}
        </Space>
      </Radio.Group>
      {formObject.filter((quest) => quest.type == "inputText").length != 0 ? 
        <InputText
          textSize="1rem"
          placeholder="Otra respuesta"
          maxlength={1000}
          row={1}
          showIcons={false}
          tohandle={(data) => console.log(data)}
        /> : null}
    </div>
  );
}

export default RadioBtnsFormToResp;
