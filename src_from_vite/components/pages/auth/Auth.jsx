import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { routeNames } from '../../../utility/constants';

const Auth = (props) => {
    const isLoggedIn = localStorage.getItem('Name') && localStorage.getItem('PhotoUrl') && localStorage.getItem('Email') && localStorage.getItem('userID')
    return (
        isLoggedIn ? <Outlet /> : <Navigate to={routeNames.SIGNIN} />
    )
}

export default Auth;