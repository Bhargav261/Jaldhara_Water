import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, Navigate, useRoutes, useNavigate } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import UserList from '../Pages/UserList';
import Header from '../Components/Header';
// import Header from '@components/Header';
import Sidebar from '../Components/Sidebar';
import Footer from '../Components/Footer';
import Auth from '../Route/Auth';
import AddUser from '../Pages/AddUser';
import ClientPrivateRoute from './ClientPrivateRoute';
import Whatsapp from '../Pages/Whatsapp';
import Services from '../Pages/Services';
import QRCodePage from '../Pages/QRCodePage';
import ScrolltoTop from '../Components/ScrolltoTop';
import LazyRouteElement from './LazyRouteElement';
import { userRoute } from './DaynamicRoute';
import { fetchUserType } from '../Service/service';
// import QRCodePage from '@pages/QRCodePage';

const AfterLoginRoute = () => {

    const userType = fetchUserType();
    const navigate = useNavigate();

    useEffect(() => {
        if (!Auth.isAuthenticated()) {
            navigate('/');
        }
    }, [])

    return (
        <div class="container-scroller">
            <Header />
            <ScrolltoTop />
            <div class="container-fluid page-body-wrapper">
                <Sidebar />
                <div class="main-panel">

                    <Routes>
                        <Route element={<ClientPrivateRoute auth={Auth.isAuthenticated()} />} >
                            {userRoute?.length && userRoute.map((item) => {
                                const { path, exact = false, component, access } = item;

                                if (!access?.includes(userType)) {
                                    return false;
                                }

                                return (
                                    <Route
                                        key={component}
                                        path={path}
                                        element={<LazyRouteElement component={component} />}
                                        exact={exact}
                                    />
                                );
                            })}
                        </Route>
                        <Route path="*" element={<Navigate replace={true} to="/app" />} />
                    </Routes>

                    {/* <Routes>
                        <Route element={<ClientPrivateRoute auth={Auth.isAuthenticated()} />} >
                            <Route exact path="/" element={<Dashboard />} />
                            <Route exact path="/dashboard" element={<Dashboard />} />
                            <Route path="/user">
                                <Route path="add" element={<AddUser />} />
                                <Route index element={<UserList />} />
                            </Route>
                            <Route exact path="/user" element={<UserList />} />
                            <Route exact path="/user/add" element={<AddUser />} />
                            <Route exact path="/whatsapp/QR" element={<QRCodePage />} />
                            <Route exact path="/whatsapp" element={<Whatsapp />} />
                            <Route exact path="/services" element={<Services />} />
                        </Route>
                        <Route path="*" element={<Navigate replace={true} to="/app" />} />
                    </Routes> */}
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AfterLoginRoute;
