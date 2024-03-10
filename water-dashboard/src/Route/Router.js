import React from "react";
import Home from '../Pages/Home';
import About from "../Pages/About";
import Employee from "../Pages/Employee";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Sidebar from '../Components/Sidebar';
import ScrolltoTop from '../Components/ScrolltoTop';
import { Routes, Route, Navigate } from "react-router-dom";

const Router = () => {

    return (
        <>
            <div class="container-scroller">
                <Header />
                <ScrolltoTop />
                <div class="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div class="main-panel">
                        <Routes>
                            <Route exact path="/app" element={<Home />} />
                            <Route exact path="/app/about" element={<About />} />
                            <Route exact path="/app/dashboard" element={<Home />} />
                            <Route exact path="/app/employee" element={<Employee />} />
                            <Route path="*" element={<Navigate replace={true} to="/" />} />
                        </Routes>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Router;