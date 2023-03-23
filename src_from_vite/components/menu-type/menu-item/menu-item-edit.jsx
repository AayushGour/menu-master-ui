import { UploadFile } from '@mui/icons-material';
import { Avatar, Button, Slider, Switch, TextField } from '@mui/material';
import React, { useState } from 'react';
import NoSpiceImg from "../../../assets/img/no-spice.png";
import NonVegImg from "../../../assets/img/non-veg.png";
import Spice1 from "../../../assets/img/spice-1.png";
import Spice2 from "../../../assets/img/spice-2.png";
import Spice3 from "../../../assets/img/spice-3.png";
import VegImg from "../../../assets/img/veg.png";

import "./menu-item-edit.scss";

const MenuItemEditComponent = (props) => {
    const { data } = props;
    const [itemName, setItemName] = useState(data?.menu);
    const [itemDescription, setItemDescription] = useState(data?.description);

    return (
        <div className="menu-item-edit-container d-flex flex-row align-items-start gap-4 ps-4 py-2">
            <Button variant="text" component="label" className='upload-btn d-flex flex-column gap-2 p-3'>
                <UploadFile style={{ fontSize: "3rem" }} />
                Upload File
                <input hidden accept="image/*" multiple type="file" />
            </Button>
            <div className="menu-item-details d-flex flex-column align-items-start gap-3">
                <TextField variant='standard' className='menu-item-input' value={itemName} onChange={(e) => { setItemName(e?.target?.value) }} placeholder="Enter item name" />
                <TextField variant='standard' rows={3} multiline={true} className='menu-item-input' value={itemDescription} onChange={(e) => { setItemDescription(e?.target?.value) }} placeholder='Enter Description' />

            </div>
            <div className="menu-item-details d-flex flex-column align-items-start gap-3">
                <TextField variant='standard' className='menu-item-input' type="number" placeholder='Enter Price' />
                <TextField variant='standard' rows={3} multiline={true} className='menu-item-input' placeholder='Enter Ingredients' />
            </div>
            <div className="menu-item-details d-flex flex-column align-items-start gap-3">
                <div className='d-flex flex-row align-items-center justify-content-end'>
                    <span>Availability</span>
                    <Switch className='availability-toggle' />
                </div>
                <div className='d-flex flex-row align-items-center justify-content-end'>
                    <Avatar sx={{ height: 20, width: 20 }} variant='square' src={VegImg} />
                    <Switch className='veg-toggle' />
                    <Avatar sx={{ height: 20, width: 20 }} variant='square' src={NonVegImg} />
                </div>
                <div className='d-flex flex-row align-items-center w-100 gap-3 spice-stack'>
                    <Avatar sx={{ height: 40, width: 40 }} variant='square' src={NoSpiceImg} />
                    <Slider
                        className='w-100'
                        aria-label="Volume"
                        min={0}
                        max={3}
                        valueLabelFormat={(val) => {
                            switch (val) {
                                case 0:
                                    return <Avatar sx={{ height: 40, width: 40 }} variant='square' src={NoSpiceImg} />
                                case 1:
                                    return <Avatar sx={{ height: 40, width: 40 }} variant='square' src={Spice1} />
                                case 2:
                                    return <Avatar sx={{ height: 40, width: 40 }} variant='square' src={Spice2} />
                                case 3:
                                    return <Avatar sx={{ height: 40, width: 40 }} variant='square' src={Spice3} />
                            }
                        }}
                        valueLabelDisplay='auto'
                    />
                    <Avatar sx={{ height: 40, width: 40 }} variant='square' src={Spice3} />
                </div>
            </div>

        </div>
    )
}

export default MenuItemEditComponent;