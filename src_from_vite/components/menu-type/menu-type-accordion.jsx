import { Add, Edit, Expand, ExpandCircleDown } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MMLoader from '../../utility/loader/mm-loader';
import MMTooltip from '../../utility/mm-tooltip';
import NoDataComponent from '../../utility/no-data-component/no-data-component';
import { getCategoryDetails, getMenuDetails } from './actions';
import CategoryItem from './category-item/category-item';
import CategoryList from './category-item/category-item';
import MenuItemComponent from './menu-item/menu-item-edit';
import './menu-type-accordion.scss';

const MenuTypeAccordion = (props) => {
    const [menuItemList, setMenuItemList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { data } = props;
    useEffect(() => {
        refreshCategoryDetails();
    }, [])

    const refreshCategoryDetails = () => {
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

    return (
        <div className="menu-type-container">
            <Accordion className='menu-type-accordion' defaultExpanded={true}>
                <AccordionSummary
                    className='mt-acc-header'
                    expandIcon={<ExpandCircleDown className='expand-icon' htmlColor='#fd9c31' />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <h5 className='mt-acc-header-content'>{data?.menutype}</h5>

                    <div>
                        <MMTooltip arrow title={"Edit Type"} placement='top'>
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
                </AccordionSummary>
                <AccordionDetails
                    className='mt-acc-details'
                >
                    {
                        isLoading ? <MMLoader /> :
                            categoryList?.length > 0 ?
                                categoryList?.map((cat) => {
                                    return <CategoryItem data={cat} />
                                })
                                : <NoDataComponent imgClassName="small" />
                    }
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default MenuTypeAccordion;