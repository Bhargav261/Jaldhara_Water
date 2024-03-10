import React from 'react';
import {Navigate, Outlet } from 'react-router-dom';

const ClientPrivateRoute = ({ auth }) => {

    return (
        <>
            {auth ? <Outlet /> : <Navigate to="/" />}
        </>
    );
}

export default ClientPrivateRoute;