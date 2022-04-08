"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Body_1 = __importDefault(require("./Body"));
const Navbar_1 = __importDefault(require("./navbar/Navbar"));
const Footer_1 = __importDefault(require("./Footer"));
const containerStyle = {
    backgroundColor: "#191414",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
};
function App() {
    return (<div style={containerStyle}>
            <Navbar_1.default />
            <Body_1.default />
            <Footer_1.default />
        </div>);
}
exports.default = App;
