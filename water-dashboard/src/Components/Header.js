import React from "react";
import auth from '../Route/Auth';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

    const navigate = useNavigate();

    const Logout = () => {
        auth.logout();
        navigate('/');
    }

    const activeSidebar = () => {
        var element = document.getElementById("sidebar");
        element.classList.toggle("active");
    }

    return (
        <>
            <nav class="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
                <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-start">
                    <Link class="navbar-brand brand-logo me-5" to="/app"><img src="/images/Fruxinfo_Logo.png" class="me-2" alt="logo" /></Link>
                    <Link class="navbar-brand brand-logo-mini" to="/app"><img src="/images/Fruxinfo_Logo.png" alt="logo" /></Link>
                </div>
                <div class="navbar-menu-wrapper d-flex align-items-center justify-content-end">
                    <button class="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
                        <span class="icon-menu"></span>
                    </button>
                    <ul class="navbar-nav mr-lg-2">
                    </ul>
                    <ul class="navbar-nav navbar-nav-right">
                        <li class="nav-item nav-profile dropdown">
                            <div class="cursor-pointer nav-link dropdown-toggle" data-bs-toggle="dropdown" id="profileDropdown">
                                <img src="/images/faces/face28.jpg" alt="profile" />
                            </div>
                            <div class="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
                                <div class="dropdown-item" onClick={Logout}>
                                    <i class="ti-power-off text-primary"></i>
                                    Logout
                                </div>
                            </div>
                        </li>
                    </ul>
                    <button class="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas" onClick={activeSidebar}>
                        <span class="icon-menu"></span>
                    </button>
                </div>
            </nav>
        </>
    )
}

export default Header;