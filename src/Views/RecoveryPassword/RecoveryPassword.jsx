import './recoverypassword.css'
import { useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

//Components
import Logo from '../../components/Logo/Logo'

//API 
import { sendMailTorecoveryPass } from '../../api/formOptions';

function RecoveryPassword() {
  const [emailToRecovery, setEmailToRecovery] = useState({
    email: null
  });

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmailToRecovery((prevState) => ({
      ...prevState,
      email: e.target.value,
    }));
  }

  const handleRecoveryPassword = async () => {
    try {
      const res = await sendMailTorecoveryPass(emailToRecovery);
      toast.success("Mail enviado!");
      setTimeout(() => {
        navigate(`/login`);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='recoveryPasswordMainContainer'>
      <Toaster />
      <div className='recoveryContainer'>
        <Logo/>
        <div className='inputRecoveryPassContainer'>
          <h1 className='loginLabels'>Ingresa tu Email, si es correcto se enviara un mensaje a tu mail.</h1>
          <input type="email" className='inputText' placeholder='nombre@nombre.com' onChange={handleEmail}/>
          <div className='btnLoginContainer'>
            <button className='btnLogin' type='submit' onClick={handleRecoveryPassword}>Recuperar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecoveryPassword
