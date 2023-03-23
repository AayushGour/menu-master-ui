import { Avatar, Menu, MenuItem } from '@mui/material';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MenuMasterLogo from "../../assets/img/menu-master-logo.png"
import { routeNames } from '../../utility/constants';
import { auth } from '../pages/auth/firebase';
import "./header.scss";

const MMHeader = (props) => {
    const [dropdownAnchor, setDropdownAnchor] = useState();
    const open = Boolean(dropdownAnchor);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate(routeNames.SIGNIN);
        } catch (error) {
            console.log(error);
        }
    };

    const handleProfileMenuClick = (event) => {
        setDropdownAnchor(event?.target)
    }

    return (
        <div className='mm-header'>
            <a href={`${routeNames.DASHBOARD}/${routeNames.RESTAURANTS}`}>
                <img src={MenuMasterLogo} alt="Menu Master Logo" />
            </a>
            <div className="profile-dropdown">
                <Avatar
                    src={localStorage.getItem('PhotoUrl')}
                    sx={{ width: 40, height: 40 }}
                    aria-controls={open ? 'profile-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    className='header-btn'
                    onClick={handleProfileMenuClick}
                >
                    Logout
                </Avatar>
                <Menu
                    id="profile-menu"
                    anchorEl={dropdownAnchor}
                    open={open}
                    onClose={() => handleProfileMenuClick(null)}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem disableTouchRipple >Hi {localStorage.getItem("Name")}</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default MMHeader;