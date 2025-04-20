import React from "react";
import "./button.css";

const Button = ({ type, className, text, handleClick }) => {
  return (
    <div
      className={`primaryBtn ${
        type && type == "secondary" ? "secondaryBtn" : ""
      } ${className}`}
      onClick={handleClick == undefined || null ? () => {} : handleClick}
    >
      {text}
    </div>
  );
};

export default Button;
