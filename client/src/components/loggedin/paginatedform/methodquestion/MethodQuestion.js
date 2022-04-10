import React from "react";
import RadioField from "./RadioField";
import FormButton from "../FormButton";
import NextIcon from "../../../../assets/images/NextIcon.svg";
function MethodQuestion(props) {
    return (<div className="method-question">
      <h2 className="form-prompt">
        How would you like to merge your playlists?
      </h2>
      <ul id="methodOptions">
        <li className="method-option">
          <RadioField text="Append" onChange={props.onChange} currentMethod={props.formData.method} description="Puts tracks in order one playlist after the other"/>
        </li>
        <li className="method-option">
          <RadioField text="Intersection" onChange={props.onChange} currentMethod={props.formData.method} description="Includes tracks that are found in all playlsts selected"/>
        </li>
        <li className="method-option">
          <RadioField text="Union" onChange={props.onChange} currentMethod={props.formData.method} description="Includes tracks that are found in at least one of the selected playlists"/>
        </li>
        <li className="method-option">
          <RadioField text="Interleaved" onChange={props.onChange} currentMethod={props.formData.method} description="Alternates between all selected playlists, adding one song from each at a time"/>
        </li>
        <li className="method-option">
          <RadioField text="Symmetric Difference" onChange={props.onChange} currentMethod={props.formData.method} description="Includes only songs that are not in the intersection of the playlists"/>
        </li>
      </ul>
      <div className="next-button-wrapper">
        <FormButton text="Next" iconLoc="right" icon={NextIcon} onClick={props.onNext} buttonID={null}/>
      </div>
    </div>);
}
export default MethodQuestion;
