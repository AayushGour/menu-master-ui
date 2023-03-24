import { Add, Close, Done, Edit, MoreHoriz } from '@mui/icons-material';
import { Divider, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import DraggableList from 'react-draggable-list';
import MMLoader from '../../../utility/loader/mm-loader';
import MMTooltip from '../../../utility/mm-tooltip';
import NoDataComponent from '../../../utility/no-data-component/no-data-component';
import { createMenuItem, getMenuDetails, updateCategory } from '../actions';
import MenuItemComponent from '../menu-item/menu-item';
import MenuItemEditComponent from '../menu-item/menu-item-edit';

const CategoryItem = (props) => {
    const { data, refreshCategoryDetails } = props;
    console.log(data);
    const [catTitle, setCatTitle] = useState(data?.cat);
    const [isCatEditing, setIsCatEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [menuItemList, setMenuItemList] = useState([]);
    const [isMenuItemCreating, setIsMenuItemCreating] = useState(false);
    const dragListRef = useRef();

    useEffect(() => {
        refreshMenuDetails();
    }, [])

    const refreshMenuDetails = () => {
        setIsLoading(true);
        const menuItemParams = {
            brandid: data?.brandid,
            mtid: data?.mtid,
            restid: data?.restid,
            catid: data?.catid
        }
        getMenuDetails(menuItemParams).then((resp) => {
            console.log("menu", resp?.data)
            setMenuItemList(resp?.data);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const handleCategoryTitleEdit = () => {
        const catParams = {
            cat: catTitle,
            catid: data?.catid
        }
        updateCategory(catParams).then(() => {
            refreshCategoryDetails();
        })
    }

    const handleMenuItemCreation = async (submitParams) => {
        setIsLoading(true)
        createMenuItem(submitParams).then(() => {
            setIsMenuItemCreating(false);
            refreshMenuDetails();
        }).catch(e => {
            console.error(e);
        }).finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <div className='category-item ms-2'>
            {isLoading ? <MMLoader className="overlay" /> : <></>}
            <div className="d-flex flex-row align-items-center justify-content-between pe-2 my-3">
                {isCatEditing ?
                    <div className='w-50 d-flex flex-row align-items-center gap-2'>
                        <TextField className='w-75 me-3' required={true} value={catTitle} label="Category" variant="standard" onClick={(e) => { e.stopPropagation(); e.preventDefault(); }} onChange={(e) => setCatTitle(e?.target?.value)} />
                        <MMTooltip arrow title={"Cancel"} placement='top'>
                            <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); setIsCatEditing(false); setCatTitle(data?.cat) }} className='ghost'>
                                <Close className='mm-icon-btn secondary square' />
                            </button>
                        </MMTooltip>
                        <MMTooltip arrow title={"Submit"} placement='top'>
                            <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleCategoryTitleEdit(); }} className='ghost'>
                                <Done className='mm-icon-btn secondary square' />
                            </button>
                        </MMTooltip>
                    </div>
                    :
                    <h5 style={{ fontSize: "1.2rem" }} className='text-start'>{data?.cat}</h5>
                }
                <div className='d-flex flex-row align-items-center'>
                    <MMTooltip arrow title={"Edit Category"} placement='top'>
                        <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); setIsCatEditing(true) }} className='ghost'>
                            <Edit className={`mm-icon-btn edit-icon me-2 ${isCatEditing ? "disabled" : ""}`} />
                        </button>
                    </MMTooltip>
                    <MMTooltip arrow title={"Add Items"} placement='top'>
                        <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); setIsMenuItemCreating(true); }} className='ghost'>
                            <Add className='mm-icon-btn add-icon' />
                        </button>
                    </MMTooltip>
                </div>
            </div>
            {isMenuItemCreating ?
                <MenuItemEditComponent data={data} cancelCreation={() => setIsMenuItemCreating(false)} submitForm={handleMenuItemCreation} />
                : <></>}
            {menuItemList?.length > 0 ?
                <>
                    {/* {
                        menuItemList?.map((menuItem) => {
                            return <MenuItemEditComponent data={menuItem} />
                        })
                    } */}
                    <div className="drag-list-container" ref={dragListRef}>

                        <DraggableList
                            itemKey="menuid"
                            container={() => dragListRef?.current || document.body}
                            list={menuItemList}
                            onMoveEnd={(newList, movedItem, oldIndex, newIndex) => console.log("new List", newList, movedItem, oldIndex, newIndex)}
                            template={(templateProps) => <MenuItemComponent refreshMenuDetails={refreshMenuDetails} {...templateProps} />}
                        />
                        <Divider><MoreHoriz /></Divider>
                    </div>
                </>
                : <NoDataComponent />}
        </div >
    )
}

export default CategoryItem;