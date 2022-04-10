import React from 'react';
import Body from './Body';
import Navbar from './navbar/Navbar';
import Footer from './Footer';
const containerStyle = {
    backgroundColor: "#191414",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
};
function App() {
    return (<div style={containerStyle}>
            <Navbar />
            <Body />
            <Footer />
        </div>);
}
export default App;
