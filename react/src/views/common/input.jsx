import React from "react";

const Input = ({ label, name, error, customClass, ...rest }) => {
    return (
        <div className="form-group mb-3">
            <input
                name={name}
                id={name}
                {...rest}
                className={customClass || "form-control py-3"}
                placeholder={label}
            ></input>
            {error && <div className="alert alert-danger ">{error}</div>}
        </div>
    );
};

export default Input;
