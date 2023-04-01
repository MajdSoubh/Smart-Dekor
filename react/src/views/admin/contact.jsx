import React from "react";
import Joi from "joi-browser";
import http from "../../httpClient";

import Form from "../common/form";
import { toast } from "react-toastify";

class Contact extends Form {
    state = {
        data: {
            email: "",
            phone: "",
            address: "",
            whatsapp: "",
            facebook: "",
            instagram: "",
        },
        errors: {
            email: "",
            phone: "",
            address: "",
            whatsapp: "",
            facebook: "",
            instagram: "",
        },
    };
    schema = {
        email: Joi.string().allow("").label("Email"),
        phone: Joi.string().allow(""),
        address: Joi.string().allow(""),
        whatsapp: Joi.string().allow(""),
        facebook: Joi.string().allow(""),
        instagram: Joi.string().allow(""),
    };
    async componentDidMount() {
        try {
            const data = { ...this.state.data };
            const { data: resData } = await http.get("/contact");
            for (const key in resData) {
                if (!resData[key]) continue;
                data[key] = resData[key];
            }
            data ? this.setState({ data }) : null;
        } catch (e) {
            console.log(e);
        }
    }
    async doSubmit() {
        try {
            const res = await http.put("/contact/update", this.state.data);
            res.status == 200 ? toast.success("Data Saved Successfully") : null;
        } catch (ex) {
            const { response } = ex;
            if (response && response.status == 422) {
                const resErrors = response.data.errors;
                const errors = {};
                for (const error in resErrors) {
                    errors[error] = resErrors[error][0];
                }
                this.setState({ errors });
            }
        }
    }
    render() {
        return (
            <div className=" contact ">
                <h2 className="title text-center mb-4">Contact information</h2>
                <div className="form-box">
                    <form action="" onSubmit={this.handleSubmit}>
                        {this.renderInput("Email", "email")}
                        {this.renderInput("Phone", "phone")}
                        {this.renderInput("Address", "address")}
                        {this.renderInput("Whatsapp", "whatsapp")}
                        {this.renderInput("Facebook", "facebook")}

                        {this.renderButton("Save", "btn-success", null, {
                            width: "100%",
                            height: "3rem",
                        })}
                    </form>
                </div>
            </div>
        );
    }
}

export default Contact;
