import { useState } from 'react';
import './checkboxformtoresp.css';
import { Checkbox, Col, Row } from 'antd';

//Components
import InputText from '../../inputText/InputText';


function CheckboxFormToResp(props) {
  const [formObject, setFormObject] = useState(props.toHandleformObject);

  return (
    <div className='questFormToRespMainContainer'>
    <Checkbox.Group
    onChange={(values) => props.toHandleInfoCheckbox(values) }
    >
      <Col className='checkboxColFormToResp'>
        {
          formObject
          .filter((quest) => quest.type === "checkbox")
          .map((questFiltered) => (
            <Row key={questFiltered.answer}>
              <Checkbox className='checkBoxbtnFormToResp' value={questFiltered.answer}>{questFiltered.answer}</Checkbox>
            </Row>
          ))
        }
      </Col>
    </Checkbox.Group>
    {
      formObject
      .filter((quest) => quest.type === "inputText").length != 0 ? 
      <InputText
        textSize="1rem"
        placeholder="Otra respuesta"
        maxlength={1000}
        row={1}
        showIcons={false}
        tohandle={(data) => console.log(data)}
      /> : null
    }
    </div>
  )
}

export default CheckboxFormToResp