import React from "react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Tooltip from '@mui/material/Tooltip';
function RadioField(props) {
    const id = props.text.toLowerCase();
    console.log(id);
    return (<div className='radio-field'>
            <input type="radio" name="selector" value={id} id={id} onChange={props.onChange} checked={id === props.currentMethod}/>
            <label htmlFor={id}>{props.text}</label>
            <div className="check"></div>
            <Tooltip title={props.description} placement='right'>
                <InfoOutlinedIcon />
            </Tooltip>
        </div>);
}
export default RadioField;
