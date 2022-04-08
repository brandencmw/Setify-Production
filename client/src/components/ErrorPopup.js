"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const Close_1 = __importDefault(require("@mui/icons-material/Close"));
function ErrorPopup(props) {
    function handleClick() {
        props.onClose();
    }
    return (<material_1.Collapse in={props.open}>
      <material_1.Alert severity="error" action={<material_1.IconButton aria-label="close" color="inherit" size="small" onClick={handleClick}>
            <Close_1.default fontSize="inherit"/>
          </material_1.IconButton>} sx={{ mb: 2 }}>
        <material_1.AlertTitle>Missing Data</material_1.AlertTitle>
        {props.text}
      </material_1.Alert>
    </material_1.Collapse>);
}
exports.default = ErrorPopup;
