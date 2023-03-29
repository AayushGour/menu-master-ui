import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { createCategory } from '../menu-type/actions';

const CreateCategoryForm = (props) => {
    const { data, refreshCategoryDetails, cancelCategoryCreation } = props;
    const [categoryTitle, setCategoryTitle] = useState("");
    const [notes, setNotes] = useState("");
    const handleFormSubmit = async () => {
        if (categoryTitle !== "") {
            const createCategoryParams = Object.assign({}, data, { cat: categoryTitle, notes: notes });
            delete createCategoryParams.rest;
            delete createCategoryParams.brand;
            delete createCategoryParams.MTImage;
            createCategoryParams.rank1 = 1;
            createCategoryParams.cUser = localStorage.getItem("userID");
            createCategoryParams.CImage = 'null';
            createCategoryParams.favourite = 1;
            await createCategory(createCategoryParams);
            cancelCategoryCreation();
            refreshCategoryDetails();
        }
    }
    return (
        <div className="w-auto d-flex flex-column mt-3 ms-2 me-3">
            <h5 style={{ fontSize: "1.2rem" }} className='text-start'>Create Category</h5>
            <div className='d-flex flex-row align-items-center gap-2 mt-3'>
                <TextField className='w-50 mx-3' required={true} label="Category" variant="standard" onChange={(e) => setCategoryTitle(e?.target?.value)} />
                <TextField className='w-50 mx-3' label="Notes" multiline rows={1} variant="standard" onChange={(e) => setNotes(e?.target?.value)} />
            </div>
            <div className="d-flex flex-row justify-content-end align-items-center gap-3 mt-4 me-3">
                <button onClick={cancelCategoryCreation} className='mm-btn m-0'>Cancel</button>
                <button disabled={categoryTitle === ""} onClick={handleFormSubmit} className='mm-btn primary m-0'>Create Category</button>
            </div>
        </div>
    )
}

export default CreateCategoryForm;