import React from 'react';
import {Navigate, Outlet } from 'react-router-dom';

const ClientPublicRoute = ({ auth }) => {

    return (
        <>
            {auth ? <Navigate to="/app/dashboard" /> : <Outlet />}
        </>
    );
}

export default ClientPublicRoute;