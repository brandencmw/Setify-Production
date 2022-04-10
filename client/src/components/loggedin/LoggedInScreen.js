import React from 'react';
import axios from 'axios';
import PaginatedForm from './paginatedform/PaginatedForm';
import UserDropdown from './UserDropdown';
import ResultSuccess from './ResultSuccess';
import ResultFail from './ResultFail';
function LoggedInScreen() {
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token');
    const [user, setUser] = React.useState(null);
    const [newList, setNewList] = React.useState(null);
    const [tracks, setTracks] = React.useState(null);
    const [requestStatus, setRequestStatus] = React.useState(null);
    React.useEffect(() => {
        if (token) {
            axios({
                method: 'GET',
                url: 'http://localhost:5000/get-userdata',
                // url: 'http://localhost:5000/get-userdata',
                headers: {
                    'Authorization': token
                }
            }).then((user) => {
                setUser(user.data);
            }).catch((err) => {
                console.log(err);
            });
        }
    }, []);
    function mergePlaylists(formData) {
        axios({
            method: 'GET',
            url: 'http://localhost:5000/merge-playlists',
            // url: 'http://localhost:5000/merge-playlists',
            params: {
                data: formData
            }
        }).then((data) => {
            setRequestStatus(data.data.success);
            setNewList(data.data.newList);
            setTracks(data.data.tracks);
        }).catch((err) => {
            console.log(err);
        });
    }
    function handleReset() {
        setRequestStatus(null);
        setNewList(null);
        setTracks(null);
    }
    function renderScreen() {
        if (requestStatus == null) {
            return (<PaginatedForm user={user} mergePlaylists={mergePlaylists}/>);
        }
        else if (tracks != null && newList != null) {
            return (<ResultSuccess playlistInfo={newList} tracks={tracks} onReset={handleReset}/>);
        }
        else {
            return (<ResultFail />);
        }
    }
    if (user) {
        return (<div className='logged-in'>
                <UserDropdown username={user.displayName} userID={user.userID}/>
                {renderScreen()}
            </div>);
    }
    else {
        return <></>;
    }
}
export default LoggedInScreen;
