import './carsuserform.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Dropdown } from 'antd';
import { Button, Modal, QRCode} from 'antd';
import { useNavigate  } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

//Components
import InputText from '../../inputText/InputText';

//API 
import { deleteForm } from '../../../api/formOptions';

function CardsUserForm(props) {

  const [infoToCards, setInfoToCards] = useState(props.handleData);
  const [isModalOpenQR, setIsModalOpen] = useState(false);
  const [isModalOpenLink, setIsModalOpenLink] = useState(false);
  const [isModalOpenToDelete, setIsModalOpenToDelete] = useState(false);
  const navigate = useNavigate();

  const handleDeleteForm = async () => {
    try {
      const id = infoToCards._id;
      const res = await deleteForm(id);
      console.log(res);
      props.tohandleLoading()
    } catch (error) {
      console.log(error);
    }
  }

  const downloadQRCode = () => {
    const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement('a');
      a.download = 'QRCode.png';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const items = [
    {
      key: '1',
      label: (
        <button className='btnCardsDropdown' onClick={() => setIsModalOpen(true)}>Generar QR</button>
      ),
    },
    {
      key: '2',
      label: (
        <button className='btnCardsDropdown' onClick={() => setIsModalOpenLink(true)}>Enlace</button>
      ),
    },
    {
      key: '3',
      label: (
        <button className='btnCardsDropdown' onClick={() => setIsModalOpenToDelete(true)}>Eliminar</button>
      ),
    }
  ];
  const navigateToModifyForm = () => {
    navigate(`/modify-form/${infoToCards._id}`);
  }

  const handleClickCopyLink = () => {
    const linkToCopy = `https://echosurvey.vercel.app/final-form/${infoToCards._id}/`;
    navigator.clipboard.writeText(linkToCopy);
    setIsModalOpenLink(false);
    toast.success('Link copiado!')
  }

  return (
    <div className='cardUserFormMainContainer'>
      <div><Toaster/></div>
      <Modal title="Hace click sobre el QR para descargar" 
        open={isModalOpenQR}
        onCancel={() => setIsModalOpen(false)} 
        footer={[
          <Button key="back" onClick={() => setIsModalOpen(false)} >
            Salir
          </Button>
        ]}>
        <div className='qrcodeContainer'>
          <div id="myqrcode" className='qrcodeCard' onClick={downloadQRCode}>
            <QRCode
              value={`https://echosurvey.vercel.app/final-form/${infoToCards._id}/`}
              bgColor="#fff"
              style={{
              marginBottom: 16,
              }}
            />
          </div>
        </div>
      </Modal>
      <Modal title="Enlace de formulario" 
        open={isModalOpenLink} 
        onCancel={() => setIsModalOpenLink(false)} 
        footer={[
          <Button key="submit" type="primary" onClick={handleClickCopyLink} >
            Copiar
          </Button>,
          <Button key="back" onClick={() => setIsModalOpenLink(false)} >
            Salir
          </Button>
        ]}>
            <InputText
              readOnlyInput={true}
              textSize="0.9rem"
              placeholder="Link"
              maxlength={100}
              row={1}
              showIcons = {false}
              // tohandle = {(data) => setMainTitle(data)}
              value = {`https://echosurvey.vercel.app/final-form/${infoToCards._id}/`}
            />
      </Modal>
      <Modal title="Confirmar Eliminacion del formulario" 
        open={isModalOpenToDelete} 
        onCancel={() => setIsModalOpenToDelete(false)} 
        footer={[
          <Button key="submit" type="primary" onClick={handleDeleteForm} >
            Aceptar
          </Button>,
          <Button key="back" onClick={() => setIsModalOpenToDelete(false)} >
            Salir
          </Button>
        ]}>
          <p className='deleteBodyModal'>Tener en cuenta que una vez eliminado no se podra recuperar todos los datos.</p>
      </Modal>
      <Dropdown
        menu={{
        items,
        }}
        placement="topRight"
        className='dotsIconCard'
      >
        <FontAwesomeIcon icon={faEllipsisVertical} className='dotsIconCard'/>
      </Dropdown>
        <div className='cardUserFormMainContainer' onClick={navigateToModifyForm}>
          <div className='imgCardContainer'>
            <img className='imgCard' src={infoToCards.urlImgPort} alt="" />
          </div>
          <div className='infocardContainer'>
            <div className='titleCardContainer'>
              <h1 className='titleCard'>{infoToCards.titleForm.mainTitle}</h1>  
            </div>
            <div className='spanCardsContainer'>
              <span className='spanCards'>Creado: {infoToCards.createdAt.slice(0, 10)}</span>
              <span className='spanCards'>Modificado: {infoToCards.updatedAt.slice(0, 10)}</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default CardsUserForm
