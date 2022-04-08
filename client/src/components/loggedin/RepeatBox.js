"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Loop_1 = __importDefault(require("@mui/icons-material/Loop"));
function RepeatBox(props) {
    return (<div className="repeat-box" onClick={props.onReset}>
            <p>Create another</p>
            <Loop_1.default />
        </div>);
}
exports.default = RepeatBox;
