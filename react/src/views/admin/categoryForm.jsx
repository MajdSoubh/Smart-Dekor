import React, { Component } from "react";
import Form from "../common/form";
import http from "../../httpClient";
import { withParams } from "../../withParams";
import { toast } from "react-toastify";

class CategoryForm extends Form {
    state = { data: { name: "" }, errors: {}, isModify: false };

    async componentDidMount() {
        const categoryId = this.props.params.id;

        if (!categoryId) return null;
        this.setState({ isModify: true });
        try {
            const res = await http.get(`/category/${categoryId}`);
            this.setState({ data: res.data });
        } catch (ex) {
            const { response } = ex;
            if (response && response.status == 404) {
                toast.error("Category not found");
                this.props.navigate("/admin/categories", { replace: true });
            }
        }
    }
    async doSubmit() {
        const endPoint = this.state.isModify
            ? `/category/${this.props.params.id}`
            : "/category";
        try {
            const res = this.state.isModify
                ? await http.put(endPoint, this.state.data)
                : await http.post(endPoint, this.state.data);
            if (res.status == 200) {
                toast.success(
                    this.state.isModify
                        ? "Category modified successfully"
                        : "Category created successfully"
                );
                return this.props.navigate("/admin/categories", {
                    replace: true,
                });
            }
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
            <div className=" category-form ">
                <h2 className="title text-center mb-4">
                    {this.state.isModify ? "Modify Category" : "New Category"}
                </h2>
                <div className="form-box">
                    <form action="" onSubmit={this.handleSubmit}>
                        {this.renderInput("Name", "name")}
                        {this.renderButton("Save", "btn-success", "submit", {
                            width: "100%",
                        })}
                    </form>
                </div>
            </div>
        );
    }
}

export default withParams(CategoryForm);
