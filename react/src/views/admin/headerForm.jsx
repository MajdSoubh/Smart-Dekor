import React from "react";
import Form from "../common/form";
import http from "../../httpClient";

class HeaderForm extends Form {
    state = {
        data: {
            introTitle: "",
            introDescription: "",
            outroTitle: "",
            outroDescription: "",
            portfolioDescription: "",
        },
        errors: {},
    };

    async componentDidMount() {
        try {
            const { data } = await http.get("/header");
            this.mapDataToView(data);
        } catch (ex) {
            console.log("intro : ", ex);
        }
    }
    mapDataToView = (resData) => {
        const data = {};
        data.introTitle = resData.introTitle || "";
        data.introDescription = resData.introDescription || "";
        data.outroTitle = resData.outroTitle || "";
        data.outroDescription = resData.outroDescription || "";
        data.portfolioDescription = resData.portfolioDescription || "";
        this.setState({ data });
    };
    async doSubmit() {
        const data = { ...this.state.data };
        try {
            const res = await http.post("/header/store", data);
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
            <div className=" header-form ">
                <h2 className="title text-center mb-4">Headers information</h2>
                <div className="form-box">
                    <form action="" onSubmit={this.handleSubmit}>
                        {this.renderInput("Intro title", "introTitle")}

                        {this.renderTextarea(
                            "Intro description",
                            "introDescription"
                        )}
                        {this.renderInput("Outro title", "outroTitle")}

                        {this.renderTextarea(
                            "Outro description",
                            "outroDescription"
                        )}
                        {this.renderTextarea(
                            "Portfolio description",
                            "portfolioDescription"
                        )}

                        {this.renderButton("Save", "btn-success", "submit", {
                            width: "100%",
                        })}
                    </form>
                </div>
            </div>
        );
    }
}

export default HeaderForm;
