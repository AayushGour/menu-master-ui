import { Add, Close, Delete, Done, Edit, ExpandCircleDown } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Dialog, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MMLoader from '../../utility/loader/mm-loader';
import MMTooltip from '../../utility/mm-tooltip';
import CreateCategoryForm from '../forms/create-category-form';
import { updateMenuTypeDetails } from '../pages/restaurant/actions';
import { createMenuItem, deleteMenuType, getCategoryDetails } from './actions';
import CategoryItem from './category-item/category-item';
import MenuItemEditComponent from './menu-item/menu-item-edit';
import './menu-type-accordion.scss';

const MenuTypeAccordion = (props) => {
    const { data, refreshMenuTypeList } = props;
    const [menuItemList, setMenuItemList] = useState([]);
    const [MTTitle, setMTTitle] = useState(data?.menutype);
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [IsMTEditing, setIsMTEditing] = useState(false);
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);
    const [isMenuItemCreating, setIsMenuItemCreating] = useState(false);
    const [deleteMT, setDeleteMT] = useState(false);
    useEffect(() => {
        refreshCategoryDetails();
    }, []);


    const refreshCategoryDetails = () => {
        setIsLoading(true);
        const categoryParams = {
            brandid: data?.brandid,
            mtid: data?.mtid,
            restid: data?.restid
        }
        getCategoryDetails(categoryParams).then((resp) => {
            // if categoryList === [] -> create category 'General' 
            // else use existing category
            setCategoryList(resp?.data)
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const handleUpdateMenuTypeTitle = () => {
        const mtTitleParams = {
            menutype: MTTitle,
            mtid: data?.mtid
        }
        setIsLoading(true);
        updateMenuTypeDetails(mtTitleParams).then(() => {
            setTimeout(() => {
                refreshMenuTypeList(data?.restid, data?.brandid);
            }, 500)
        })
    }

    const handleMenuItemCreation = (submitParams) => {
        setIsLoading(true)
        submitParams.cUser = localStorage.getItem('userID');
        submitParams.favourite = 1;
        submitParams.catid = categoryList?.[0]?.catid;

        createMenuItem(submitParams).then(() => {
            setIsMenuItemCreating(false);
            refreshCategoryDetails();
        }).catch(e => {
            console.error(e);
        }).finally(() => {
            setIsLoading(false);
        })
    }

    const handleMenuTypeDeletion = () => {
        setIsLoading(true);
        const deleteParams = {
            mtid: data?.mtid,
        }
        deleteMenuType(deleteParams).then(() => {
            setTimeout(() => {
                refreshMenuTypeList(data?.restid, data?.brandid);
            }, 500)
        }).finally(() => {
            setIsLoading(false);
            setDeleteMT(false);
        })
    }

    return (
        <div key={data?.mtid} className="menu-type-container">
            {isLoading ? <MMLoader className='overlay' /> : <></>}
            <Accordion className='menu-type-accordion' defaultExpanded={true}>
                <Dialog className='create-mt-dialog' open={deleteMT} onClose={() => setDeleteMT(false)}>
                    <div className='d-flex flex-column aign-items-center justify-content-center py-4 px-3'>
                        <h3 className='mb-4 w-100 text-center'>Are you sure you want to delete <span className='color-theme-orange'>{data?.menutype}?</span></h3>
                        <div className='d-flex flex-row align-items-center justify-content-end w-100 mt-4 gap-3'>
                            <button className='mm-btn px-5 mx-0' onClick={() => setDeleteMT(false)}>No</button>
                            <button className='mm-btn px-5 primary mx-0' onClick={() => handleMenuTypeDeletion()}>Yes</button>
                        </div>
                    </div>
                </Dialog>
                <AccordionSummary
                    className='mt-acc-header'
                    expandIcon={<ExpandCircleDown className='expand-icon' htmlColor='#fd9c31' />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    {IsMTEditing ?
                        <div className='w-50 d-flex flex-row align-items-center gap-2'>
                            <TextField className='w-75 me-3' required={true} value={MTTitle} label="Menu Type" variant="standard" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }} onChange={(e) => setMTTitle(e?.target?.value)} />
                            <MMTooltip arrow title={"Cancel"} placement='top'>
                                <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); setIsMTEditing(false); setMTTitle(data?.menutype) }} className='ghost'>
                                    <Close className='mm-icon-btn secondary square' />
                                </button>
                            </MMTooltip>
                            <MMTooltip arrow title={"Submit"} placement='top'>
                                <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleUpdateMenuTypeTitle(); }} className='ghost'>
                                    <Done className='mm-icon-btn secondary square' />
                                </button>
                            </MMTooltip>
                        </div>
                        :
                        <h5 className='mt-acc-header-content mb-0'>{data?.menutype}</h5>
                    }

                    <div className='d-flex flex-row align-items-center my-auto gap-2'>
                        <MMTooltip arrow title={"Edit Type"} placement='top'>
                            <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); setIsMTEditing(true) }} className='ghost'>
                                <Edit className={`mm-icon-btn edit-icon ${IsMTEditing ? "disabled" : ""}`} />
                            </button>
                        </MMTooltip>
                        {/* <MMTooltip arrow title={"Add Category"} placement='top'>
                            <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); setIsCreatingCategory(true) }} className='ghost'>
                                <Add className='mm-icon-btn add-icon' />
                            </button>
                        </MMTooltip> */}
                        <MMTooltip arrow title={"Add Menu Item"} placement='top'>
                            <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); setIsMenuItemCreating(true) }} className='ghost'>
                                <Add className='mm-icon-btn add-icon' />
                            </button>
                        </MMTooltip>
                        <MMTooltip arrow title={"Delete Menu Type"} placement='top'>
                            <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); setDeleteMT(true); }} className='ghost'>
                                <Delete className='mm-icon-btn add-icon' />
                            </button>
                        </MMTooltip>
                    </div>
                </AccordionSummary>
                <AccordionDetails
                    className='mt-acc-details'
                >
                    {isMenuItemCreating ?
                        <MenuItemEditComponent data={data} cancelCreation={() => setIsMenuItemCreating(false)} submitForm={handleMenuItemCreation} />
                        : <></>}
                    {isCreatingCategory ? <CreateCategoryForm data={data} cancelCategoryCreation={() => setIsCreatingCategory(false)} refreshCategoryDetails={refreshCategoryDetails} /> : <></>}
                    {
                        isLoading ? <MMLoader /> :
                            categoryList?.length > 0 ?
                                categoryList?.map((cat) => {
                                    return <CategoryItem data={cat} refreshCategoryDetails={refreshCategoryDetails} />
                                })
                                : <CreateCategoryForm data={data} cancelCategoryCreation={() => setIsCreatingCategory(false)} refreshCategoryDetails={refreshCategoryDetails} />
                    }
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default MenuTypeAccordion;