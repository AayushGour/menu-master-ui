import React from 'react';
import { Outlet } from 'react-router-dom';
import MMHeader from '../../main/header';
import LeftSidebar from '../../main/left-sidebar';
import "./dashboard.scss"

const Dashboard = (props) => {
    return (
        <div className="dashboard-container h-100 w-100">
            <MMHeader />
            <div className="main-content-container w-100 d-flex flex-row">
                <LeftSidebar />
                <div className="content-container">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;