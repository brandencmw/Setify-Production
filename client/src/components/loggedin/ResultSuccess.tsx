import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import URLBox from './URLBox';
import RepeatBox from './RepeatBox'

interface successProps {
    playlistInfo: any,
    tracks: any,
    onReset: any
}

function ResultSuccess(props: successProps) {
    console.log(props.playlistInfo);
    return(
        <div className="result-success">
            <h2 className='form-prompt'>Your playlists have been merged<br />Check out the track list below</h2>
            <List>
                {props.tracks.map((track: any) => {
                    return(
                        <ListItem key={track.uri}>
                            <ListItemAvatar>
                                <Avatar src={track.imageURL}/>
                            </ListItemAvatar>
                            <ListItemText primary={track.name + ' - ' + track.artistName}/>
                        </ListItem>
                    );
                })}
            </List>
            <URLBox url={props.playlistInfo.url}/>
            <RepeatBox onReset={props.onReset}/>
        </div>
    )
}

export default ResultSuccess;