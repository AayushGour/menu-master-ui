import { TextField } from '@mui/material';
import React from 'react';

const BrandForm = (props) => {
    const { onValueChange } = props;
    const handleChange = (e) => {
        const formDetails = {
            brand: e?.target?.value
        }
        onValueChange(formDetails);
    }
    return (
        <div className='d-flex flex-column align-items-start'>
            <h5 className='text-center my-3'>Enter a name for your brand</h5>
            <TextField className='w-50' label="Brand Name" variant="standard" onChange={handleChange} />
        </div>
    )
}

export default BrandForm;