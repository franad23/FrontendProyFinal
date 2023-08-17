import './modifybuildformview.css'
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'

//Components
import BodyBuildForm from '../../components/BodyBuildForm/BodyBuildForm'
import Imageport from '../../components/ImagePort/Imageport'
import NavbarBuildForm from '../../components/NavbarBuildForm/NavbarBuildForm'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading';

//API
import { updateForm } from '../../api/formOptions'
import { gettingForm } from '../../api/formOptions'

function ModifyBuildFormView() {
  const { id } = useParams();

  const [finalForm, setFinalForm] = useState(null);
  const [gettingData, setGettingData] = useState(null)
  const [finalImgPortUrl, setFinalImgPortUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  
  useEffect(() => {
    setFinalForm((prevFinalForm) => ({ ...prevFinalForm, urlImgPort: finalImgPortUrl }));
  }, [finalImgPortUrl]);
  
  const gettingDataFetch = async () => {
    try {
      const idForm = id
      const res = await gettingForm(idForm);
      setGettingData(res.data);
      setFinalImgPortUrl(res.data.urlImgPort)
      setFinalForm(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    gettingDataFetch();
  }, [])

  const handleFinalForm = (data) => {
    setFinalForm({ ...data, urlImgPort: finalImgPortUrl })
  }

  const handleSendForm = async (finalForm) => {
    if (!finalForm.titleForm.mainTitle || !finalForm.titleForm.mainDescription) {
      toast.error("Titulo o descripcion vacios");
      return
    }
    if (finalForm.typeForm == "formulario" && !finalForm.typeIdentify) {
      toast.error("Formulario sin identificacion");
      return;
    }
    if (!Array.isArray(finalForm.questionsForm) || finalForm.questionsForm.some((question) => !question.questionTitle)) {
      toast.error("Alguna pregunta tiene título vacío o no hay preguntas");
      return;
    }
    try {
      const idForm = id
      const res = await updateForm(idForm, finalForm);
      toast.success('Formulario Guardado!');
      setIsLoading(true);
      gettingDataFetch();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div><Toaster/></div>
      { isLoading ?  <SpinnerLoading /> : <div>

      <NavbarBuildForm
      toHandleSendForm={() => handleSendForm(finalForm)}
      />
      <Imageport
        toHandleImagePort={(data) => setFinalImgPortUrl(data)}
        handleData={gettingData.urlImgPort}
        showApiPexels={true}
      />
      <BodyBuildForm
        toHandleFinalForm={(data) => handleFinalForm(data)}
        handleData={gettingData}
      />
      </div>
      } 
    </>
  )
}

export default ModifyBuildFormView