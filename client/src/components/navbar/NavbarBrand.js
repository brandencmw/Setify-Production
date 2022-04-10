import React from "react";
const navBrandStyle = {
    fontSize: "24px",
    color: "#1DB954",
};
const appName = "{ Setify }";
function NavbarBrand() {
    return (<h4 style={navBrandStyle}>{appName}</h4>);
}
export default NavbarBrand;
