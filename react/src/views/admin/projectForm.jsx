import React, { Component } from "react";
import Form from "../common/form";
import http from "../../httpClient";
import { withParams } from "../../withParams";

class ProjectForm extends Form {
    state = { data: {}, errors: {}, images: null, categories: [] };

    async componentDidMount() {
        const projectId = this.props.params.id;
        try {
            const res = await http.get("/category");
            this.setState({ categories: res.data });
        } catch (ex) {
            console.log("category : ", ex);
        }
        if (!projectId) return null;
        try {
            const res = await http.get(`/project/${projectId}`);
            this.setState({ categories: res.data });
        } catch (ex) {
            console.log("project : ", ex);
        }
    }
    async doSubmit() {
        const payload = new FormData();

        payload.append("images", this.state.images);
        payload.append("title", this.state.data.title);
        payload.append("description", this.state.data.description);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        try {
            const res = await http.post("/project/save", images, config);
        } catch (err) {
            console.log(err);
        }
    }
    render() {
        return (
            <div className=" project-form ">
                {/* modify this */}
                <h2 className="title text-center mb-4">New Project</h2>
                <div className="form-box">
                    <form action="" onSubmit={this.handleSubmit}>
                        {this.renderInput("Title", "title")}

                        {this.renderTextarea("Description", "description")}
                        {this.renderSelect(
                            "Category",
                            "category",
                            this.state.categories
                        )}
                        {this.renderFileInput("images")}

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
