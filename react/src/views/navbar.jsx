import React from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../assets/images/logo.svg";

/* Styles */
import "../assets/styles/nav.css";

const Navbar = () => {
    const navRef = React.createRef();
    const overlayRef = React.createRef();
    const displayList = () => {
        navRef.current.classList.toggle("expand");
        overlayRef.current.classList.toggle("show");
    };
    return (
        <nav ref={navRef}>
            <div className="header ">
                <div className="list"></div>
                <button
                    className="toggler-btn hover-color-gold"
                    onClick={displayList}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div ref={overlayRef} className="overlay"></div>
            <div className="mobile">
                <div className="logo">
                    <img className="logo-img" src={logo} alt="logo" />
                </div>
                <ul className="m-list">
                    <li className="m-list-item">
                        <NavLink
                            onClick={displayList}
                            className="nav-link hover-color-gold"
                            to="/home#home"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="m-list-item">
                        <NavLink
                            onClick={displayList}
                            className="nav-link hover-color-gold"
                            to="/home#projects"
                        >
                            Projects
                        </NavLink>
                    </li>
                    <li className="m-list-item">
                        <NavLink
                            onClick={displayList}
                            className="nav-link hover-color-gold"
                            to="/home#about-us"
                        >
                            About Us
                        </NavLink>
                    </li>
                    <li className="m-list-item">
                        <NavLink
                            onClick={displayList}
                            className="nav-link hover-color-gold"
                            to="/home#contact"
                        >
                            Contact
                        </NavLink>
                    </li>
                </ul>

                <div className="social-media">
                    <Link className="facebook hover-color">
                        <i className="bi bi-facebook"></i>
                    </Link>
                    <Link className="instgram hover-color">
                        <i className="bi bi-instagram"></i>
                    </Link>
                    <Link className="whatsapp hover-color">
                        <i className="bi bi-whatsapp"></i>
                    </Link>
                </div>
                <div className="nav-logo-title logo-title">
                    <span className="first">SMART</span>
                    <span className="second"> DEKOR</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
