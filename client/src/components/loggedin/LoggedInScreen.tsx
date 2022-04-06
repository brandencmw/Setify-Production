import React from 'react';
import axios from 'axios';
import PaginatedForm from './paginatedform/PaginatedForm';
import UserDropdown from './UserDropdown';
import ResultSuccess from './ResultSuccess';
import ResultFail from './ResultFail';

function LoggedInScreen() {
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token');

    interface UserType {
        displayName: string,
        userID: string
    }

    interface NewListType {
        id: string,
        name: string,
        url: string
    }

    interface TrackType {
        uri: string,
        name: string,
        albumURL: string,
        artistName: string
    }

    const [user, setUser] = React.useState<null | void | UserType>(null);
    const [newList, setNewList] = React.useState<null | NewListType>(null);
    const [tracks, setTracks] = React.useState<null | TrackType>(null);
    const [requestStatus, setRequestStatus] = React.useState<null | boolean>(null);


    React.useEffect(() => {
        if(token) {
            axios({
                method: 'GET',
                url: 'http://localhost:5000/get-userdata',
                // url: 'http://localhost:5000/get-userdata',
                headers: {
                    'Authorization': token
                }
            }).then((user: any) => {
                setUser(user.data);
            }).catch((err: any) => {
                console.log(err);
            });
        }
    }, []);

    function mergePlaylists(formData: any) {
        axios({
            method: 'GET',
            url: 'http://localhost:5000/merge-playlists',
            // url: 'http://localhost:5000/merge-playlists',
            params: {
                data: formData
            }
        }).then((data: any) => {
            setRequestStatus(data.data.success);
            setNewList(data.data.newList);
            setTracks(data.data.tracks);
        }).catch((err: any) => {
            console.log(err);
        });
    }

    function handleReset() {
        setRequestStatus(null);
        setNewList(null);
        setTracks(null);
    }

    function renderScreen() {
        if(requestStatus == null) {
            return(<PaginatedForm user={user} mergePlaylists={mergePlaylists}/>);
        } else if(tracks != null && newList!= null) {
            return(<ResultSuccess playlistInfo={newList} tracks={tracks} onReset={handleReset}/>);
        } else {
            return(<ResultFail />);
        }
    }


    if(user) {
        return(
            <div className='logged-in'>
                <UserDropdown username={user.displayName} userID={user.userID}/>
                {renderScreen()}
            </div>
        )
        
    } else {
        return <></>
    }

}

export default LoggedInScreen;