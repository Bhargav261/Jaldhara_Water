import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarMenu } from './DaynamicSidebarMenu';

const Sidebar = () => {
    const location = useLocation();

    return (
        <>
            <nav class="sidebar sidebar-offcanvas" id="sidebar">
                <ul class="nav">
                    {
                        sidebarMenu.map((item) => {
                            const { url, icon, title, activeShow } = item;

                            return (
                                <li class={`nav-item ${activeShow?.includes(location.pathname) ? 'active' : ''}`}>
                                    <Link class="nav-link" to={url}>
                                        <i class={icon}></i>
                                        <span class="menu-title">{title}</span>
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>
                {/* <ul class="nav">
                    <li class={`nav-item ${location.pathname === '/app/dashboard' ? 'active' : ''}`}>
                        <Link class="nav-link" to="/app/dashboard">
                            <i class="icon-grid menu-icon"></i>
                            <span class="menu-title">Dashboard</span>
                        </Link>
                    </li>
                    <li class={`nav-item ${location.pathname === '/app/user' ? 'active' : ''} `}>
                        <Link class="nav-link" to="/app/user">
                            <i class="icon-head menu-icon"></i>
                            <span class="menu-title">User</span>
                        </Link>
                    </li>
                    <li class={`nav-item ${(location.pathname === '/app/whatsapp' || location.pathname === '/app/whatsapp/QR') ? 'active' : ''}`}>
                        <Link class="nav-link" to="/app/whatsapp/QR">
                            <i class="icon-cog menu-icon"></i>
                            <span class="menu-title">Whatsapp</span>
                        </Link>
                    </li>
                    <li class={`nav-item ${location.pathname === '/app/services' ? 'active' : ''}`}>
                        <Link class="nav-link" to="/app/services">
                            <i class="icon-cog  menu-icon"></i>
                            <span class="menu-title">Services</span>
                        </Link>
                    </li>
                </ul> */}
                {/* <li class={`nav-item`}>
                        <a class="nav-link" data-bs-toggle="collapse" href="#form-elements" aria-expanded="false" aria-controls="form-elements">
                            <i class="icon-columns menu-icon"></i>
                            <span class="menu-title">Form elements</span>
                            <i class="menu-arrow"></i>
                        </a>
                        <div class="collapse" id="form-elements">
                            <ul class="nav flex-column sub-menu">
                                <li class={`nav-item"><a class="nav-link" href="pages/forms/basic_elements.html">Basic Elements</a></l`}>
                                <li class={`nav-item"><a class="nav-link" href="pages/forms/advanced_elements.html">Advanced Elements</a></l`}>
                                <li class={`nav-item"><a class="nav-link" href="pages/forms/validation.html">Validation</a></l`}>
                                <li class={`nav-item"><a class="nav-link" href="pages/forms/wizard.html">Wizard</a></l`}>
                            </ul>
                        </div>
                    </li> */}
            </nav>
        </>
    )
}

export default Sidebar;