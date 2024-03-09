import React from "react";
import Home from '../Pages/Home';
import About from "../Pages/About";
import { Routes, Route, Navigate } from "react-router-dom";

const Router = () => {

    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/about" element={<About />} />
                <Route path="*" element={<Navigate replace={true} to="/" />} />
            </Routes>
        </>
    )
}

export default Router;