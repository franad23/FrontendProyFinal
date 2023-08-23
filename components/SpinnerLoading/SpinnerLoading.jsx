import './spinnerloading.css'
import { Spin } from 'antd';

function SpinnerLoading() {
  return (
    <div className='spinnerMainContainer'>
      <Spin size="large" />
      <p>Cargando...</p>
    </div>
  )
}

export default SpinnerLoading