"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ContentCopy_1 = __importDefault(require("@mui/icons-material/ContentCopy"));
const Tooltip_1 = __importDefault(require("@mui/material/Tooltip"));
function URLBox(props) {
    return (<div className='url-wrapper'>
            <p>Share this playlist with your friends</p>
            <Tooltip_1.default title='Copy' placement='top-end'>
                <div className='url-box'>
                    <p className='url-text'>{props.url.length > 30 ? `${props.url.substring(0, 50)}...` : props.url}</p>
                    <ContentCopy_1.default />
                </div>
            </Tooltip_1.default>
        </div>);
}
exports.default = URLBox;
