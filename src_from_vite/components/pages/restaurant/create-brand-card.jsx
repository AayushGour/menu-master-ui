import { Step, StepLabel, Stepper } from '@mui/material';
import React, { useState } from 'react'
import MMLoader from '../../../utility/loader/mm-loader';
import BrandForm from '../../forms/brand-form';
import PlanForm from '../../forms/plan-form';
import RestaurantForm from '../../forms/restaurant-form';
import "./create-brand-card.scss";


const CreateBrandCard = (props) => {
    const [activeStep, setActiveStep] = useState(0);
    const [brandFormDetails, setBrandFormDetails] = useState({});
    const [restaurantFormDetails, setRestaurantFormDetails] = useState("");
    const [planDetails, setPlanDetails] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const steps = [
        'Create Brand',
        'Create Restaurant',
        // 'Make Payment',
    ];

    const handleCancel = () => {
        setActiveStep(0);
        setBrandFormDetails({});
        setRestaurantFormDetails("");
        setPlanDetails("");
    }

    const handleNext = () => {
        if (activeStep !== steps?.length - 1) {
            setActiveStep((prev) => prev + 1);
        } else {
            setIsLoading(true);
            console.log("submit", brandFormDetails, restaurantFormDetails, planDetails);
            setTimeout(() => {
                setIsLoading(false);
                closeDialog();
            }, 2000);
        }
    }

    return <div className={`dialog-container width-50`}>
        {activeStep === 0 ?
            <>
                <h2 className='mb-3'>Hi There!!!</h2>
                <h3 className='mb-5'>Let's get you started with creating your brand</h3>
            </>
            : <></>
        }
        <Stepper activeStep={activeStep} className='dialog-stepper mt-3'>
            {steps?.map((item, index) => {
                return (
                    <Step key={`${item}-${index}`}>
                        <StepLabel>{item}</StepLabel>
                    </Step>
                )
            })}
        </Stepper>
        <div className="dialog-content-container mt-3">
            {activeStep === 0 ?
                <BrandForm onValueChange={setBrandFormDetails} /> :
                activeStep === 1 ?
                    <>
                        <RestaurantForm onValueChange={setRestaurantFormDetails} />
                        <PlanForm onValueChange={setPlanDetails} />
                    </>
                    : <>Make Payment</>

            }
        </div>
        <div className="btn-container d-flex flex-row justify-content-end gap-3 mt-4">
            {
                activeStep !== 0 ?
                    <button className='mm-btn m-0' onClick={handleCancel}>Cancel</button>
                    : <></>
            }
            <button disabled={activeStep === 0 && Object.keys(brandFormDetails)?.length === 0 ? true : activeStep === 1 && (restaurantFormDetails === "" || planDetails === "")} className='mm-btn primary m-0' onClick={handleNext}> {activeStep === steps?.length - 1 ? "Submit" : "Next"}</button>
        </div>
        {isLoading && <MMLoader className="overlay" />}
    </div>
}
export default CreateBrandCard;