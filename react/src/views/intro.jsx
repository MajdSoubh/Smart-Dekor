import React from "react";

const Intro = ({ data: { introTitle, introDesc } }) => {
    return (
        <div className="intro ">
            <div className="intro-title ">
                <h2>Achtitecture</h2>
                <p>{introTitle}</p>
            </div>
            <div className="intro-description ">
                <p>{introDesc}</p>
            </div>
        </div>
    );
};

export default Intro;
