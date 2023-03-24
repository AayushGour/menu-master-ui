import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import PlanForm from './plan-form';

const RestaurantForm = (props) => {
    const { details, onValueChange, className, type, onCancel, onSubmit, brandList } = props;
    const handleChange = (key, value) => {
        const formDetails = {
            [key]: value
        }
        onValueChange((prev) => ({ ...prev, ...formDetails }));
    }
    const handleCancel = () => {
        onCancel();
    }
    const handleSubmit = () => {
        onSubmit();
    }
    return (
        <div className={`d-flex flex-column align-items-start ${className ?? ""}`}>
            <h5 className='text-center my-3'>Create your restaurant</h5>
            {/* <TextField className='w-50' label="Brand Name" variant="standard" onChange={(e) => handleChange('test', e)} /> */}
            {type === "rest" ?
                <>
                    <div className="d-flex flex-row align-items-center w-100">
                        <TextField className='w-50 me-3' label="Restaurant Name" variant="standard" onChange={(e) => handleChange('rest', e?.target?.value)} />
                        <FormControl className='w-50 mt-auto ms-3 select-brand-control'>
                            <InputLabel style={{ left: "-15px" }}>Select Brand</InputLabel>
                            <Select
                                className='mm-select h-100'
                                variant='standard'
                                onChange={(e) => handleChange('brandid', e.target.value)}
                            // label="Select Brand"
                            >
                                {brandList?.map((brand, index) => {
                                    return <MenuItem key={index} value={brand?.brandid}>{brand?.brand}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </div>
                    <PlanForm onValueChange={(v) => handleChange('plan', { ...v })} />
                    <div className="d-flex flex-row align-items-center w-100 justify-content-end gap-3 mt-4">
                        <button className='mm-btn m-0' onClick={handleCancel}>Cancel</button>
                        {console.log(details?.rest)}
                        <button disabled={(!details?.rest || details?.rest === "") || (!details?.brandid || details?.brandid === "") || (!details?.plan?.plan_id || details?.plan?.plan_id == "")} className='mm-btn primary m-0' onClick={handleSubmit}>Submit</button>
                    </div>
                </>
                : <>
                    <TextField className='w-50' label="Restaurant Name" variant="standard" onChange={(e) => handleChange('rest', e?.target?.value)} />
                </>
            }
        </div >
    )
}

export default RestaurantForm;