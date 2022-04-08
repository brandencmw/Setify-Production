"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const FormControl_1 = __importDefault(require("@mui/material/FormControl"));
const InputLabel_1 = __importDefault(require("@mui/material/InputLabel"));
const Select_1 = __importDefault(require("@mui/material/Select"));
const MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
function UserDropdown(props) {
    const message = props.username == null ? 'You are not logged in' : 'Welcome, ' + props.username;
    const [value, setValue] = react_1.default.useState('');
    function handleChange(event) {
        setValue(event.target.value);
    }
    return (<div className="user-dropdown">
            <FormControl_1.default variant="standard" sx={{ m: 1, minWidth: 260 }}>
                <InputLabel_1.default id="demo-simple-select-standard-label">{message}</InputLabel_1.default>
                <Select_1.default labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={value} onChange={handleChange} label={message} className="user-select">
                <a href="http://localhost:5000/logout" className="logout-link"><MenuItem_1.default value='Logout'>Logout</MenuItem_1.default></a>
                </Select_1.default>
            </FormControl_1.default>
        </div>);
}
exports.default = UserDropdown;
