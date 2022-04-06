import React from "react";
import CSS from "csstype";

const navLinkStyle: CSS.Properties = {
    margin: "auto 10px",
    color: "white",
    textDecoration: "none"
}

interface linkText {
    text: string,
    link: string
}

function NavbarLink(props:linkText) {
    return (
        <a href={props.link} style={navLinkStyle}><h4>{props.text}</h4></a>
    );
}

export default NavbarLink;