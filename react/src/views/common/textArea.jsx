import React from "react";

const TextArea = ({ label, error, className, ...rest }) => {
    return (
        <div className="form-group mb-3">
            <textarea
                className={className || "form-control py-3"}
                placeholder={label}
                {...rest}
            ></textarea>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default TextArea;
