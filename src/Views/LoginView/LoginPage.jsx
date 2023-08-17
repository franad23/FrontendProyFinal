import './loginpage.css'
import { useEffect, useState } from 'react'
import { useNavigate, Link  } from 'react-router-dom';


//Components
import Logo from '../../components/Logo/Logo';

//Context 
import { useAuth } from "../../context/AuthContext";

function LoginPage() {
  const [errorLogin, setErrorLogin] = useState({
    email: null,
    password: null
  })
  const [userLogin, setUserLogin] = useState({
    email: null,
    password: null
  })
  const navigate = useNavigate();
  const {signin, isAuth} = useAuth();
  const [errorLoginCounter, setErrorLoginCounter] = useState(0);

  useEffect(() => {
    if(isAuth) {
      navigate(`/userdashboard`);
    }
  }, [isAuth])

  const handleEmailLogin = (e) => {
    const currentEmail = e.target.value;
    const emailRegexToCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    if (!emailRegexToCheck.test(currentEmail)) {
      setErrorLogin((prevState) => ({
        ...prevState,
        email: "Debe ingresar un Email válido"
      }));
    } else {
      setUserLogin((prevState) => ({
        ...prevState,
        email: currentEmail
      }));
      setErrorLogin((prevState) => ({
        ...prevState,
        email: null
      }));
    }
  };
  
  const handlePasswordLogin = (e) => {
    const newPassword = e.target.value;

    if (newPassword.length > 25) {
      setErrorLogin((prevState) => ({
        ...prevState,
        password: "La contraseña no debe exceder los 25 caracteres"
      }));
    } else {
      setUserLogin((prevState) => ({
        ...prevState,
        password: newPassword
      }));
      setErrorLogin((prevState) => ({
        ...prevState,
        password: null
      }));
    }
  };
  
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (!userLogin.email || !userLogin.password) {
      setErrorLogin((prevState) => ({
        ...prevState,
        email: "Debe ingresar su Email"
      }));
    } if (!userLogin.email || !userLogin.password) {
      setErrorLogin((prevState) => ({
        ...prevState,
        password: "Debe ingresar su contraseña"
      }));
    }
    else {
      try {
        const res = await signin(userLogin);
        navigate(`/userdashboard`)
      } catch (error) {
        setErrorLoginCounter(errorLoginCounter + 1);
        console.log(errorLoginCounter);
        setErrorLogin({
          email: error.response.data.message,
          password: error.response.data.message
        })
      }
    }
  }

  return (
    <div className='loginPageMainContainer'>
      <div className='loginContainer'>
        <Logo/>
        <form className='inputsContainer' onSubmit={handleSubmitLogin}>
          <div className='inputsLoginContainer'>
            <h1 className='loginLabels'>Email:</h1>
            <input type="email" className='inputText' placeholder='nombre@nombre.com' onChange={handleEmailLogin}/>
            <div className='errorLoginContainer'>
              {errorLogin.email ? <span className='errorLogin'>{errorLogin.email}</span> : null}
            </div>
          </div>
          <div className='inputsLoginContainer'>
            <h1 className='loginLabels'>Contraseña:</h1>
            <input type="password" className='inputText' placeholder='Contraseña' onChange={handlePasswordLogin}/>
            <div className='errorLoginContainer'>
              {errorLogin.password ? <span className='errorLogin'>{errorLogin.password}</span> : null}
            </div>
          </div>
          <div className='btnLoginContainer'>
            <button className='btnLogin' type='submit' >Iniciar Sesion</button>
          </div>
          <div className='notRegisterContainer'>
            <h1 className='notRegisterText'>Aun no estas registrado? hace click <Link to="/register">aqui.</Link></h1>
            <h1 className='notRegisterText'>Olvidaste la contraseña? hace click <Link to="/recoverypassword">aqui.</Link></h1>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage