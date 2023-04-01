import React from "react";
/* styles */
import "../assets/styles/intro.css";
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
