import React from "react";
import Logo from "../../assets/images/SpotifyLogo.svg";
function LoginButton() {
    const [color, setColor] = React.useState("black");
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
        justifyContent: "center",
    };
    const logoStyle = {
        height: "36px",
        marginRight: "18px",
    };
    return (<a style={buttonStyle} onMouseEnter={buttonHover} onMouseLeave={buttonLeave} href="https://setify-merger.herokuapp.com/login">
      <img src={Logo} style={logoStyle} alt="Spotify logo"/>
      <h5 style={{ fontSize: "14px" }}>Connect with Spotify</h5>
    </a>);
}
export default LoginButton;
