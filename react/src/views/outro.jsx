import React from "react";

const Outro = ({ data: { outroTitle, outroDesc } }) => {
    return (
        <div className="outro" id="about">
            <h2>{outroTitle}</h2>
            <p>{outroDesc}</p>
        </div>
    );
};

export default Outro;
