import { Link } from 'react-router-dom'
import './error404.css'
import imgError404 from '../../assets/Error404.jpg'

function Error404() {
  return (
    <div className='error404MainContainer'>
      <img src={imgError404} alt="" className='errorImg'/>
      <Link to='/' className='backToHomeBtn'>Volver</Link>
    </div>
  )
}

export default Error404