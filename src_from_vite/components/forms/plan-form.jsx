import React, { useState } from 'react';
import "./plan-form.scss";

const planDetailsList = [
    {
        id: 1,
        planName: "Basic",
        price: 0,
        features: [
            "Free for life",
            "Can create 1 brand"
        ]
    },
    {
        id: 2,
        planName: "Advanced",
        price: 29,
        features: [
            "Can create upto 5 brands",
            "Detailed description (with images) for menu",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            "Vestibulum eu est et est posuere euismod",
        ]
    },
    {
        id: 3,
        planName: "Premium",
        price: 49,
        features: [
            "Can create unlimited brands",
            "Detailed description (with images) for menu",
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            "Vestibulum eu est et est posuere euismod",
        ]
    },
];

const PlanForm = (props) => {
    const { onValueChange } = props;
    const [selectedPlan, setSelectedPlan] = useState("");

    const handlePlanSelection = (planId) => {
        setSelectedPlan(planId);
        onValueChange(planId);
    }

    return (
        <div className="plan-selector-container d-flex flex-row justify-content-between w-100 gap-4  mt-4">
            {planDetailsList?.map((plan) => {
                const featureList = <ul className='feature-list'>
                    {plan?.features?.map((feature) => {
                        return <li className='text-start'>{feature}</li>
                    })}
                </ul>
                return <div className={`plan ${selectedPlan === plan?.id ? "selected" : ""}`} onClick={() => handlePlanSelection(plan?.id)}>
                    <h5 className='plan-name text-center pt-3 pb-2 mb-0'>{plan?.planName}</h5>
                    <h2 className='plan-price text-center my-3'><small>$</small>{plan?.price}</h2>
                    {featureList}
                </div>
            })}
        </div>
    )
}

export default PlanForm;