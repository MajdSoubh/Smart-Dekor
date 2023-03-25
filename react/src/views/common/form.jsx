import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validation();
    if (errors) {
      return this.setState({ errors });
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
  handleChange = ({ target }) => {
    const { value, name } = target;

    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    data[name] = value;
    const errorMsg = this.validateProperty(target);

    errorMsg ? (errors[name] = errorMsg) : delete errors[name];
    this.setState({ data, errors });
  };
}

export default Form;
