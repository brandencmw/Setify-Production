"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const InfoOutlined_1 = __importDefault(require("@mui/icons-material/InfoOutlined"));
const Tooltip_1 = __importDefault(require("@mui/material/Tooltip"));
function RadioField(props) {
    const id = props.text.toLowerCase();
    console.log(id);
    return (<div className='radio-field'>
            <input type="radio" name="selector" value={id} id={id} onChange={props.onChange} checked={id === props.currentMethod}/>
            <label htmlFor={id}>{props.text}</label>
            <div className="check"></div>
            <Tooltip_1.default title={props.description} placement='right'>
                <InfoOutlined_1.default />
            </Tooltip_1.default>
        </div>);
}
exports.default = RadioField;
