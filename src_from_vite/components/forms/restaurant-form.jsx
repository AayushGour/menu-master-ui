import { TextField } from '@mui/material';
import React from 'react';

const RestaurantForm = (props) => {
    const { onValueChange } = props;
    const handleChange = (key, e) => {
        // const formDetails = {
        //     [key]: e?.target?.value
        // }
        // onValueChange((prev) => ({ ...prev, ...formDetails }));
        onValueChange(e?.target?.value);
    }
    return (
        <div className='d-flex flex-column align-items-start'>
            <h5 className='text-center my-3'>Create your restaurant</h5>
            {/* <TextField className='w-50' label="Brand Name" variant="standard" onChange={(e) => handleChange('test', e)} /> */}
            <TextField className='w-50' label="Restaurant Name" variant="standard" onChange={(e) => handleChange('rest', e)} />
        </div>
    )
}

export default RestaurantForm;