import React, { Component } from "react";
import Input from "./common/input";
import Form from "./common/form";
import logo from "../assets/images/logo.svg";
import { StateContext } from "../context/contextProvider";
import Joi from "joi-browser";

import http from "../httpClient.js";
/* Styles */
import "../assets/styles/form.css";

class Signup extends Form {
    state = {
        data: { name: "", email: "", password: "" },
        errors: {},
    };
    schema = {
        name: Joi.string(),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(8).required().label("Password"),
    };
    doSubmit = async () => {
        const { setToken, setUser } = this.context;
        const payload = { ...this.state.data };
        try {
            const { data } = await http.post("/signup", payload);

            setToken(data.token);
            setUser(data.user);
        } catch (ex) {
            const response = ex.response;
            if (response && response.status === 422) {
                const errors = response.data.errors;
                this.setState({ errors });
            }
        }
    };
    render() {
        return (
            <div className="container ">
                <div className="form-box">
                    <img className="logo-img" src={logo} alt="logo" />
                    <form
                        className="form login-form"
                        onSubmit={this.handleSubmit}
                        action=""
                    >
                        <Input
                            onChange={this.handleChange}
                            value={this.state.data.name}
                            error={this.state.errors.name}
                            type="text"
                            name="name"
                            label="Full Name"
                        />
                        <Input
                            onChange={this.handleChange}
                            value={this.state.data.email}
                            error={this.state.errors.email}
                            type="email"
                            name="email"
                            label="Email"
                        />

                        <Input
                            label="Password"
                            onChange={this.handleChange}
                            name="password"
                            type="password"
                            value={this.state.data.password}
                            error={this.state.errors.password}
                        />
                        <button type="submit" className="btn btn-primary">
                            Signup
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
Signup.contextType = StateContext;

export default Signup;
