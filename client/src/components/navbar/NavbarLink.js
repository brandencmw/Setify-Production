"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const navLinkStyle = {
    margin: "auto 10px",
    color: "white",
    textDecoration: "none"
};
function NavbarLink(props) {
    return (<a href={props.link} style={navLinkStyle}><h4>{props.text}</h4></a>);
}
exports.default = NavbarLink;
