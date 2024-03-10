import Auth from '../Route/Auth';
import Home from '../Pages/Home';
import About from "../Pages/About";
import React, { useEffect } from "react";
import Employee from "../Pages/Employee";
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Sidebar from '../Components/Sidebar';
import ScrolltoTop from '../Components/ScrolltoTop';
import ClientPrivateRoute from './ClientPrivateRoute';
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

const AfterLoginRoute = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!Auth.isAuthenticated()) {
            navigate('/');
        }
    }, [navigate])

    return (
        <>
            <div class="container-scroller">
                <Header />
                <ScrolltoTop />
                <div class="container-fluid page-body-wrapper">
                    <Sidebar />
                    <div class="main-panel">
                        <Routes>
                            <Route element={<ClientPrivateRoute auth={Auth.isAuthenticated()} />} >
                                <Route exact path="/" element={<Home />} />
                                <Route exact path="/about" element={<About />} />
                                <Route exact path="/dashboard" element={<Home />} />
                                <Route exact path="/employee" element={<Employee />} />
                            </Route>
                            <Route path="*" element={<Navigate replace={true} to="/app" />} />
                        </Routes>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AfterLoginRoute;