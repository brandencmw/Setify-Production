import React from "react";
import { Collapse, Alert, IconButton, AlertTitle } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface popupProps {
  onClose: any;
  text: string;
  open: boolean;
}

function ErrorPopup(props: popupProps) {
  function handleClick() {
    props.onClose();
  }

  return (
    <Collapse in={props.open}>
      <Alert
        severity="error"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClick}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        <AlertTitle>Missing Data</AlertTitle>
        {props.text}
      </Alert>
    </Collapse>
  );
}

export default ErrorPopup;
