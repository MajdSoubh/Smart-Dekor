import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./context/contextProvider";
import { ToastContainer } from "react-toastify";
import router from "./router";

/* style */
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/styles/index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <ContextProvider>
        <ToastContainer />
        <RouterProvider router={router} />
    </ContextProvider>
);
