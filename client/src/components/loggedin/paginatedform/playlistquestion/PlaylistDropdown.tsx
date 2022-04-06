import React from 'react';
import FormButton from '../FormButton';
import TrashIcon from '../../../../assets/images/TrashIcon.svg'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'

interface dropdownProps {
    playlists: Array<any>,
    selectID: string,
    onRemove: any,
    onChange: any,
    value: string
}

function PlaylistDropdown(props:dropdownProps) {

    const [value, setValue] = React.useState(props.value);

    function handleChange(event: any) {
        setValue(event.target.value);
        props.onChange(event);
    }

    return(
        <div className='playlist-dropdown'>
            <FormControl sx={{ m: 1, minWidth: 500}}>
                <InputLabel sx={{color: 'white'}}>Select a playlist</InputLabel>
                <Select
                className='playlist-select'
                id={props.selectID}
                label="Select a playlist"
                labelId="demo-simple-select-helper-label"
                name={props.selectID}
                onChange={handleChange}
                value={value}
                variant='outlined'
                >
                    {props.playlists.map((playlist: any) => {
                        return(<MenuItem id={props.selectID} value={playlist.id}>{playlist.name}</MenuItem>)
                    })}
                </Select>
            </FormControl>
            <FormButton icon={TrashIcon} iconLoc='left' text='' onClick={props.onRemove} buttonID={props.selectID}/> 
        </div>
    );
}

export default PlaylistDropdown;