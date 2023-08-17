import './addtitlesection.css'
import { useEffect, useState } from 'react'

//Components
import InputText from '../inputText/InputText'

function AddTitleSection(props) {
  const [mainTitle, setMainTitle] = useState(props.handleData?.mainTitle ?? "");
  const [mainDescription, setMainDescription] = useState(props.handleData?.mainDescription ?? "");

  useEffect(() => {
    props.toHandleMainTitle(mainTitleForm)
  }, [mainTitle, mainDescription])

  const mainTitleForm = {
    mainTitle: mainTitle,
    mainDescription: mainDescription
  }

  return (
    <div className='addTitleMainSection'>
      <div className='addTitleInputContainer'>
        <InputText
          textSize="2rem"
          placeholder="Titulo"
          maxlength={100}
          row={1}
          showIcons = {true}
          tohandle = {(data) => setMainTitle(data)}
          value = {mainTitle}
          />
        <InputText
          textSize="1rem"
          placeholder="Descripcion"
          maxlength={1000}
          row={1}
          showIcons = {true}
          tohandle = {(data) => setMainDescription(data)}
          value = {mainDescription}
        />
      </div>
    </div>
  )
}

export default AddTitleSection