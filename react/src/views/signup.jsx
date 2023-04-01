import React, { Component } from "react";
import Input from "./common/input";
import Form from "./common/form";
import logo from "../assets/images/logo.svg";
import { StateContext } from "../context/contextProvider";
import Joi from "joi-browser";

import http from "../httpClient.js";

/* Styles */
import "../assets/styles/guest.css";

class Signup extends Form {
    state = {
        data: { name: "", email: "", password: "" },
        errors: {},
    };
    schema = {
        name: Joi.string(),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(8).required().label("Password"),
        /*      repeatPassword: Joi.string()
            .required()
            .equal(Joi.ref("password"))
            .label("Confirm password")
            .options({
                language: { any: { allowOnly: "must match password" } },
            }), */
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
            <div id="guest">
                <div className="guest-form">
                    <img className="logo-img" src={logo} alt="logo" />
                    <form
                        className="form login-form"
                        onSubmit={this.handleSubmit}
                        action=""
                    >
                        {this.renderInput("Full Name", "name")}

                        {this.renderInput("Email", "email")}

                        {this.renderInput("Password", "password", "password")}

                        {/*       <Input
                            label="Repeat password"
                            onChange={this.handleChange}
                            name="repeatPassword"
                            type="password"
                            value={this.state.data.repeatPassword}
                            error={this.state.errors.repeatPassword}
                        /> */}
                        {this.renderButton("Signup", "btn-primary", {
                            width: "100%",
                        })}
                    </form>
                </div>
            </div>
        );
    }
}
Signup.contextType = StateContext;

export default Signup;
