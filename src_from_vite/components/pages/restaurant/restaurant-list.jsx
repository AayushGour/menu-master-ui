import { Dialog, Divider, MenuItem, Select, Step, StepLabel, Stepper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl, brandRoute } from '../../../utility/api-urls';
import { apiActions } from '../../../utility/constants';
import MMLoader from '../../../utility/loader/mm-loader';
import NoDataComponent from '../../../utility/no-data-component/no-data-component';
import BrandForm from '../../forms/brand-form';
import MenuTypeForm from '../../forms/menu-type-form';
import PlanForm from '../../forms/plan-form';
import RestaurantForm from '../../forms/restaurant-form';
import MenuTypeAccordion from '../../menu-type/menu-type-accordion';
import { getBrandList, getMenuTypeDetails, getRestaurantsList } from './actions';
import CreateBrandCard from './create-brand-card';
import "./restaurant-list.scss";


const RestaurantListPage = (props) => {
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
    const [brandList, setBrandList] = useState([]);
    const [restaurantList, setRestaurantList] = useState([]);
    const [menuTypeList, setMenuTypeList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateBrandCardOpen, setIsCreateBrandCardOpen] = useState(false);
    useEffect(() => {
        refreshBrandList();
    }, [])

    const refreshBrandList = () => {
        setIsLoading(true);
        if (isCreateBrandCardOpen) {
            setIsCreateBrandCardOpen(false);
        }
        getBrandList().then((response) => {
            setBrandList(response?.data);
            if (Array.isArray(response?.data) && response?.data?.length > 0) {
                handleBrandChange(response?.data?.[0]?.brandid);
            } else {
                setIsLoading(false);
            }
        })
        // .finally(() => {
        //     setIsLoading(false);
        // });
    }

    const refreshRestaurantList = (brandId) => {
        getRestaurantsList(brandId).then((response) => {
            setRestaurantList(response?.data)
            handleRestaurantSelection(response?.data?.[0]?.restid, brandId)
        }).finally(() => {
            setIsLoading(false);
        });
    }


    const handleBrandChange = (value) => {
        setIsLoading(true);
        setSelectedBrand(value);
        setSelectedRestaurant('');
        refreshRestaurantList(value);
    }


    const handleRestaurantSelection = (restId, brandId) => {
        setIsLoading(true);
        setSelectedRestaurant(restId);
        refreshMenuTypeList(restId, brandId)
    }

    const refreshMenuTypeList = (restId, brandId) => {
        setIsLoading(true);
        const menuTypeParams = {
            brandid: brandId,
            restid: restId,
        };
        getMenuTypeDetails(menuTypeParams).then((mtResp) => {
            setMenuTypeList(mtResp?.data)
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const handleBrandCreationDialogClose = () => {
        setIsCreateBrandCardOpen(false);
    }

    // if (isLoading) {
    //     return <MMLoader className="h-100" />
    // }
    if (brandList?.length === 0 && !isLoading) {
        return (
            <div className='restaurant-list-page h-100 w-100 d-flex flex-column align-items-center justify-content-center'>
                {/* <button className='mm-btn primary mt-5' onClick={() => setIsCreateBrandCardOpen(true)}>Create Brand</button> */}
                <CreateBrandCard refreshBrandList={refreshBrandList} />
            </div>
        )
    }
    // const brandBackground = brandList?.find((e) => e?.brandid === selectedBrand)?.BImage
    const brandBackground = false;
    return (
        <div className="restaurant-list-page h-100 w-100">
            <Dialog className='create-brand-dialog' open={isCreateBrandCardOpen} onClose={handleBrandCreationDialogClose}>
                <CreateBrandCard refreshBrandList={refreshBrandList} className="w-100" />
            </Dialog>
            {isLoading ? <MMLoader className="overlay" /> : <></>}
            <div
                style={{ backgroundImage: !!brandBackground && brandBackground !== "null" ? `linear-gradient(to right, #000b 15%, transparent), url(${brandBackground})` : "" }}
                className={`restaurant-list-header ${!!brandBackground && brandBackground !== "null" ? "img-bg" : ""}`}
            >
                <Select
                    variant='standard'
                    className='brand-select'
                    value={selectedBrand}
                    onChange={(e) => handleBrandChange(e.target.value)}
                    label="Age"
                >
                    {brandList?.map((brand, index) => {
                        return <MenuItem key={index} value={brand?.brandid}>{brand?.brand}</MenuItem>
                    })}
                </Select>
                <button className='mm-btn mx-0' onClick={() => setIsCreateBrandCardOpen(true)}>Create Brand</button>
            </div>
            <div className="restaurants-list-container flex-grow-1">
                {!isLoading && (restaurantList?.length > 0 ?
                    <>
                        <ul className='restaurant-list'>
                            {restaurantList?.map((restaurant) => {
                                return <li onClick={() => handleRestaurantSelection(restaurant?.restid, selectedBrand)} key={restaurant?.restid} className={`list-item mb-3 ${selectedRestaurant === restaurant?.restid ? "selected" : ""} `}>{restaurant?.rest}</li>
                            })}
                        </ul>
                        <Divider className='mm-divider' orientation='vertical' />
                        <div className="menu-content-container w-100 h-100">
                            {selectedRestaurant === "" ?
                                <h4>Select a restaurant to view its menu</h4>
                                :
                                menuTypeList?.length > 0 ? menuTypeList?.map((mt, index) => {
                                    return (
                                        <MenuTypeAccordion key={index} data={mt} refreshMenuTypeList={refreshMenuTypeList} />
                                    )
                                }) :
                                    <NoDataComponent
                                        content={
                                            <>
                                                <span>Oops!! Looks like there are no Menu Types available.</span>
                                                <br />
                                                {/* <button className='mm-btn primary mt-3'>Create Menu Type</button> */}
                                                <MenuTypeForm refreshMenuTypeList={refreshMenuTypeList} data={restaurantList?.find((r) => r?.restid === selectedRestaurant)} />
                                            </>
                                        }
                                    />
                            }
                        </div>
                    </>
                    :
                    <NoDataComponent
                        content={
                            <>
                                <span>Oops!! Looks like there are no restaurants available.</span>
                                <br />
                                <button className='mm-btn primary mt-3'>Create Restaurant</button>
                            </>
                        }
                    />
                )
                }
            </div>
        </div>
    )
}

export default RestaurantListPage;