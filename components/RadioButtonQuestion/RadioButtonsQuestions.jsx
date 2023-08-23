import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './radiobuttonsquestions.css'
import { useEffect, useState } from 'react';
import { Radio } from 'antd';

//Components
import InputText from '../inputText/InputText';

function RadioButtonsQuestions(props) {
  const radio = (props.handleData?.length)-1
  const [typeForm, setTypeForm] = useState(props.handleTypeForm)

  const [radioBtnCounter, setRadioBtnCounter] = useState(radio || 1)
  const [radioOptions, setRadioOptions] = useState(props.handleData === null || Object.keys(props.handleData).length === 0
    ? [{ value: 1, answer: '', type: 'radio' }]
    : props.handleData
  );
  const [showTextInputRadio, setShowTextInputRadio] = useState(false);

  useEffect(() => {
    props.toHandleRadioOptions(radioOptions);
  }, [radioOptions, showTextInputRadio]);

  const handleAddRadioBtn = () => {
    setRadioBtnCounter((prevCounter) => prevCounter + 1);
    setRadioOptions((prevOptions) => [
      ...prevOptions,
      { value: radioBtnCounter + 1, answer: '', type: 'radio' },
    ]);
  };
  
  const handleInputRadio = (data, value) => {
    setRadioOptions((prevOptions) =>
    prevOptions.map((option) =>
    option.value === value ? { ...option, answer: data } : option
    )
    );
  };

  const handleDeleteRadioBtn = () => {
    setRadioBtnCounter((prevCounter) => prevCounter - 1);
    setRadioOptions((prevOptions) => {
      const updatedOptions = [...prevOptions]; 
      for (let i = updatedOptions.length - 1; i >= 0; i--) {
        if (updatedOptions[i].type === 'radio') {
          updatedOptions.splice(i, 1);
          break; 
        }
      }
      return updatedOptions;
    });
  };

  const handleInputTextRadioBtn = () => {
    setShowTextInputRadio(true);
    setRadioOptions((prevOptions) => [
      ...prevOptions,
      { type: 'inputText' },
    ]);
  }
  const handleDeleteInputText = () => {
    setShowTextInputRadio(false);
    setRadioOptions((prevOptions) =>
      prevOptions.filter((option) => option.type !== 'inputText')
    );
  } 

  const renderRadioOptions = () => {
    if (!Array.isArray(radioOptions)) {
      return null; 
    }
  
    const radioOptionsToRender = radioOptions.filter(option => option.type === 'radio');
  
    return radioOptionsToRender.map(option => {
      const value = option.value;
      const answer = option.answer || '';
      return (
        <div key={value} className='radioBtnOptionContainer'>
          <Radio value={value}></Radio>
          <InputText
            key={`input-${value}`}
            textSize='1rem'
            placeholder={`Respuesta ${value}`}
            name={`respuesta-${value}`}
            maxlength={50}
            row={1}
            showIcons={false}
            tohandle={(data) => handleInputRadio(data, value)}
            value={answer}
          />
          {radioBtnCounter === value ? (
            <FontAwesomeIcon icon={faXmark} className='iconCross' onClick={() => handleDeleteRadioBtn(value)} />
          ) : null} 
        </div>
      );
    });
  };
  
  const renderAddText = () => {
    const hasInputText = Object.values(radioOptions).some(option => option.type === 'inputText');
  
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
          <FontAwesomeIcon icon={faXmark} className='iconCross' onClick={handleDeleteInputText} />
        </div>
      ) : null
    );
  };
  
  return (
    <div className='radioBtnsMainContainer'>
        {renderRadioOptions()}
        {renderAddText()}
      <div className='btnsAgregarContainer'>
        <button className='btnAgregar' onClick={handleAddRadioBtn}>Agregar opcion</button> 
        { 
          typeForm == "encuesta" ? null :
          <div>
            o <button className='btnAgregar' onClick={handleInputTextRadioBtn}>Texto libre</button>
          </div>
        }
      </div>
    </div>
  )
}

export default RadioButtonsQuestions