import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useState } from "react";
import "./inputtext.css";
import {
  faBold,
  faItalic,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function InputText(props) {
  const [fontWeight, setFontWeight] = useState(props.fontWeight || "");
  const [textDecoration, setTextDecoration] = useState(props.textDecoration || "");
  const [fontStyle, setFontStyle] = useState(props.fontStyle || "");
  const [currentChars, setCurrentChars] = useState(props.value ? props.value.length : 0);
  const [inputValue, setInputValue] = useState(props.value || "");
  const [showIconsStyle, setShowIconsStyle] = useState(false);
  const inputRef = useRef(null);
  const maxChars = props.maxlength || 150;

  const handleChangeBoldText = () => {
    setFontWeight(fontWeight == "" ? "bold" : "");
  };

  const handleChangeItalicText = () => {
    setFontStyle(fontStyle == "" ? "italic" : "");
  };

  const handleChangeUnderlineText = () => {
    setTextDecoration(textDecoration == "" ? "underline" : "") ;
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  };
  
  const handleInput = (e) => {
    setCurrentChars(e.target.value.length);
    handleInputResize(); // Ajustar altura del textarea
  };

  const handleOnChangeInput = (e) => {
    setInputValue(e.target.value);
    props.tohandle(e.target.value);
  }
  const handleInputResize = () => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"; 
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`; 
    }
  };
  return (
    <div className="inputTextMainContainer">
      <div className="inputContainer">
        <textarea
          readOnly = {props.readOnlyInput}  
          disabled = {props.handleDisable}
          ref={inputRef} 
          className="inputText"
          style={{
            fontSize: props.textSize,
            fontWeight: fontWeight,
            textDecoration: textDecoration,
            fontStyle: fontStyle,
            resize: "none", 
            overflowY: "hidden", 
          }}
          rows={props.row} 
          placeholder={props.placeholder}
          onInput={handleInput} 
          maxLength={props.maxlength}
          value={inputValue}
          onChange={handleOnChangeInput}
        />

        <div  
          onMouseDown={handleMouseDown}
          className={showIconsStyle ? "iconsStyleTextContainer" : "notShowIconsStyle"}
        >
          <div className="iconsStyleText">
            <OverlayTrigger
              placement="top"
              delay={{ show: 150, hide: 150 }}
              overlay={<Tooltip className="tooltip" id="button-tooltip">Negrita</Tooltip>}
            >
              <FontAwesomeIcon 
                icon={faBold} 
                className={fontWeight == "bold" ? "iconsInputTextSelected" : "iconsInputText"}
                onClick={handleChangeBoldText}
              />
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              delay={{ show: 150, hide: 150 }}
              overlay={<Tooltip className="tooltip" id="button-tooltip">Cursiva</Tooltip>}
            >
              <FontAwesomeIcon 
                icon={faItalic} 
                className={fontStyle == "italic" ? "iconsInputTextSelected" : "iconsInputText"} 
                onClick={handleChangeItalicText}
              />
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              delay={{ show: 150, hide: 150 }}
              overlay={<Tooltip className="tooltip" id="button-tooltip">Subrayado</Tooltip>}
            >
              <FontAwesomeIcon 
                icon={faUnderline} 
                className={textDecoration == "underline" ? "iconsInputTextSelected" : "iconsInputText"}
                onClick={handleChangeUnderlineText}
              />
            </OverlayTrigger>
            <div className="charContainer">
              <span>{`${currentChars}/${maxChars}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputText;
