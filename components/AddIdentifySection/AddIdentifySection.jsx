import './addidentifysection.css';
import { Select } from 'antd';
import { useEffect, useState } from 'react';

//Components
import InputText from '../inputText/InputText';
import FooterSectionBF from '../FooterSectionBuildForm/FooterSectionBF';

function AddIdentifySection(props) {
  const [require, setRequire] = useState(false);
  const [typeIdentify, setTypeIdentify] = useState(props.handleData == undefined ? null  : props.handleData);

  useEffect(() => {
    props.toHandleTypeIdentify(typeIdentify);
  },[typeIdentify])

  const optionsToSelect = [
      {
        value: 'Email',
        label: 'Email',
        text: "Ingresa tu Email"
      },
      {
        value: 'Nombre y apellido',
        label: 'Nombre y apellido',
        text: "Ingresa tu nombre y apellido"
      },
      {
        value: 'DNI',
        label: 'DNI',
        text: "Ingresa tu DNI"
      }
    ];
  

  const handleChangeIdentify = (value) => {
    setTypeIdentify(optionsToSelect.filter((val) => val.value == value)[0]);
  };

  return (
    <div className='addIdentifyMainContainer'>
      <div className='selectIdentifyContainer'>
        <h1 className='titleTypeIdentify'>Tipo de identificacion:</h1>
        <Select
          defaultValue={typeIdentify !== null ? typeIdentify.value  : "Seleccionar"}
          style={{
            width: 120,
          }}
          onChange={handleChangeIdentify}
          options={optionsToSelect}
        />
      </div>
      <div className='addIdentifyInputContainer'>
        <InputText
          textSize="1rem"
          placeholder={typeIdentify ? typeIdentify.value : ""}
          maxlength={100}
          row={1}
          showIcons = {false}
          handleDisable={true}
        />
      </div>
      <div className='footerSection'>
        <FooterSectionBF 
          toHandleShowQuesTable={false}
          toHandleSwitchState={(data) => setRequire(data)}
          isDisabled={true}
          isDefaultChecked={true}
          showTrash={false}
        />
      </div>
    </div>
  )
}

export default AddIdentifySection