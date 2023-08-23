import './userdrawer.css'
import { useEffect, useState } from 'react'
import { Drawer } from 'antd';
import { useNavigate  } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

//Components
import SpinnerLoading from '../SpinnerLoading/SpinnerLoading.jsx'

//Context
import { useAuth } from '../../context/AuthContext';


function UserDrawer(props) {
  const [open, setOpen] = useState(false);
  const {user, logout} = useAuth();
  const navigate = useNavigate();
  
  useEffect (() => {
    setOpen(props.openUserDrawer)
  }, [props.openUserDrawer])

  const onClose = () => {
    setOpen(false);
  };
  const handleLogOut = async () => {
    try {
      toast(`Adios ${user.userfirstname}!`, {
        icon: '👏',
      });
      localStorage.removeItem('welcomeMessage');
      setTimeout( async () => {
        const res = await logout();
        navigate(`/login`);
      }, 1000)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>     
      <div><Toaster/></div>
      <Drawer className='drawerUser' title={`${user.userfirstname} `} placement="right" onClose={onClose} open={open}>
        <div className='divUserDrawer'>
          <div>
            <h1 className='userInfoDrawer'><b>Nombre: </b>{user.userfirstname}</h1>
            <h1 className='userInfoDrawer'><b>Apellido: </b>{user.userlastname}</h1>
            <h1 className='userInfoDrawer'><b>Email:</b> {user.email}</h1>
            <h1 className='userInfoDrawer'><b>Plan:</b> {user.userPlan}</h1>
          </div>
          <div className='btnUserDrawerContainer'>
            <button className='btnUserDrawerLogout' onClick={handleLogOut}>Cerrar Sesion</button>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default UserDrawer