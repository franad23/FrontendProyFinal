import "./identifyinput.css"

function IdentifyInput(props) {

  return (
    <div className="idenfifyInputMainContainer">
      <input 
      type={props.typeInput} 
      className="inputText" 
      placeholder={props.placeholderInput}
      onChange={(e) => props.toHandleInputIdentify(e.target.value)}
      />
    </div>
  )
}

export default IdentifyInput