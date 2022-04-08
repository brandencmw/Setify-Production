"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const NavbarBrand_1 = __importDefault(require("./NavbarBrand"));
const NavbarLink_1 = __importDefault(require("./NavbarLink"));
const navbarStyle = {
    padding: "10px 40px",
    height: "50px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "PlusJakartaSans",
    color: "white"
};
const navLinksStyle = {
    display: "flex",
    flexDirection: "inherit",
};
function Navbar() {
    return (<div style={navbarStyle}>
            <NavbarBrand_1.default />
            <div style={navLinksStyle}>
                <NavbarLink_1.default link="" text="About"/>
                <NavbarLink_1.default link="" text="Contact"/>
            </div>
        </div>);
}
exports.default = Navbar;
