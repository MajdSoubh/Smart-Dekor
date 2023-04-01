import React, { Component } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../views/navbar";
class defaultLayout extends Component {
    state = {};

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Outlet />
            </React.Fragment>
        );
    }
}

export default defaultLayout;
