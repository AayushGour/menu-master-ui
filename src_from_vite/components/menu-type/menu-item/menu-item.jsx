import { DragIndicator, ImageNotSupported, MoreVert } from '@mui/icons-material';
import { Avatar, Chip, FormControl, InputLabel, Menu, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import NonVegImg from "../../../assets/img/non-veg.png";
import VegImg from "../../../assets/img/veg.png";
import { deleteMenuItem, updateMenuItem, updateMenuItemAvailability } from '../actions';
import MenuItemEditComponent from './menu-item-edit';
import NoSpiceImg from "../../../assets/img/no-spice.png";
import Spice1 from "../../../assets/img/spice-1.png";
import Spice2 from "../../../assets/img/spice-2.png";
import Spice3 from "../../../assets/img/spice-3.png";
import "./menu-item.scss";
import MMTooltip from '../../../utility/mm-tooltip';
import MMLoader from '../../../utility/loader/mm-loader';

const MenuItemComponent = (props) => {
    const { item, itemSelected, dragHandleProps, refreshMenuDetails } = props;
    const [isMenuItemEditing, setIsMenuItemEditing] = useState(false);
    const [editItemParam, setEditItemParam] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event?.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemUpdate = (submitParams) => {
        setIsLoading(true)
        const paramsList = ["menu", "spice", "price", "veg", "description", "ingredients", "menuid", "MImage"]
        Object.keys(submitParams)?.map((key) => !paramsList.includes(key) ? delete submitParams[key] : null)
        updateMenuItem(submitParams).then(() => {
            refreshMenuDetails();
        }).finally(() => {
            setIsLoading(false)
        })
    }

    const handleMenuItemDelete = () => {
        handleMenuClose();
        deleteMenuItem({ menuid: item?.menuid }).then(() => {
            refreshMenuDetails();
        });
    };

    const handleEditItemParam = (editedItem = editItemParam) => {
        if (editedItem?.value !== item?.[editedItem?.name]) {
            const newItem = Object.assign({}, item, { [editItemParam?.name]: editedItem?.value })
            handleMenuItemUpdate(newItem);
        }
        setEditItemParam({})
    }

    const handleAvailabilityToggle = () => {
        setIsLoading(true)
        const submitParams = Object.assign({}, item, { status1: item?.status1 === 0 ? 1 : 0 })
        const paramsList = ["menuid", "brandid", "status1"]
        Object.keys(submitParams)?.map((key) => !paramsList.includes(key) ? delete submitParams[key] : null)
        updateMenuItemAvailability(submitParams).then(() => {
            refreshMenuDetails();
        }).finally(() => {
            setIsLoading(false)
        })
    }

    if (isMenuItemEditing) {
        return <MenuItemEditComponent
            cancelCreation={() => setIsMenuItemEditing(false)}
            data={item}
            submitForm={handleMenuItemUpdate}
        />
    }

    return (
        <div className="menu-item-container w-100 d-flex flex-row mb-3">
            {isLoading ? <MMLoader className="overlay" /> : <></>}
            <DragIndicator className='dragger my-auto me-2' {...dragHandleProps} />
            <Avatar className='item-image' sx={{ height: 100, width: 100 }} variant='square' src={item?.MImage} >
                <ImageNotSupported sx={{ fontSize: "3rem" }} />
            </Avatar>
            <div className="menu-details-header d-flex flex-column align-items-start flex-grow-1 gap-3 px-2 mt-2">
                <div className="d-flex flex-row justify-content-between align-items-center w-100">
                    <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                        <Avatar sx={{ height: 20, width: 20 }} variant='square' src={item?.veg === 1 ? VegImg : NonVegImg} />
                        {editItemParam?.name === "menu" ?
                            <TextField autoFocus variant='standard' required={true} className='menu-item-input' onBlur={() => handleEditItemParam()} value={editItemParam?.value} onChange={(e) => { setEditItemParam({ ...editItemParam, value: e?.target?.value }) }} placeholder="Enter item title" label="Item Title" />
                            :
                            <MMTooltip arrow title={"Click to edit"} placement='right'>
                                <h4 style={{ cursor: "pointer" }} title="Click to edit" onClick={() => setEditItemParam({ name: 'menu', value: item?.menu })} className='mb-0'>{item?.menu}</h4>
                            </MMTooltip>
                        }
                    </div>
                    {editItemParam?.name === "price" ?
                        <TextField autoFocus variant='standard' className='menu-item-input' type="number" placeholder='Enter Price' onBlur={() => handleEditItemParam()} value={editItemParam?.value} onChange={(e) => setEditItemParam({ name: "price", value: e?.target?.value })} label="Price" />

                        :
                        <MMTooltip arrow title={"Click to edit"} placement='left'>
                            <h4 style={{ cursor: "pointer" }} title="Click to edit" onClick={() => setEditItemParam({ name: 'price', value: item?.price })} className='mb-0'>₹ {item?.price}</h4>
                        </MMTooltip>
                    }
                </div>
                <div className="d-flex flex-row justify-content-start align-items-start w-100 ps-4 ms-1 gap-3">
                    <p title={item?.description} className='para-text mt-2 menu-item-description w-50 text-start mb-0'>{item?.description || "-"}</p>
                    <p title={item?.ingredients} className='para-text mt-2 menu-item-ingredients w-25 text-start mb-0'><b>Ingredients: </b>{item?.ingredients || "-"}</p>
                    <div className="d-flex flex-row align-items-start w-25 justify-content-between">
                        {editItemParam?.name === "spice" ?
                            <FormControl variant='standard' className='select-brand-control'>
                                <InputLabel id="spice-level-label">Spice</InputLabel>
                                <Select
                                    defaultOpen={true}
                                    className="mm-select"
                                    labelId="spice-level-label"
                                    value={editItemParam?.value}
                                    label="Spice"
                                    variant='standard'
                                    onChange={(e) => handleEditItemParam({ name: "spice", value: e?.target?.value })}
                                    onBlur={() => handleEditItemParam()}
                                >
                                    <MenuItem value={0}>Not Spicy</MenuItem>
                                    <MenuItem value={1}>Low</MenuItem>
                                    <MenuItem value={2}>Medium</MenuItem>
                                    <MenuItem value={3}>Hot</MenuItem>
                                </Select>
                            </FormControl>
                            :
                            <div className='text-start mb-0 spice-detail d-flex flex-row align-items-center gap-2'>
                                <b>Spice: </b>
                                <MMTooltip arrow title={item?.spice === 3 ? "Hot" : item?.spice === 2 ? "Medium" : item?.spice === 1 ? "Low" : "Not spicy"} placement='right'>
                                    <Avatar title="Click to edit" style={{ cursor: "pointer" }} onClick={() => setEditItemParam({ name: "spice", value: item?.spice })} sx={{ height: 40, width: 40 }} variant='square' src={item?.spice === 3 ? Spice3 : item?.spice === 2 ? Spice2 : item?.spice === 1 ? Spice1 : NoSpiceImg} />
                                </MMTooltip>
                            </div>
                        }

                        <MMTooltip arrow title={"Click to toggle"} placement='left'>
                            <Chip
                                className='my-auto'
                                label={item?.status1 === 1 ? "Available" : "Not Available"}
                                color={item?.status1 === 1 ? "success" : "error"}
                                onClick={handleAvailabilityToggle}
                            />
                        </MMTooltip>
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
                    <MenuItem onClick={handleMenuItemDelete}>Delete Item</MenuItem>
                </Menu>
            </>
        </div >
    )
}

export default MenuItemComponent;