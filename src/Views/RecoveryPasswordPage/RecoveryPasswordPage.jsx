import './recoverypasswordpage.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Popover } from "antd";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

//Components
import Logo from '../../components/Logo/Logo'

//API
import { changePassword } from '../../api/formOptions';

function RecoveryPasswordPage() {
  const [errorRegister, setErrorRegister] = useState({
    password: null,
    repeatPassword: null,
  });
  const [passwordChanged, setPasswordChanged] = useState({
    password: null
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const idUser = id;

  const content = (
    <div className="popoverContainer">
      <h1 className="titlePopoverRegister">La contraseña debe tener</h1>
      <ul>
        <li>Minimo 8 caracteres</li>
        <li>Minimo 1 mayuscula</li>
        <li>Minimo 1 numero </li>
      </ul>
    </div>
  );
  const handlePasswordRegister = (e) => {
    const userPassword = e.target.value;
    const passwordRegexToCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!passwordRegexToCheck.test(userPassword)) {
      setErrorRegister((prevState) => ({
        ...prevState,
        password: "La contraseña no cumple con los requisitos",
      }));
    } else {
      setPasswordChanged((prevState) => ({
        ...prevState,
        password: userPassword,
      }));
      setErrorRegister((prevState) => ({
        ...prevState,
        password: null,
      }));
    }
  };
  const handleRepeatPassword = (e) => {
    const userRepeatPassword = e.target.value;
    if (userRepeatPassword !== passwordChanged.password) {
      setErrorRegister((prevState) => ({
        ...prevState,
        repeatPassword: "Las contraseñas no coinciden",
      }));
    } else {
      setPasswordChanged((prevState) => ({
        ...prevState,
        password: userRepeatPassword,
      }));
      setErrorRegister((prevState) => ({
        ...prevState,
        repeatPassword: null,
      }));
    }
  };
  const handleSubmitChangedPassword = async () => {
    if (Object.values(errorRegister).some((error) => error !== null)) {
      toast.error("Tienes campos mal completados");
      return;
    }
    console.log(passwordChanged);
    if (passwordChanged.password == null) {
      toast.error("Tienes campos vacios");
      return;
    } 
    try {
      const res = await changePassword(idUser, passwordChanged);
      toast.success("Contraseña Actualizada!");
      setTimeout(() => {
        navigate(`/login`);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='recoveryPageMainContainer'>
      <Toaster />
      <div className='recoveryPageContainer'>
        <Logo/>
        <div className='inputRecoveryPassContainer'>
          <div>
            <div className="inputInfoContainer">
            <h1 className='loginLabels'>Contraseña:</h1>
              <Popover content={content} title="Recorda" trigger="click">
                <FontAwesomeIcon icon={faCircleInfo} />
              </Popover>
            </div>
              <input type="password" className='inputText' onChange={handlePasswordRegister}/>
              <div className="errorLoginContainer">
              {errorRegister.password ? (
                <span className="errorLogin">{errorRegister.password} </span>
              ) : null}
            </div>
          </div>
          <div>
            <h1 className='loginLabels'>Repetir contraseña:</h1>
            <input type="password" className='inputText' onChange={handleRepeatPassword}/>
            <div className="errorLoginContainer">
              {errorRegister.repeatPassword ? (
                <span className="errorLogin">
                  {errorRegister.repeatPassword}
                </span>
              ) : null}
            </div>
          </div>
          <div className='btnLoginContainer'>
            <button className='btnLogin' type='submit' onClick={handleSubmitChangedPassword}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecoveryPasswordPage