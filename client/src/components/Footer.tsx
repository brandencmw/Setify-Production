import React from "react";
import CSS from "csstype";

const footerStyle: CSS.Properties = {
    marginTop: "auto",
    height: "50px",
    width: "100%"
}

function Footer() {
    return(
        <footer style={footerStyle}>
            <p>©Branden Wheeler {new Date().getFullYear()}</p>
        </footer>
    );
}

export default Footer