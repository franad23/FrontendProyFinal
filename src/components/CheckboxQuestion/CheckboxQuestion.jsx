import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './checkboxquestion.css';
import { useState, useEffect } from 'react';
import { Checkbox } from 'antd';
import InputText from '../inputText/InputText';

function CheckboxQuestion(props) {
  const checkbox = (props.handleData?.length)-1

  const [typeForm, setTypeForm] = useState(props.handleTypeForm)
  const [checkboxCounter, setCheckboxCounter] = useState(checkbox || 1)
  const [checkboxOptions, setCheckboxOptions] = useState(props.handleData === null || Object.keys(props.handleData).length === 0
    ? [{ value: 1, answer: '', type: 'checkbox' }]
    : props.handleData
  );
  const [showTextInputCheckbox, setShowTextInputCheckbox] = useState(false);

  useEffect(() => {
    props.toHandleCheckboxOptions(checkboxOptions);
  }, [checkboxOptions, showTextInputCheckbox]);

  const handleAddCheckbox = () => {
    setCheckboxCounter((prevCounter) => prevCounter + 1);
    setCheckboxOptions((prevOptions) => [
      ...prevOptions,
      { value: checkboxCounter + 1, answer: '', type: 'checkbox' },
    ]);
  };

  const handleInputCheckbox = (data, value) => {
    setCheckboxOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.value === value ? { ...option, answer: data } : option
      )
    );
  };

  const handleDeleteCheckbox = () => {
    setCheckboxCounter((prevCounter) => prevCounter - 1);
    setCheckboxOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      for (let i = updatedOptions.length - 1; i >= 0; i--) {
        if (updatedOptions[i].type === 'checkbox') {
          updatedOptions.splice(i, 1);
          break; 
        }
      }
      return updatedOptions;
    });
  };

  const handleInputTextCheckBox = () =>{
    setShowTextInputCheckbox(true);
    setCheckboxOptions((prevOptions) => [
      ...prevOptions,
      { type: 'inputText' },
    ]);
  }
  const handleDeleteInputTextCheckbox = () => {
    setShowTextInputCheckbox(false);
    setCheckboxOptions((prevOptions) =>
      prevOptions.filter((option) => option.type !== 'inputText')
    );
  } 

  const renderCheckboxOptions = () => {
    if (!Array.isArray(checkboxOptions)) {
      return null; // O algún otro manejo en caso de que radioOptions no sea un array
    }
  
    const checkboxOptionsToRender = checkboxOptions.filter(option => option.type === 'checkbox');
  
    return checkboxOptionsToRender.map(option => {
      const value = option.value;
      const answer = option.answer || '';
  
      // console.log(value);
      return (
        <div key={value} className='checkboxOptionContainer'>
          <Checkbox checked={value}></Checkbox>
          <InputText
            key={`input-${value}`}
            textSize='1rem'
            placeholder={`Respuesta ${value}`}
            name={`respuesta-${value}`}
            maxlength={50}
            row={1}
            showIcons={false}
            tohandle={(data) => handleInputCheckbox(data, value)}
            value={answer}
          />
          {checkboxCounter === value ? (
            <FontAwesomeIcon icon={faXmark} className='iconCross' onClick={() => handleDeleteCheckbox(value)} />
          ) : null} 
        </div>
      );
    });
  };

  const renderAddText = () => {
    const hasInputText = Object.values(checkboxOptions).some(option => option.type === 'inputText');
  
    return (
      hasInputText ? (
        <div className='textoLibreContainer'>
          <InputText
            textSize='1rem'
            placeholder={`Otra respuesta`}
            name={`otraRespuesta`}
            maxlength={50}
            row={1}
            showIcons={false}
            handleDisable={true}
          />
          <FontAwesomeIcon icon={faXmark} className='iconCross' onClick={handleDeleteInputTextCheckbox} />
        </div>
      ) : null
    );
  };

  return (
    <div className='checkboxQuestionMainContainer'>
      {renderCheckboxOptions()}
      {renderAddText()}
      <div className='btnsAgregarContainer'>
        <button className='btnAgregar' onClick={handleAddCheckbox}>Agregar opcion </button> 
        { 
          typeForm == "encuesta" ? null :
          <div>
            o <button className='btnAgregar' onClick={handleInputTextCheckBox}>Texto libre</button>
          </div>
        }
      </div>
    </div>
  );
}

export default CheckboxQuestion;
