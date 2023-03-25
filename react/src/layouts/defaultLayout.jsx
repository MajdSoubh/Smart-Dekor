import React from "react";
import http from "../httpClient";
import adminLogo from "../assets/images/admin-2.svg";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/contextProvider";
/* Styles */
import "../assets/styles/admin.css";
const DefaultLayout = () => {
    const { user, token, setToken } = useStateContext();
    if (!token) {
        return <Navigate to="/admin/login" />;
    }
    const sidebarRef = React.createRef();
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const res = await http.post("/logout");
        } catch (ex) {
            console.log(ex);
        }
        setToken(null);
        return <Navigate to="/login" />;
    };

    const toggelSidebar = (e) => {
        sidebarRef.current.classList.toggle("expand");
    };
    return (
        <React.Fragment>
            <div className="admin">
                <aside ref={sidebarRef} className="">
                    <div className="top">
                        <div className="logo">
                            <img src={adminLogo} alt="" />
                            <h2>Admin</h2>
                        </div>
                        <div onClick={toggelSidebar} className="close-btn">
                            <i className="bi bi-x"></i>
                        </div>
                    </div>
                    <div className="sidebar">
                        <a className="list-item" href="">
                            <i className="bi bi-grid-fill"></i>
                            <h3>Dashboard</h3>
                        </a>
                        <a className="list-item active" href="">
                            <i className="bi bi-grid-fill"></i>
                            <h3>Intro</h3>
                        </a>
                        <a className="list-item" href="">
                            <i className="bi bi-grid-fill"></i>
                            <h3>Projects</h3>
                        </a>
                        <a className="list-item" href="">
                            <i className="bi bi-grid-fill"></i>
                            <h3>Outro</h3>
                        </a>
                        <a className="list-item" href="">
                            <i className="bi bi-grid-fill"></i>
                            <h3>Contact</h3>
                        </a>
                        <a onClick={handleLogout} className="list-item" href="">
                            <i className="bi bi-box-arrow-right"></i>
                            <h3>Logout</h3>
                        </a>
                    </div>
                </aside>
                <nav>
                    <ul className="nav-list">
                        <li
                            className="list-item expand-btn"
                            onClick={toggelSidebar}
                        >
                            open
                        </li>
                        <li className="list-item">profile</li>
                        <li onClick={handleLogout} className="list-item">
                            Logout
                        </li>
                    </ul>
                </nav>
                <main>
                    <Outlet />
                </main>
            </div>
        </React.Fragment>
    );
};

export default DefaultLayout;
