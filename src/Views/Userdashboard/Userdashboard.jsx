import './userdashboard.css'
import { useEffect, useState } from 'react'
import toast, { Toaster } from "react-hot-toast";


//Components
import NavBarDashboard from '../../components/Dashboard/NavBarDashboard.jsx/NavBarDashboard'
import UserFormsSection from '../../components/Dashboard/UserFormsSection/UserFormsSection'
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading';

//API 
import { gettingFormsUser } from '../../api/formOptions'

//Context
import { useAuth } from '../../context/AuthContext';

function Userdashboard() {
  const [userForms, setUserForms] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useAuth();

  const welcomeMessage = () => {
    const welcomeMessage = localStorage.getItem('welcomeMessage');
    if (!welcomeMessage) {
      toast(`Bienvenido ${user.userfirstname}`, {
        icon: '👏',
      });
      localStorage.setItem('welcomeMessage', 'true');
    }
  }
  

  const gettingUserForms = async () => {
    try {
        const res = await gettingFormsUser();
        setUserForms(res.data);
        setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  } 
  useEffect(() => {
    gettingUserForms();
    welcomeMessage();
  },[])
  const handleLoadingCards = () => {
    setIsLoading(true);
    gettingUserForms();
  }

  return (
    <div className='userdashboardMainContainer'>
      <div><Toaster/></div>
      <NavBarDashboard
      />
      { isLoading ?  <SpinnerLoading /> :  
      <UserFormsSection
        handleData = {userForms}
        tohandleLoading={handleLoadingCards}
      /> 
      }
    </div>
  )
}

export default Userdashboard
