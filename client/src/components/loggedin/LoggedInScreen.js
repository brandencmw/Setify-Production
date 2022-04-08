"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const axios_1 = __importDefault(require("axios"));
const PaginatedForm_1 = __importDefault(require("./paginatedform/PaginatedForm"));
const UserDropdown_1 = __importDefault(require("./UserDropdown"));
const ResultSuccess_1 = __importDefault(require("./ResultSuccess"));
const ResultFail_1 = __importDefault(require("./ResultFail"));
function LoggedInScreen() {
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token');
    const [user, setUser] = react_1.default.useState(null);
    const [newList, setNewList] = react_1.default.useState(null);
    const [tracks, setTracks] = react_1.default.useState(null);
    const [requestStatus, setRequestStatus] = react_1.default.useState(null);
    react_1.default.useEffect(() => {
        if (token) {
            (0, axios_1.default)({
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
        (0, axios_1.default)({
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
            return (<PaginatedForm_1.default user={user} mergePlaylists={mergePlaylists}/>);
        }
        else if (tracks != null && newList != null) {
            return (<ResultSuccess_1.default playlistInfo={newList} tracks={tracks} onReset={handleReset}/>);
        }
        else {
            return (<ResultFail_1.default />);
        }
    }
    if (user) {
        return (<div className='logged-in'>
                <UserDropdown_1.default username={user.displayName} userID={user.userID}/>
                {renderScreen()}
            </div>);
    }
    else {
        return <></>;
    }
}
exports.default = LoggedInScreen;
