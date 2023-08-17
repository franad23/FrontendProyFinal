import './toverifyemail.css'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

//Components
import Logo from '../../components/Logo/Logo'

//API
import { getUserToVerify, verifyUser } from '../../api/formOptions'


function ToVerifyEmail() {
  const { id } = useParams();
  const [userName, setUserName] = useState(null);
  const idUser = id;
  const navigate = useNavigate();


  const getNameUser = async () => {
    try {
      const res = await getUserToVerify(idUser);
      setUserName(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getNameUser();
  }, [])

  const VerifyUser = async () => {
    try {
      const res = await verifyUser(idUser);
      toast.success(res.data.message);
      setTimeout(() => {
        navigate(`/login`);
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      setTimeout(() => {
        navigate(`/login`);
      }, 1000);
    }
  }

  return (
    <div className='toVerifyEmailMainContainer'>
      <div><Toaster /></div>
      <div className='toVerifyEmailContainer'>
        <Logo/>
        <h1 className='titleVerifyEmail'>Hola! <b>{userName}</b>, Hace click en verificar para completar el registro.</h1>
        <div className='btnLoginContainerInfoVerify'>
          <button className='btnInfoVerifyEmail' onClick={VerifyUser}>Verificar</button>
        </div>
      </div>
    </div>
  )
}

export default ToVerifyEmail