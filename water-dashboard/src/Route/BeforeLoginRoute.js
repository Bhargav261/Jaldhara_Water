import Auth from '../Route/Auth';
import Login from '../Pages/Login';
import ClientPublicRoute from './ClientPublicRoute';
import { Route, Routes, Navigate } from 'react-router-dom';

const BeforeLoginRoute = () => {
    return (
        <>
            <Routes>
                <Route element={<ClientPublicRoute auth={Auth.isAuthenticated()} />} >
                    <Route path="/" element={<Login />} />
                </Route>
                <Route path="*" element={<Navigate replace={true} to="/" />} />
            </Routes>
        </>
    );
};

export default BeforeLoginRoute;
