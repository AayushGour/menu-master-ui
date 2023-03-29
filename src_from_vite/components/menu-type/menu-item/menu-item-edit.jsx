import { UploadFile } from '@mui/icons-material';
import { Autocomplete, Avatar, Button, Chip, Slider, Switch, TextField } from '@mui/material';
import React, { useState } from 'react';
import NoSpiceImg from "../../../assets/img/no-spice.png";
import NonVegImg from "../../../assets/img/non-veg.png";
import Spice1 from "../../../assets/img/spice-1.png";
import Spice2 from "../../../assets/img/spice-2.png";
import Spice3 from "../../../assets/img/spice-3.png";
import VegImg from "../../../assets/img/veg.png";
import MMTooltip from '../../../utility/mm-tooltip';
import { handleFileUpload } from '../../pages/restaurant/actions';

import "./menu-item-edit.scss";

const MenuItemEditComponent = (props) => {
    const { data, cancelCreation, submitForm } = props;
    const [fileList, setFileList] = useState([]);
    const [itemName, setItemName] = useState(data?.menu || "");
    const [itemDescription, setItemDescription] = useState(data?.description || "");
    const [itemPrice, setItemPrice] = useState(data?.price);
    const [itemIngredients, setItemIngredients] = useState(data?.ingredients?.split(", ") || []);
    const [availability, setAvailability] = useState(Boolean(data?.status1) || true);
    const [nonVeg, setNonVeg] = useState(!Boolean(data?.veg) ?? true);
    const [spiceLevel, setSpiceLevel] = useState(data?.spice || 0);

    const handleFormSubmit = async () => {
        const parentParams = Object.assign({}, data);
        delete parentParams.CImage;
        delete parentParams.brand;
        delete parentParams.cat;
        delete parentParams.menutype;
        delete parentParams.rest;
        const imageUrl = fileList?.length > 0 ? await handleFileUpload(fileList?.[0]) : data?.MImage || "";
        const submitParams = {
            ...parentParams,
            menu: itemName,
            description: itemDescription,
            price: itemPrice || 0,
            notes: "",
            MImage: imageUrl,
            status1: Number(availability),
            ingredients: itemIngredients?.join(", "),
            veg: Number(!nonVeg),
            spice: spiceLevel,
            rank1: data?.rank || 1,
        }
        submitForm(submitParams);
    }

    const handleCancel = () => {
        cancelCreation();
    }

    return (
        <div className="menu-item-edit-container d-flex flex-row align-items-start gap-4 p-3 justify-content-between my-3">
            <Button variant="text" component="label" className={`upload-btn d-flex flex-column gap-2 ${fileList?.length > 0 || (data?.MImage && data?.MImage !== "" && data?.MImage !== "null") ? "p-1" : "p-3"}`}>
                {
                    fileList?.length > 0 ?
                        <img src={fileList?.length > 0 ? window.URL.createObjectURL(fileList?.[0]) : ""} />
                        : !!data?.MImage && data?.MImage !== "" && data?.MImage !== "null" ?
                            <img src={data?.MImage} />
                            : <>
                                <UploadFile style={{ fontSize: "3rem" }} />
                                Upload File
                            </>
                }
                <input hidden accept="image/*" type="file" onChange={(e) => setFileList(e?.target?.files)} />
            </Button>
            <div className="menu-item-details d-flex flex-column align-items-start gap-3">
                <TextField variant='standard' required={true} className='menu-item-input' value={itemName} onChange={(e) => { setItemName(e?.target?.value) }} placeholder="Enter item title" label="Item Title" />
                <TextField variant='standard' rows={3} multiline={true} className='menu-item-input' value={itemDescription} onChange={(e) => { setItemDescription(e?.target?.value) }} placeholder='Enter Description' label="Description" />

            </div>
            <div className="menu-item-details d-flex flex-column align-items-start gap-3">
                <TextField variant='standard' className='menu-item-input' type="number" placeholder='Enter Price' value={itemPrice} onChange={(e) => setItemPrice(e?.target?.value)} label="Price" />
                <Autocomplete
                    multiple
                    id="tags-filled"
                    options={itemIngredients}
                    freeSolo
                    defaultValue={itemIngredients}
                    ListboxProps={{ sx: { maxHeight: "5rem", height: "5rem", overflow: 'auto' } }}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="filled" label={option} {...getTagProps({ index })} className='ingredient-chip' />
                        ))
                    }
                    onChange={(e, val, reason) => setItemIngredients(val)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Ingredients"
                            placeholder="Enter Ingredient & press enter"
                            className='ingredient-input'
                        />
                    )}
                />
            </div>
            <div className="menu-item-details d-flex flex-column align-items-start gap-3">
                <div className='d-flex flex-row align-items-center justify-content-end pe-1'>
                    {/* <span>Availability</span>
                    <Switch defaultChecked={availability} onChange={(e) => setAvailability(e?.target?.checked)} className='availability-toggle' /> */}
                    <MMTooltip arrow title={"Click to toggle"} placement='left'>
                        <Chip
                            className='font-0_9rem'
                            label={availability ? "Available" : "Not Available"}
                            color={availability ? "success" : "error"}
                            onClick={() => { setAvailability(!availability) }}
                        />
                    </MMTooltip>
                </div>
                <div className='d-flex flex-row align-items-center justify-content-end pe-3'>
                    <Avatar sx={{ height: 20, width: 20 }} variant='square' src={VegImg} />
                    <Switch className='veg-toggle' defaultChecked={nonVeg} onChange={(e) => setNonVeg(e?.target?.checked)} />
                    <Avatar sx={{ height: 20, width: 20 }} variant='square' src={NonVegImg} />
                </div>
                <div className='d-flex flex-row align-items-center w-100 gap-3 spice-stack pe-2'>
                    <Avatar sx={{ height: 40, width: 40 }} variant='square' src={NoSpiceImg} />
                    <Slider
                        className='w-100'
                        aria-label="Volume"
                        min={0}
                        max={3}
                        marks
                        value={spiceLevel}
                        onChange={(e, newValue) => setSpiceLevel(newValue)}
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
                <div className='d-flex flex-row gap-3 align-items-center justify-content-end pe-3 mt-3'>
                    <button className='mm-btn mx-0' onClick={handleCancel}>Cancel</button>
                    <button disabled={itemName === "" || itemPrice === ""} className='mm-btn primary mx-0' onClick={handleFormSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default MenuItemEditComponent;