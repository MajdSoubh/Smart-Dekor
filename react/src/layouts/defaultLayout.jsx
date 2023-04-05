import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../views/footer";
import Navbar from "../views/navbar";
import http from "../httpClient";
class defaultLayout extends Component {
    state = { contact: {} };
    async componentDidMount() {
        let { data } = await http.get("/contact");

        this.setState({ contact: data });
    }
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Outlet />
                <Footer data={this.state.contact} />
            </React.Fragment>
        );
    }
}

export default defaultLayout;
