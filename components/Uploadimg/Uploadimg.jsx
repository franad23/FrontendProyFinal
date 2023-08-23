import './uploadimg.css'
import { uploadFile } from '../../api/firebaseimg'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

function Uploadimg(props) {
  const [file, setFile] = useState(null);

  let loadingMessage;
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      loadingMessage = toast.loading('Subiendo Imagen...');
      const url = await uploadFile(file);
      toast.success(`Se subio correctamente!`, { id: loadingMessage });
      props.toHandleUrlImg(url);
    } catch (error) {
      toast.error(`Error al subir imagen`,{ duration: 3000 });
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleUpload} className='formUploadMainContainer'>
      <div><Toaster/></div>
      <input type="file" onChange={e => setFile(e.target.files[0])} className='inputFile'/>
      <button className='uploadImgBtn'>Subir</button>
    </form>
  )
}

export default Uploadimg