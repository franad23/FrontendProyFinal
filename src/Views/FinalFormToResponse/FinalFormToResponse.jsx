import { useState } from 'react'
import './finalformtoresponse.css'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

//Components
import Imageport from '../../components/ImagePort/Imageport';
import BodyFormToResponse from '../../components/FormToResponseComponents/BodyFormToResponse/BodyFormToResponse';
import SpinnerLoading from '../../components/SpinnerLoading/SpinnerLoading';

//API
import { gettingFormToResp } from '../../api/formOptions';
import { postUserForm } from '../../api/formOptions';


function FinalFormToResponse() {
  const { id } = useParams();

  const [finalImgPortUrl, setFinalImgPortUrl] = useState(null);
  const [finalFormObject, setFinalFormObject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormSended, setIsFormSended] = useState(false);

  useEffect(() => {
    const gettingData = async () => {
      try {
        const idform = id;
        const res = await gettingFormToResp(idform);
        setFinalFormObject(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    gettingData();
  }, []);

  const handlePostFormToResp = async (data) => {
    try {
      const idform = id;
      const res = await postUserForm(idform, data);
      setIsFormSended(true);
    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <div className='finalFormToResponseMainContainer'>
      {
        isLoading ? (
          <SpinnerLoading />
        ) : (
          <div>
            <Imageport
              toHandleImagePort={(data) => setFinalImgPortUrl(data)}
              showApiPexels={false}
              imagePortDefault={finalFormObject.urlImgPort}
            />
            <BodyFormToResponse 
              toHandleformObject={finalFormObject}
              toHandlePostFormToResp={(data) => handlePostFormToResp(data)}
              handleFormSended = {isFormSended}
            />
          </div>
        )
      }

      
    </div>
  );
}

export default FinalFormToResponse
