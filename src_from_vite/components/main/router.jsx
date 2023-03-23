import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/dashboard/dashboard';
import SignIn from '../pages/auth/signin';
import Auth from '../pages/auth/Auth';
import RestaurantListPage from '../pages/restaurant/restaurant-list';
import { routeNames } from "../../utility/constants";
import NoDataComponent from '../../utility/no-data-component/no-data-component';

const Router = (props) => {
    return (

        <Routes>
            <Route path={routeNames.SIGNIN} element={<SignIn />} />
            <Route path={routeNames.BASE} element={<Auth />}>
                <Route element={<Auth />} />
                <Route path={routeNames.DASHBOARD} element={<Dashboard />} >
                    <Route path={routeNames.USERS} element={<NoDataComponent />} />
                    <Route path={routeNames?.RESTAURANTS} element={<RestaurantListPage />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default Router;