import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { createCategory } from '../menu-type/actions';
import { createMenuTypeDetails } from '../pages/restaurant/actions';

const MenuTypeForm = (props) => {
    const { data, refreshMenuTypeList } = props;
    const [menuTypeTitle, setMenuTypeTitle] = useState("");
    const [notes, setNotes] = useState("");
    const handleFormSubmit = async () => {
        if (menuTypeTitle !== "") {
            const createMTParams = Object.assign({}, data, { menutype: menuTypeTitle, notes: notes });
            delete createMTParams.RImage;
            createMTParams.rank1 = 1;
            createMTParams.cUser = localStorage.getItem("userID");
            createMTParams.MTImage = 'null';
            createMTParams.favourite = 1;
            await createMenuTypeDetails(createMTParams).then(async (resp) => {
                const createCategoryParams = Object.assign({}, data, { cat: "default", notes: "" });
                delete createCategoryParams.rest;
                delete createCategoryParams.brand;
                delete createCategoryParams.MTImage;
                createCategoryParams.mtid = resp?.data?.[0]?.mtid;
                createCategoryParams.rank1 = 1;
                createCategoryParams.cUser = localStorage.getItem("userID");
                createCategoryParams.CImage = 'null';
                createCategoryParams.favourite = 1;
                await createCategory(createCategoryParams);
            });
            refreshMenuTypeList(data?.restid, data?.brandid);
        }
    }
    return (
        <div className="w-100 h-100 mt-4 d-flex flex-column gap-3 p-4">
            <h5 className='mb-3'>Start by creating one</h5>
            <TextField className='w-100' label="Menu Type" variant="standard" onChange={(e) => setMenuTypeTitle(e?.target?.value)} />
            <TextField className='w-100' label="Notes" multiline rows={4} variant="standard" onChange={(e) => setNotes(e?.target?.value)} />
            <button disabled={menuTypeTitle === ""} onClick={handleFormSubmit} className='mm-btn primary mt-2'>Create Menu Type</button>
        </div>
    )
}

export default MenuTypeForm;