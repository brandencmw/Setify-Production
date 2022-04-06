import React from "react";
import CSS from "csstype";
import NavbarBrand from "./NavbarBrand";
import NavbarLink from "./NavbarLink";

const navbarStyle: CSS.Properties = {
    padding: "10px 40px",
    height: "50px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "PlusJakartaSans",
    color: "white"
};

const navLinksStyle: CSS.Properties = {
    display: "flex",
    flexDirection: "inherit",
};

function Navbar() {
    return(
        <div style={navbarStyle}>
            <NavbarBrand />
            <div style={navLinksStyle}>
                <NavbarLink link="" text="About"/>
                <NavbarLink link="" text="Contact"/>
            </div>
        </div>
    );
}

export default Navbar;