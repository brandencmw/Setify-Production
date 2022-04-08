"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const LoggedOutScreen_1 = __importDefault(require("./loggedout/LoggedOutScreen"));
const LoggedInScreen_1 = __importDefault(require("./loggedin/LoggedInScreen"));
const bodyStyle = {
    color: "white",
    flexGrow: "1",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: "40px"
};
function Body() {
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token');
    let disp;
    if (token != null && token !== '') {
        disp = <LoggedInScreen_1.default />;
    }
    else {
        disp = <LoggedOutScreen_1.default />;
    }
    return (<div style={bodyStyle}>
            {disp}
        </div>);
}
exports.default = Body;
