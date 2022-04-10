import React from "react";
const navLinkStyle = {
    margin: "auto 10px",
    color: "white",
    textDecoration: "none"
};
function NavbarLink(props) {
    return (<a href={props.link} style={navLinkStyle}><h4>{props.text}</h4></a>);
}
export default NavbarLink;
