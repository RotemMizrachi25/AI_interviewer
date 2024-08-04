// Filename - App.js

import React from "react";
import Nav from "./nav";
import {
    HashRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import {Home} from "./pages/home";
import Simulation from "./pages/simulation"
import {Page1} from "./pages/page1";


function App() {
    return (
        <>
            <Router>
                <Nav/>
                <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/simulation" element={<Simulation />} />
                        <Route path="/page1" element={<Page1 />} />

                </Routes>
            </Router>
        </>
    );
}

export default App;