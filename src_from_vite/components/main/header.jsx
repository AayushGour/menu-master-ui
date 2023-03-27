import { Avatar, Dialog, Menu, MenuItem } from '@mui/material';
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
            console.error(error);
        }
    };

    const handleProfileMenuClick = (event) => {
        setDropdownAnchor(event?.target)
    }

    return (
        <div className='mm-header'>
            {/* <Dialog className='create-brand-dialog' open={isCreateBrandCardOpen} onClose={() => setIsCreateBrandCardOpen(false)}>
                <CreateBrandCard refreshBrandList={refreshBrandList} className="w-100" />
            </Dialog> */}
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
                    <img className='h-100' src={localStorage.getItem('PhotoUrl')} referrerpolicy="no-referrer" />
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
                    <MenuItem disableTouchRipple disabled >Create Brand</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default MMHeader;