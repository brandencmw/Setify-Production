import React from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip'

interface urlProps {
    url: string
}

function URLBox(props: urlProps) {


    return(
        <div className='url-wrapper'>
            <p>Share this playlist with your friends</p>
            <Tooltip title='Copy' placement='top-end'>
                <div className='url-box'>
                    <p className='url-text'>{props.url.length > 30 ? `${props.url.substring(0, 50)}...` : props.url}</p>
                    <ContentCopyIcon />
                </div>
            </Tooltip>
        </div>
        
    );
}

export default URLBox;