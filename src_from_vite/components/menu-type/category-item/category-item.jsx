import { Add, Edit, MoreHoriz } from '@mui/icons-material';
import { Divider } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import DraggableList from 'react-draggable-list';
import MMTooltip from '../../../utility/mm-tooltip';
import NoDataComponent from '../../../utility/no-data-component/no-data-component';
import { getMenuDetails } from '../actions';
import MenuItemComponent from '../menu-item/menu-item';
import MenuItemEditComponent from '../menu-item/menu-item-edit';

const CategoryItem = (props) => {
    const { data } = props;
    console.log(data);
    const [isLoading, setIsLoading] = useState(true);
    const [menuItemList, setMenuItemList] = useState([]);
    const dragListRef = useRef();

    useEffect(() => {
        refreshMenuDetails();
    }, [])

    const refreshMenuDetails = () => {
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

    return (
        <div className='category-item'>
            <div className="d-flex flex-row align-items-center justify-content-between pe-2 my-3">
                <h5 style={{ fontSize: "1.2rem" }} className='text-start'>{data?.cat}</h5>
                <div className='d-flex flex-row align-items-center gap-1'>
                    <MMTooltip arrow title={"Edit Category"} placement='top'>
                        <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); console.log("Adding item") }} className='ghost'>
                            <Edit className='mm-icon-btn edit-icon me-2' />
                        </button>
                    </MMTooltip>
                    <MMTooltip arrow title={"Add Items"} placement='top'>
                        <button onClick={(e) => { e.stopPropagation(); e.preventDefault(); console.log("Adding item") }} className='ghost'>
                            <Add className='mm-icon-btn add-icon' />
                        </button>
                    </MMTooltip>
                </div>
            </div>
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
                            template={MenuItemComponent}
                        />
                        <Divider><MoreHoriz /></Divider>
                    </div>
                </>
                : <NoDataComponent />}
        </div >
    )
}

export default CategoryItem;