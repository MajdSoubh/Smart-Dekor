import React, { Component } from "react";
import _ from "lodash";
import Form from "../common/form";
import http from "../../httpClient";
import { withParams } from "../../withParams";

class ProjectForm extends Form {
    state = {
        data: { title: "", description: "" },
        errors: {},
        images: [],
        categories: [],
        isModify: false,
    };

    async componentDidMount() {
        const projectId = this.props.params.id;

        try {
            const res = await http.get("/category");
            this.setState({ categories: res.data });
        } catch (ex) {
            console.log("category : ", ex);
        }
        if (!projectId) return null;
        this.setState({ isModify: true });
        try {
            const res = await http.get(`/project/${projectId}`);
            this.setState({ categories: res.data });
        } catch (ex) {
            console.log("project : ", ex);
        }
    }

    async doSubmit() {
        const payload = new FormData();
        _.forEach(this.state.images, (img) => {
            payload.append("images[]", img);
        });
        for (const key in this.state.data) {
            payload.append(key, this.state.data[key]);
        }
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        try {
            const res = await http.post("/project", payload, config);
            console.log(res);
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
            <div className=" project-form ">
                <h2 className="title text-center mb-4">
                    {this.state.isModify ? "Modify Project" : "New Project"}
                </h2>
                <div className="form-box">
                    <form action="" onSubmit={this.handleSubmit}>
                        {this.renderInput("Title", "title")}

                        {this.renderTextarea("Description", "description")}
                        {this.renderSelect(
                            "Category",
                            "category",
                            this.state.categories
                        )}
                        {this.renderImagesUpload("images", true)}

                        {this.renderButton("Save", "btn-success", "submit", {
                            width: "100%",
                        })}
                    </form>
                </div>
            </div>
        );
    }
}

export default withParams(ProjectForm);
