import './navbardashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouse, faPlus, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { Button, Modal, Select, Space, Drawer  } from 'antd';
import { useNavigate  } from 'react-router-dom';
import { useState } from 'react';

//Components
import UserDrawer from '../../UserDrawer/UserDrawer';

function NavBarDashboard() {
  const [open, setOpen] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [formType, setFormType] = useState(null);
  const [showErrorCreateForm, setShowErrorCreateForm] = useState(false);
  const [userDrawer, setUserDrawer] = useState(false);
  const navigate = useNavigate();

  const optionsSelect=[
    { value: 'encuesta', label: 'Encuesta' },
    { value: 'formulario', label: 'Formulario' }
  ]

  const handleCreateForm = () => {
    if (!formType) {
      setShowErrorCreateForm(true)
    }else {
      const newTab = window.open(`/build-form/${formType}`, '_blank');
        if (newTab) {
          newTab.focus();
          setOpen(false);
        }
    }
  }

  return (
    <div >
      <UserDrawer
        openUserDrawer={userDrawer}
      />
      <div className='navbarDashboardMainContainer'>
      <Modal
        open={open}
        title="Tipo de formulario"
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Cerrar
          </Button>,
          <Button key="submit" type="primary" onClick={handleCreateForm}>
            Crear
          </Button>,
        ]}
      >
        <div className='bodyModalAddForm'>
          <div className='SelectModalCreateForm'>
              <div className='selectContainerInfo'>
                <Space wrap >
                  <Select
                    defaultValue="Seleccionar"
                    style={{ width: 200 }}
                    onChange={(value) => setFormType(value)}
                    options={optionsSelect}
                  />
                </Space>
                <FontAwesomeIcon icon={faCircleInfo} className='iconInfoModal' onClick={() => setShowDrawer(true)}/>
              </div>
              {
                showErrorCreateForm ? <span className='spanErrorModalCreateForm'>Tienes que seleccionar una opcion</span> : null
              }
            
          </div>
        </div>
      </Modal>
      <Drawer title="¿Que tipo de formulario elegir?" placement="right" onClose={() => setShowDrawer(false)} open={showDrawer}>
        <div className='bodyDrawer'>
          <p><b className='titleInfoFormdrawer'>Encuesta:</b> cuestionario diseñado para recopilar información especifica
            de un grupo de personas con el propósito de obtener datos estadísticos. <b>NO SE PEDIRA IDENTIFICACION,
            LOS DATOS SE MOSTRARAN EN GRAFICOS Y NO SE PERMITE TEXTO LIBRE.</b>
            </p>
          <p><b className='titleInfoFormdrawer'>Formulario:</b> Un formulario es una herramienta para recopilar datos de manera estructurada, 
            ya sea información personal, detalles de contacto u otra información relevante. <b>SE PEDIRA IDENTIFICACION
            Y SE MOSTRARA RESPUESTA POR CADA ENCUESTADO.</b>
          </p>
        </div>
      </Drawer>
      <div className='searchFormDashboard'>
        <FontAwesomeIcon icon={faHouse} className='iconsNavbar' onClick={() => navigate(`/userdashboard`)}/>
      </div>
      <div className='userIconsNavbarSection'>
        <FontAwesomeIcon icon={faPlus} className='iconsNavbar' onClick={() => setOpen(true)}/>
        <FontAwesomeIcon icon={faUser} className='iconsNavbar' onClick={() => setUserDrawer(true)}/>
      </div>
    </div>
      </div>
      
  )
}

export default NavBarDashboard