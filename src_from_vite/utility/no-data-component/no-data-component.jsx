import React from 'react';
import EmptyJar from "../../assets/img/empty-jar.png";
import "./no-data-component.scss";

const NoDataComponent = (props) => {
    const { content, imgClassName } = props;
    return (
        <div className="no-data-component w-100 h-100">
            <img className={`empty-jar-img ${imgClassName ?? ""}`} src={EmptyJar} />
            <span className='content-span mt-5'>{content ?? "No Data Available"}</span>
        </div>
    )
}

export default NoDataComponent;