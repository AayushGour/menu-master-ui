import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { routeNames } from '../../../utility/constants';

const Auth = (props) => {
    const location = useLocation();
    const isLoggedIn = localStorage.getItem('Name') && localStorage.getItem('PhotoUrl') && localStorage.getItem('Email') && localStorage.getItem('userID')
    return (
        isLoggedIn ? (location?.pathname === routeNames.BASE ? <Navigate to={"/dashboard/restaurants"} /> : <Outlet />) : <Navigate to={routeNames.SIGNIN} />
    )
}

export default Auth;