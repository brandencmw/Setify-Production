"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function FormButton(props) {
    if (props.iconLoc === 'left') {
        return (<div className='form-button' onClick={props.onClick} id={`button${props.buttonID}`}>
                <img src={props.icon} id={`buttonImg${props.buttonID}`} alt=''/>
                <h5>{props.text}</h5>
            </div>);
    }
    else {
        return (<div className='form-button' onClick={props.onClick} id={`button${props.buttonID}`}>
                <h5>{props.text}</h5>
                <img src={props.icon} alt="" id={`buttonImg${props.buttonID}`}/>
            </div>);
    }
}
exports.default = FormButton;
