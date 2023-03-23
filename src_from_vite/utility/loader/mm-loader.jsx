import React from 'react';
import "./mm-loader.scss";
const MMLoader = (props) => {
    const { className, content } = props;
    return (
        <div className={`loader-container ${className ?? ""}`}>
            <div className="spinner-container m-2">
                <div className="spinner">
                    <div className="aliment aliment--1"></div>
                    <div className="aliment aliment--2"></div>
                    <div className="aliment aliment--3"></div>
                    <div className="stove">
                        <div className="stove--handle"></div>
                        <div className="stove--base"></div>
                    </div>
                </div>
            </div>
            <span className='mt-3 content-span'>{content ?? "Loading..."}</span>
        </div>
    )
}

export default MMLoader;