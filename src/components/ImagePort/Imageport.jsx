import { useEffect, useState } from 'react'
import './imageport.css'

//Components
import ApiPexels from '../APIPexels/ApiPexels'

function Imageport(props) {
  const [imagePort, SetImagePort] = useState(props.imagePortDefault || props.handleData || "https://images.pexels.com/photos/6801636/pexels-photo-6801636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");

  useEffect(() => {
    props.toHandleImagePort(imagePort)
  },[imagePort])

  const handleImagePort = (data) => {
    SetImagePort(data);
  }
  return (
    <div className='imagePortMainContainer'>
      <img src={imagePort || "https://images.pexels.com/photos/6801636/pexels-photo-6801636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" className='imgPort'/>
      {
        props.showApiPexels ? 
        <ApiPexels
        tohandleImage={handleImagePort}
      /> : null
      }
    </div>
  )
}

export default Imageport