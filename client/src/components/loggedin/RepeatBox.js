import React from "react";
import LoopIcon from '@mui/icons-material/Loop';
function RepeatBox(props) {
    return (<div className="repeat-box" onClick={props.onReset}>
            <p>Create another</p>
            <LoopIcon />
        </div>);
}
export default RepeatBox;
