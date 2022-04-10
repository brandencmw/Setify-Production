import React from 'react';
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
export default FormButton;
