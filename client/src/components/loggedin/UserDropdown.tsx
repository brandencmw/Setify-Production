import React from "react";
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"

interface userProps {
    username: string,
    userID: string,
}

function UserDropdown(props: userProps) {
    const message = props.username == null ? 'You are not logged in' : 'Welcome, ' + props.username;
    const [value, setValue] = React.useState('');


    function handleChange(event: any) {
        setValue(event.target.value);
    }

    return(
        <div className="user-dropdown">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 260 }}>
                <InputLabel id="demo-simple-select-standard-label">{message}</InputLabel>
                <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={value}
                onChange={handleChange}
                label={message}
                className="user-select"
                >
                <a href="http://localhost:5000/logout" className="logout-link"><MenuItem value='Logout'>Logout</MenuItem></a>
                </Select>
            </FormControl>
        </div>
    );
}

export default UserDropdown;