import React from "react";
import CSS from "csstype";

const navBrandStyle: CSS.Properties = {
    fontSize: "24px",
    color: "#1DB954",
}

const appName = "{ Setify }";

function NavbarBrand() {
    return (
        <h4 style={navBrandStyle}>{appName}</h4>
    );
}

export default NavbarBrand