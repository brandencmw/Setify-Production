"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const FormButton_1 = __importDefault(require("../FormButton"));
const TrashIcon_svg_1 = __importDefault(require("../../../../assets/images/TrashIcon.svg"));
const Select_1 = __importDefault(require("@mui/material/Select"));
const FormControl_1 = __importDefault(require("@mui/material/FormControl"));
const MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
const InputLabel_1 = __importDefault(require("@mui/material/InputLabel"));
function PlaylistDropdown(props) {
    const [value, setValue] = react_1.default.useState(props.value);
    function handleChange(event) {
        setValue(event.target.value);
        props.onChange(event);
    }
    return (<div className='playlist-dropdown'>
            <FormControl_1.default sx={{ m: 1, minWidth: 500 }}>
                <InputLabel_1.default sx={{ color: 'white' }}>Select a playlist</InputLabel_1.default>
                <Select_1.default className='playlist-select' id={props.selectID} label="Select a playlist" labelId="demo-simple-select-helper-label" name={props.selectID} onChange={handleChange} value={value} variant='outlined'>
                    {props.playlists.map((playlist) => {
            return (<MenuItem_1.default id={props.selectID} value={playlist.id}>{playlist.name}</MenuItem_1.default>);
        })}
                </Select_1.default>
            </FormControl_1.default>
            <FormButton_1.default icon={TrashIcon_svg_1.default} iconLoc='left' text='' onClick={props.onRemove} buttonID={props.selectID}/> 
        </div>);
}
exports.default = PlaylistDropdown;
