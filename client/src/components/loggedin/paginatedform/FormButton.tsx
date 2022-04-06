import React from 'react';

type locations = 'left' | 'right';

interface buttonProps {
    icon: string,
    iconLoc: locations,
    text: string,
    onClick: any,
    buttonID: string | null,
}

function FormButton(props:buttonProps) {
    if(props.iconLoc ==='left') {
        return(
            <div className='form-button' onClick={props.onClick} id={`button${props.buttonID}`}>
                <img src={props.icon} id={`buttonImg${props.buttonID}`} alt='' />
                <h5>{props.text}</h5>
            </div>
        );
    } else {
        return(
            <div className='form-button' onClick={props.onClick} id={`button${props.buttonID}`}>
                <h5>{props.text}</h5>
                <img src={props.icon} alt="" id={`buttonImg${props.buttonID}`} />
            </div>
        );  
    }
}

export default FormButton;