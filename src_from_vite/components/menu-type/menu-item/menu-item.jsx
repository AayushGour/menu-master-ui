import { DragIndicator, ImageNotSupported, MoreVert } from '@mui/icons-material';
import { Avatar, Chip, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import NonVegImg from "../../../assets/img/non-veg.png";
import VegImg from "../../../assets/img/veg.png";
import { updateMenuItem } from '../actions';
import MenuItemEditComponent from './menu-item-edit';
import NoSpiceImg from "../../../assets/img/no-spice.png";
import Spice1 from "../../../assets/img/spice-1.png";
import Spice2 from "../../../assets/img/spice-2.png";
import Spice3 from "../../../assets/img/spice-3.png";
import "./menu-item.scss";
import MMTooltip from '../../../utility/mm-tooltip';

const MenuItemComponent = (props) => {
    const { item, itemSelected, dragHandleProps, refreshMenuDetails } = props;
    const [isMenuItemEditing, setIsMenuItemEditing] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event?.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemUpdate = (submitParams) => {

        const paramsList = ["menu", "spice", "price", "veg", "description", "ingredients", "menuid", "MImage"]
        Object.keys(submitParams)?.map((key) => !paramsList.includes(key) ? delete submitParams[key] : null)
        // console.log(submitParams)
        updateMenuItem(submitParams).then(() => {
            refreshMenuDetails();
        })
    }

    if (isMenuItemEditing) {
        return <MenuItemEditComponent
            cancelCreation={() => setIsMenuItemEditing(false)}
            data={item}
            submitForm={handleMenuItemUpdate}
        />
    }

    // console.log(item)
    return (
        <div className="menu-item-container w-100 d-flex flex-row mb-3">
            <DragIndicator className='dragger my-auto me-2' {...dragHandleProps} />
            <Avatar className='item-image' sx={{ height: 100, width: 100 }} variant='square' src={item?.MImage} >
                <ImageNotSupported sx={{ fontSize: "3rem" }} />
            </Avatar>
            <div className="menu-details-header d-flex flex-column align-items-start flex-grow-1 gap-1 px-2 mt-2">
                <div className="d-flex flex-row justify-content-between align-items-center w-100">
                    <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                        <Avatar sx={{ height: 20, width: 20 }} variant='square' src={item?.veg === 1 ? VegImg : NonVegImg} />
                        <h4 className='mb-0'>{item?.menu}</h4>
                    </div>
                    <h4 className='mb-0'>₹ {item?.price}</h4>
                </div>
                <div className="d-flex flex-row justify-content-start align-items-start w-100 ps-4 ms-1 gap-3">
                    <p title={item?.description} className='para-text mt-2 menu-item-description w-50 text-start mb-0'><b>Description: </b>{item?.description || "-"}</p>
                    <p title={item?.ingredients} className='para-text mt-2 menu-item-ingredients w-25 text-start mb-0'><b>Ingredients: </b>{item?.ingredients || "-"}</p>
                    <div className="d-flex flex-row align-items-start w-25 justify-content-between">
                        <div className='text-start mb-0 spice-detail d-flex flex-row align-items-center gap-2'>
                            <b>Spice: </b>
                            <MMTooltip arrow title={item?.spice} placement='right'>
                                <Avatar sx={{ height: 40, width: 40 }} variant='square' src={item?.spice === 3 ? Spice3 : item?.spice === 2 ? Spice2 : item?.spice === 1 ? Spice1 : NoSpiceImg} />
                            </MMTooltip>
                        </div>
                        <Chip
                            label={item?.status1 === 1 ? "Available" : "Not Available"}
                            color={item?.status1 === 1 ? "success" : "error"}
                            onClick={() => { console.log(item?.status1) }}
                        />
                    </div>
                </div>
            </div>
            <>
                <button
                    id="menu-button"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleMenuOpen}
                    className="mm-icon-btn ghost my-auto ms-3 d-flex flex-column align-items-center justify-content-center p-2"
                >
                    <MoreVert />
                </button>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="menu-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={() => { setIsMenuItemEditing(true); handleMenuClose(); }}>Edit Item</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Delete Item</MenuItem>
                </Menu>
            </>
        </div >
    )
}

export default MenuItemComponent;