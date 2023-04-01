import React from "react";
import Form from "../common/form";
import http from "../../httpClient";

class ProjectForm extends Form {
    state = { data: {}, errors: {} };

    async componentDidMount() {
        try {
            const res = await http.get("/intro");
            this.setState({ data: res.data });
        } catch (ex) {
            console.log("intro : ", ex);
        }
    }
    async doSubmit() {
        const data = { ...this.state.data };
        try {
            const res = await http.post("/intro/store", data);
        } catch (err) {
            console.log("intro : ", err);
        }
    }
    render() {
        return (
            <div className=" intro-form ">
                {/* modify this */}
                <h2 className="title text-center mb-4">Intro information</h2>
                <div className="form-box">
                    <form action="" onSubmit={this.handleSubmit}>
                        {this.renderInput("Header", "header")}

                        {this.renderTextarea("Description", "description")}

                        {this.renderButton("Save", "btn-success", "submit", {
                            width: "100%",
                        })}
                    </form>
                </div>
            </div>
        );
    }
}

export default ProjectForm;
