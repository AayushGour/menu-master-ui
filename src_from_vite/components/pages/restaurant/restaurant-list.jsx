import { Dialog, Divider, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useRazorpay from 'react-razorpay';
import MMLoader from '../../../utility/loader/mm-loader';
import NoDataComponent from '../../../utility/no-data-component/no-data-component';
import MenuTypeForm from '../../forms/menu-type-form';
import RestaurantForm from '../../forms/restaurant-form';
import MenuTypeAccordion from '../../menu-type/menu-type-accordion';
import { createOrder, getBrandList, getMenuTypeDetails, getRestaurantsList } from './actions';
import CreateBrandCard from './create-brand-card';
import "./restaurant-list.scss";


const RestaurantListPage = (props) => {
    const Razorpay = useRazorpay();
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
    const [brandList, setBrandList] = useState([]);
    const [restaurantList, setRestaurantList] = useState([]);
    const [menuTypeList, setMenuTypeList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateBrandCardOpen, setIsCreateBrandCardOpen] = useState(false);
    const [isCreateRestCardOpen, setIsCreateRestCardOpen] = useState(false);
    const [newRestDetails, setNewRestDetails] = useState("");
    const [isCreatingMT, setIsCreatingMT] = useState(false);
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
            setMenuTypeList(mtResp?.data);
            setIsCreatingMT(false);
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const handleRestaurantCreation = async () => {
        console.log(newRestDetails)
        const orderParams = {
            amount: Number(newRestDetails?.plan?.price) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
        }
        const orderDetails = await createOrder(orderParams);
        // const orderDetails = {
        //     "id": "order_LXgNmJ7LXUx3RC",
        //     "entity": "order",
        //     "amount": 1000,
        //     "amount_paid": 0,
        //     "amount_due": 1000,
        //     "currency": "INR",
        //     "receipt": "receipt_order_74394",
        //     "offer_id": null,
        //     "status": "created",
        //     "attempts": 0,
        //     "notes": [],
        //     "created_at": 1680167699
        // }
        const { amount, id: orderId, currency } = orderDetails;
        const razorpayOptions = {
            key: "rzp_test_Bc9MsRaw1dwKLG", // Enter the Key ID generated from the Dashboard
            amount: amount?.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: currency,
            name: "MenuMaster",
            description: "Thank You!!",
            image: "https://firebasestorage.googleapis.com/v0/b/restaurant-a841c.appspot.com/o/images%2FImage1680167938902?alt=media&token=4125436b-aa64-4f87-b8b0-b786ea90e7a6",
            order_id: orderId, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
            handler: function (response) {
                console.log(response)
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
                const restParams = {
                    brandid: newRestDetails?.brandid,
                    RImage: "",
                    rest: newRestDetails?.rest,
                    notes: "",
                    favourite: 0,
                    status1: 1,
                    rank1: 1,
                    plan_id: newRestDetails?.plan?.plan_id,
                    plan_name: newRestDetails?.plan?.plan_name
                }
                createRestaurant(restParams).finally(() => {
                    refreshBrandList();
                    // setIsLoading(false);
                    setIsCreateRestCardOpen(false)
                })
            },
        }
        const rzp1 = new Razorpay(razorpayOptions);

        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });

        rzp1.open();

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
            {/* <Dialog className='create-brand-dialog' open={isCreateBrandCardOpen} onClose={() => setIsCreateBrandCardOpen(false)}>
                <CreateBrandCard refreshBrandList={refreshBrandList} className="w-100" />
            </Dialog> */}
            <Dialog className='create-mt-dialog' open={isCreatingMT} onClose={() => setIsCreatingMT(false)}>
                <MenuTypeForm refreshMenuTypeList={refreshMenuTypeList} data={restaurantList?.find((r) => r?.restid === selectedRestaurant)} />
            </Dialog>
            <Dialog className='create-brand-dialog' open={isCreateRestCardOpen} onClose={() => setIsCreateRestCardOpen(false)}>
                <RestaurantForm selectedBrand={selectedBrand} details={newRestDetails} brandList={brandList} type="rest" onValueChange={setNewRestDetails} onSubmit={handleRestaurantCreation} className="w-100 px-5 py-4" onCancel={() => { setIsCreateRestCardOpen(false); setNewRestDetails({}); }} refreshBrandList={refreshBrandList} />
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
                    label="Brand"
                >
                    {brandList?.map((brand, index) => {
                        return <MenuItem key={index} value={brand?.brandid}>{brand?.brand}</MenuItem>
                    })}
                </Select>
                <div className="d-flex flex-row align-items-center justify-content-end gap-3">
                    {/* <button className='mm-btn mx-0' onClick={() => setIsCreateBrandCardOpen(true)}>Create Brand</button> */}
                    <button className='mm-btn mx-0' onClick={() => setIsCreateRestCardOpen(true)}>Create Restaurant</button>
                    <button className='mm-btn mx-0' onClick={() => setIsCreatingMT(true)}>Create Menu Type</button>
                    {/* <button className='mm-btn mx-0' title="Generate QR Code"><QrCode2 /></button> */}
                </div>
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