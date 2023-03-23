import { PeopleAlt, Restaurant } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { routeNames } from '../../utility/constants';
import MMTooltip from '../../utility/mm-tooltip';
import "./left-sidebar.scss";

const sidebarItems = [
    {
        id: 1,
        icon: <Restaurant />,
        title: "Restaurants",
        route: routeNames.RESTAURANTS,
    },
    {
        id: 2,
        icon: <PeopleAlt />,
        title: "Manage Users",
        route: routeNames.USERS,
    }
]

const LeftSidebar = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <div className="left-sidebar">
            {sidebarItems?.map((sidebarItem, index) => {
                return <MMTooltip key={index} arrow title={sidebarItem?.title} placement='right'>
                    <button onClick={() => navigate(sidebarItem.route)} className={`sidebar-btn mm-btn ${location?.pathname?.split('/').pop() === sidebarItem.route ? "selected" : ""}`}>
                        {sidebarItem?.icon}
                    </button>
                </MMTooltip>
            })}
        </div>
    )
}

export default LeftSidebar;