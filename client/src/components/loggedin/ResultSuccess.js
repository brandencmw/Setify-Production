"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const List_1 = __importDefault(require("@mui/material/List"));
const ListItem_1 = __importDefault(require("@mui/material/ListItem"));
const ListItemAvatar_1 = __importDefault(require("@mui/material/ListItemAvatar"));
const Avatar_1 = __importDefault(require("@mui/material/Avatar"));
const ListItemText_1 = __importDefault(require("@mui/material/ListItemText"));
const URLBox_1 = __importDefault(require("./URLBox"));
const RepeatBox_1 = __importDefault(require("./RepeatBox"));
function ResultSuccess(props) {
    console.log(props.playlistInfo);
    return (<div className="result-success">
            <h2 className='form-prompt'>Your playlists have been merged<br />Check out the track list below</h2>
            <List_1.default>
                {props.tracks.map((track) => {
            return (<ListItem_1.default key={track.uri}>
                            <ListItemAvatar_1.default>
                                <Avatar_1.default src={track.imageURL}/>
                            </ListItemAvatar_1.default>
                            <ListItemText_1.default primary={track.name + ' - ' + track.artistName}/>
                        </ListItem_1.default>);
        })}
            </List_1.default>
            <URLBox_1.default url={props.playlistInfo.url}/>
            <RepeatBox_1.default onReset={props.onReset}/>
        </div>);
}
exports.default = ResultSuccess;
