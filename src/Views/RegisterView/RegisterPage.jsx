import "./registerpage.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Popover } from "antd";
import toast, { Toaster } from "react-hot-toast";

//Components
import Logo from "../../components/Logo/Logo";

//API
import { registerUser } from "../../api/formOptions";


function RegisterPage() {
  const [errorRegister, setErrorRegister] = useState({
    userfirstname: null,
    userlastname: null,
    email: null,
    password: null,
    repeatPassword: null,
  });
  const [userRegister, setUserRegister] = useState({
    userfirstname: null,
    userlastname: null,
    email: null,
    password: null,
    isVerify: false,
    userPlan: "Free"
  });
  const navigate = useNavigate();

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

  const handleFirstNameRegister = (e) => {
    const userFirstName = e.target.value;
    if (userFirstName.length > 30) {
      setErrorRegister((prevState) => ({
        ...prevState,
        userfirstname: "No puede exceder los 30 caracteres",
      }));
    } else {
      setUserRegister((prevState) => ({
        ...prevState,
        userfirstname: userFirstName,
      }));
      setErrorRegister((prevState) => ({
        ...prevState,
        userfirstname: null,
      }));
    }
  };
  const handleLastNameRegister = (e) => {
    const userLastName = e.target.value;
    if (userLastName.length > 30) {
      setErrorRegister((prevState) => ({
        ...prevState,
        userlastname: "No puede exceder los 30 caracteres",
      }));
    } else {
      setUserRegister((prevState) => ({
        ...prevState,
        userlastname: userLastName,
      }));
      setErrorRegister((prevState) => ({
        ...prevState,
        userlastname: null,
      }));
    }
  };

  const handleEmailRegister = (e) => {
    const userEmail = e.target.value;
    const emailRegexToCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegexToCheck.test(userEmail)) {
      setErrorRegister((prevState) => ({
        ...prevState,
        email: "Debe ingresar un Email válido",
      }));
    } else {
      setUserRegister((prevState) => ({
        ...prevState,
        email: userEmail,
      }));
      setErrorRegister((prevState) => ({
        ...prevState,
        email: null,
      }));
    }
  };

  const handlePasswordRegister = (e) => {
    const userPassword = e.target.value;
    const passwordRegexToCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!passwordRegexToCheck.test(userPassword)) {
      setErrorRegister((prevState) => ({
        ...prevState,
        password: "La contraseña no cumple con los requisitos",
      }));
    } else {
      setUserRegister((prevState) => ({
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
    if (userRepeatPassword !== userRegister.password) {
      setErrorRegister((prevState) => ({
        ...prevState,
        repeatPassword: "Las contraseñas no coinciden",
      }));
    } else {
      setUserRegister((prevState) => ({
        ...prevState,
        password: userRepeatPassword,
      }));
      setErrorRegister((prevState) => ({
        ...prevState,
        repeatPassword: null,
      }));
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    if (Object.values(errorRegister).some((error) => error !== null)) {
      toast.error("Tienes campos mal completados");
      return;
    }

    if (Object.values(userRegister).some((value) => value === null)) {
      toast.error("Tienes campos vacios");
      return;
    } else {
      try {
        const res = await registerUser(userRegister);
        toast.success("Usuario Registrado!");
        setTimeout(() => {
          navigate(`/infoverifyemail`);
        }, 2000);
      } catch (error) {
        console.log(error);
        setErrorRegister((prevState) => ({
          ...prevState,
          email: error.response.data.message,
        }));
      }
    }
  };

  // console.log(userRegister);
  return (
    <div className="registerPageMainContainer">
      <div>
        <Toaster />
      </div>
      <div className="registerContainer">
        <Logo />
        <form
          action=""
          className="inputsContainerRegister"
          onSubmit={handleSubmitRegister}
        >
          <div className="inputsLoginContainer">
            <h1 className="loginLabels">Nombre:</h1>
            <input
              type="text"
              className="inputText"
              placeholder="Nombre"
              onChange={handleFirstNameRegister}
            />
            <div className="errorLoginContainer">
              {errorRegister.userfirstname ? (
                <span className="errorLogin">
                  {errorRegister.userfirstname}
                </span>
              ) : null}
            </div>
          </div>
          <div className="inputsLoginContainer">
            <h1 className="loginLabels">Apellido:</h1>
            <input
              type="text"
              className="inputText"
              placeholder="Apellido"
              onChange={handleLastNameRegister}
            />
            <div className="errorLoginContainer">
              {errorRegister.userlastname ? (
                <span className="errorLogin">{errorRegister.userlastname}</span>
              ) : null}
            </div>
          </div>
          <div className="inputsLoginContainer">
            <h1 className="loginLabels">Email:</h1>
            <input
              type="email"
              className="inputText"
              placeholder="nombre@nombre.com"
              onChange={handleEmailRegister}
            />
            <div className="errorLoginContainer">
              {errorRegister.email ? (
                <span className="errorLogin">{errorRegister.email}</span>
              ) : null}
            </div>
          </div>
          <div className="inputsLoginContainer">
            <div className="inputInfoContainer">
              <h1 className="loginLabels">Contraseña:</h1>
              <Popover content={content} title="Recorda" trigger="click">
                <FontAwesomeIcon icon={faCircleInfo} />
              </Popover>
            </div>
            <input
              type="password"
              className="inputText"
              onChange={handlePasswordRegister}
            />
            <div className="errorLoginContainer">
              {errorRegister.password ? (
                <span className="errorLogin">{errorRegister.password}</span>
              ) : null}
            </div>
          </div>
          <div className="inputsLoginContainer">
            <h1 className="loginLabels">Repetir Contraseña:</h1>
            <input
              type="password"
              className="inputText"
              onChange={handleRepeatPassword}
            />
            <div className="errorLoginContainer">
              {errorRegister.repeatPassword ? (
                <span className="errorLogin">
                  {errorRegister.repeatPassword}
                </span>
              ) : null}
            </div>
          </div>
          <div className="btnLoginContainer">
            <button className="btnLogin" type="submit">
              Registrarse
            </button>
          </div>
          <div className="notRegisterContainer">
            <h1 className="notRegisterText">
              Ya tenes cuenta? <Link to="/login">Inicia sesion.</Link>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
