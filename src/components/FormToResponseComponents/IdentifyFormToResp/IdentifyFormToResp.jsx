import './identifyformtoresp.css'
import { useState } from 'react'

//Components
import IdentifyInput from '../IdentifyInput/IdentifyInput'

function IdentifyFormToResp(props) {
  const [identifyInfo, setIdentifyInfo] = useState(props.identifyInfo)

  return (
    <div>
    {identifyInfo.typeIdentify !== null ? (
      <div className='identifyFormToRespMainSection'>
        <div className="titleContainerIdentify">
          <h1 className="textInputIdentifyFormToResp">{identifyInfo.typeIdentify.text}</h1><span className='spanRequire'>*</span>
        </div>
        <div className='idenfifyInputcontainer'>
          <IdentifyInput
            typeInput="text"
            placeholderInput={identifyInfo.typeIdentify.value}
            toHandleInputIdentify={(data) => props.toHandleInfoIndentify(data)}
          />
        </div>
      </div>
    ) : null}
  </div>
    
  )
}

export default IdentifyFormToResp