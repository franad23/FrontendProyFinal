import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight, faPanorama } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import './apipexels.css'
import { Button, Modal } from 'antd';

//Components
import { fetchImagesPexels } from '../../api/pexelsApi';
import InputText from '../inputText/InputText';

function ApiPexels(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [inputApi, setInputApi] = useState("");
  const [currentImageSelected, setCurrentImageSelected] = useState("");
  const [imageSelected, setImageSelected] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleInputModal = async (data, page) => {
    setInputApi(data)
    setTimeout(async () => {
      const photos = await fetchImagesPexels(data || inputApi, page);
      setImages(photos);
    }, 500);
  }
  const handlePage = (direction) => {
    if (direction == 'left' & page >= 1) {
      setPage(page - 1);
      handleInputModal(inputApi, page)
    } else if (direction == 'right' & page <= 15) {
      setPage(page + 1);
      handleInputModal(inputApi, page)
    }
  };
  const handleCurrentImage = (data) => {
    setCurrentImageSelected(data);
  }
  const handleOk = () => {
    setIsModalOpen(false);
    setImageSelected(currentImageSelected);
    props.tohandleImage(currentImageSelected);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='apipexelsMainContainer'>
      <Button type="primary" onClick={showModal} className='btnApiPexels'>
        <FontAwesomeIcon icon={faPanorama} />
      </Button>
      <Modal title="Foto de portada" className='modalApiPexels' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <InputText
            textSize='1rem'
            placeholder={`Buscar imagen`}
            maxlength={50}
            row={1}
            showIcons={false}
            tohandle={handleInputModal}
          />
          <div>
            <div className='imagesModalContainer'>
              {
                images.map(img => (
                  <img src={img.src.tiny} 
                  alt={img.alt} 
                  key={images.indexOf(img)} 
                  className={`imgModalPexels ${currentImageSelected === img.src.landscape ? 'currentImgSelected' : ''}`} 
                  onClick={() => handleCurrentImage(img.src.landscape)}/>
                ))
              }
            </div>
            <div className={images == 0 ? 'notShowPagination' : "paginationModal"}>
              <FontAwesomeIcon icon={faAnglesLeft} onClick={() => handlePage('left')}/>
              <FontAwesomeIcon icon={faAnglesRight} onClick={() => handlePage('right')}/>
            </div>
          </div>
      </Modal>

    </div>
  )
}

export default ApiPexels