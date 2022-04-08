"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RadioField_1 = __importDefault(require("./RadioField"));
const FormButton_1 = __importDefault(require("../FormButton"));
const NextIcon_svg_1 = __importDefault(require("../../../../assets/images/NextIcon.svg"));
function MethodQuestion(props) {
    return (<div className="method-question">
      <h2 className="form-prompt">
        How would you like to merge your playlists?
      </h2>
      <ul id="methodOptions">
        <li className="method-option">
          <RadioField_1.default text="Append" onChange={props.onChange} currentMethod={props.formData.method} description="Puts tracks in order one playlist after the other"/>
        </li>
        <li className="method-option">
          <RadioField_1.default text="Intersection" onChange={props.onChange} currentMethod={props.formData.method} description="Includes tracks that are found in all playlsts selected"/>
        </li>
        <li className="method-option">
          <RadioField_1.default text="Union" onChange={props.onChange} currentMethod={props.formData.method} description="Includes tracks that are found in at least one of the selected playlists"/>
        </li>
        <li className="method-option">
          <RadioField_1.default text="Interleaved" onChange={props.onChange} currentMethod={props.formData.method} description="Alternates between all selected playlists, adding one song from each at a time"/>
        </li>
        <li className="method-option">
          <RadioField_1.default text="Symmetric Difference" onChange={props.onChange} currentMethod={props.formData.method} description="Includes only songs that are not in the intersection of the playlists"/>
        </li>
      </ul>
      <div className="next-button-wrapper">
        <FormButton_1.default text="Next" iconLoc="right" icon={NextIcon_svg_1.default} onClick={props.onNext} buttonID={null}/>
      </div>
    </div>);
}
exports.default = MethodQuestion;
