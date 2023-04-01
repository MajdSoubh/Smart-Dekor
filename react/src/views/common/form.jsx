import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
    state = {
        data: {},
        errors: {},
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.schema) {
            const errors = this.validation();
            if (errors) {
                return this.setState({ errors });
            }
        }
        this.doSubmit();
    };

    validation = () => {
        let errors = {};
        const options = { abortEarly: false };
        const validation = Joi.validate(this.state.data, this.schema, options);
        if (!validation.error) return null;
        for (let error of validation.error.details) {
            errors[error.path[0]] = error.message;
        }
        return errors;
    };

    validateProperty = ({ name, value }) => {
        const property = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(property, schema, { abortEarly: false });

        return error ? error.details[0].message : null;
    };
    handleFile = ({ target }) => {
        const { name, files } = target;

        this.setState({ [name]: files });
    };
    handleChange = ({ target }) => {
        const { name, value } = target;

        const data = { ...this.state.data };

        const errors = { ...this.state.errors };
        data[name] = value;

        if (this.schema) {
            const errorMsg = this.validateProperty(target);

            errorMsg ? (errors[name] = errorMsg) : delete errors[name];
            this.setState({ errors });
        }
        this.setState({ data });
    };
    renderButton = (label, className, type, style, events) => {
        return (
            <button
                {...events}
                style={style}
                type={type}
                className={"btn " + className}
            >
                {label}
            </button>
        );
    };
    renderInput(label, name, type = "text", customClass, events) {
        return (
            <Input
                label={label}
                name={name}
                type={type}
                {...events}
                customClass={customClass}
                onChange={this.handleChange}
                value={this.state.data[name]}
                error={this.state.errors[name]}
            />
        );
    }
    renderFileInput(name, multiple = "yes", customClass, events) {
        return (
            <Input
                name={name}
                type="file"
                multiple={multiple}
                {...events}
                customClass={customClass}
                onChange={this.handleFile}
                label={null}
            />
        );
    }

    renderTextarea(label, name, rows = 3, cols = 3, customClass) {
        return (
            <div className="form-group mb-3">
                <textarea
                    rows={rows}
                    cols={cols}
                    name={name}
                    className={customClass || "form-control py-3"}
                    placeholder={label}
                    onChange={this.handleChange}
                    value={this.state.data[name]}
                ></textarea>
            </div>
        );
    }
    renderSelect(label, name, options = [], className = null) {
        return (
            <Select
                name={name}
                label={label}
                options={options}
                error={this.state.errors[name]}
                onChange={this.handleChange}
                value={this.state.data[name]}
                className={className}
            />
        );
    }
}

export default Form;
