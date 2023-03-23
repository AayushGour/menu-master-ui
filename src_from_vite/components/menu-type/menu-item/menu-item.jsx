import { DragIndicator, ImageNotSupported } from '@mui/icons-material';
import { Avatar, Chip } from '@mui/material';
import React from 'react';
import NonVegImg from "../../../assets/img/non-veg.png";
import VegImg from "../../../assets/img/veg.png";
import "./menu-item.scss";

const MenuItemComponent = (props) => {
    const { item, itemSelected, dragHandleProps } = props;
    // console.log(item)
    return (
        <div className="menu-item-container w-100 d-flex flex-row mb-3">
            <DragIndicator className='dragger my-auto me-2' {...dragHandleProps} />
            <Avatar sx={{ height: 80, width: 80 }} variant='square' src={item?.MImage} >
                <ImageNotSupported sx={{ fontSize: "3rem" }} />
            </Avatar>
            <div className="menu-details-header d-flex flex-column align-items-start flex-grow-1 gap-2 px-2">
                <div className="d-flex flex-row justify-content-between align-items-center w-100">
                    <div className="d-flex flex-row justify-content-start align-items-center gap-2">
                        <Avatar sx={{ height: 20, width: 20 }} variant='square' src={item?.veg === 1 ? VegImg : NonVegImg} />
                        <h4 className='mb-0'>{item?.menu}</h4>
                    </div>
                    <h4 className='mb-0'>₹ {item?.price}</h4>
                </div>
                <div className="d-flex flex-row justify-content-start align-items-start w-100 ps-4 ms-1 gap-3">
                    <p title={item?.description} className='para-text menu-item-description w-50 text-start mb-0'><b>Description: </b>{item?.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer justo magna, placerat in turpis ac, eleifend vestibulum elit. Nam vel nisl lobortis, maximus ligula ut, volutpat erat. Curabitur erat lorem, molestie pharetra laoreet nec, consequat nec tellus. Vestibulum mattis ex quis ipsum dapibus ornare. Pellentesque pulvinar sapien tortor, vitae egestas leo luctus at. Fusce quam tortor, tincidunt id aliquam ac, pretium ac est. Nam dapibus, enim ut vehicula congue, mauris sem varius diam, ac efficitur purus tortor eu magna. Mauris mauris turpis, interdum nec odio a, aliquet fermentum lacus. Etiam scelerisque vitae elit at sagittis."}</p>
                    <p title={item?.ingredients} className='para-text menu-item-ingredients w-25 text-start mb-0'><b>Ingredients: </b>{item?.ingredients || "Pudina, dhaniya, spinach, chicken, mutton, fish, potato, tomato, carrot, grapes"}</p>
                    <div className="d-flex flex-row align-items-start w-25 justify-content-between">
                        <p className='text-start mb-0'><b>Spice: </b>{item?.spice || "-"}</p>
                        <Chip
                            label={item?.status1 === 1 ? "Available" : "Not Available"}
                            color={item?.status1 === 1 ? "success" : "error"}
                            onClick={() => { console.log(item?.status1) }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuItemComponent;