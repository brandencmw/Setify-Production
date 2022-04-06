import React from "react";
import CSS from "csstype";
import LoginButton from "./LoginButton";

const loggedOutSectionStyle: CSS.Properties = {
    width: "500px",
    maxWidth: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-evenly",
}

function LoggedOutScreen() {
    return (
        <section style={loggedOutSectionStyle}>
            <h1 style={{fontSize:"60px", margin: "0"}}>Welcome</h1>
            <h2 style={{fontSize: "30px", margin: "0"}}>Please sign in with your Spotify account to continue</h2>
            <LoginButton />
        </section>
        );
}

export default LoggedOutScreen;