import React, { Component } from "react";

import Form from "./common/form";
import logo from "../assets/images/logo.svg";
import Joi from "joi-browser";
import { StateContext } from "../context/contextProvider";
import http from "../httpClient";
/* Styles */
import "../assets/styles/guest.css";
class Login extends Form {
    state = {
        data: { email: "", password: "" },
        errors: {},
    };
    schema = {
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(8).required().label("Password"),
    };
    doSubmit = async () => {
        const payload = { ...this.state.data };

        const { setToken, setUser } = this.context;
        try {
            const { data } = await http.post("/login", payload);
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
                <div className="   guest-form ">
                    <img className="logo-img" src={logo} alt="logo" />
                    <form
                        className="form login-form"
                        onSubmit={this.handleSubmit}
                        action=""
                    >
                        {this.renderInput("Email", "email")}
                        {this.renderInput("Password", "password", "password")}

                        {this.renderButton("Login", "btn-primary", {
                            width: "100%",
                        })}
                    </form>
                </div>
            </div>
        );
    }
}
Login.contextType = StateContext;

export default Login;
