import React from "react";
import LoopIcon from '@mui/icons-material/Loop';

interface repeatProps {
    onReset: any
}

function RepeatBox(props: repeatProps) {
    return(
        <div className="repeat-box" onClick={props.onReset}>
            <p>Create another</p>
            <LoopIcon />
        </div>
    )
}

export default RepeatBox;