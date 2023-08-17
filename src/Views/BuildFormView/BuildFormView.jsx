import './buildformview.css'
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate  } from 'react-router-dom';

//Components
import BodyBuildForm from '../../components/BodyBuildForm/BodyBuildForm'
import Imageport from '../../components/ImagePort/Imageport'
import NavbarBuildForm from '../../components/NavbarBuildForm/NavbarBuildForm'
import { useEffect, useState } from 'react'

//API
import { addFormApi } from '../../api/formOptions'

function BuildFormView() {

  const { id } = useParams();

  const [finalImgPortUrl, setFinalImgPortUrl] = useState("https://images.pexels.com/photos/6801636/pexels-photo-6801636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
  const [finalForm, setFinalForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setFinalForm((prevFinalForm) => ({ ...prevFinalForm, urlImgPort: finalImgPortUrl }));
  }, [finalImgPortUrl]);

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
      const res = await addFormApi(finalForm);
      toast.success('Formulario Guardado!');
      setTimeout(() => {
        navigate(`/modify-form/${res.data._id}`);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='buildFormViewMainContainer'>
      <div><Toaster/></div>
      <NavbarBuildForm
        toHandleSendForm={() => handleSendForm(finalForm)}
      /> 
      <Imageport
        toHandleImagePort={(data) => setFinalImgPortUrl(data)}
        showApiPexels={true}
      />
      <BodyBuildForm
        toHandleFinalForm={(data) => handleFinalForm(data)}
        handletypeForm = {id}
      />
    </div>
  )
}

export default BuildFormView