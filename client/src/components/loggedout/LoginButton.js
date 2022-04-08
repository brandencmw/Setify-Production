"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const SpotifyLogo_svg_1 = __importDefault(require("../../assets/images/SpotifyLogo.svg"));
function LoginButton() {
    const [color, setColor] = react_1.default.useState("black");
    function buttonHover() {
        setColor("#1DB954");
    }
    function buttonLeave() {
        setColor("#191616");
    }
    const buttonStyle = {
        height: "auto",
        width: "auto",
        padding: "0 40px",
        border: "2px solid #1DB954",
        borderRadius: "40px",
        backgroundColor: color,
        color: "white",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    };
    const logoStyle = {
        height: "36px",
        marginRight: "18px"
    };
    return (<a style={buttonStyle} onMouseEnter={buttonHover} onMouseLeave={buttonLeave} href="http://localhost:5000/login">
            <img src={SpotifyLogo_svg_1.default} style={logoStyle} alt='Spotify logo'/>
            <h5 style={{ fontSize: "14px" }}>Connect with Spotify</h5>
        </a>);
}
exports.default = LoginButton;
