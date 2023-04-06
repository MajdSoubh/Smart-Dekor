import React from "react";

import { Link } from "react-router-dom";

const Footer = ({
    data: { phone, email, whatsapp, facebook, instagram, address },
}) => {
    return (
        <footer id="footer">
            <div className="footer-container container">
                <div className="box-1">
                    <div className="logo-title">
                        <span className="first">SMART</span>
                        <span className="second"> DEKOR</span>
                    </div>
                    <ul className="footer-navgation">
                        <li>Home</li>
                        <li>Portfolio</li>
                        <li>About us</li>
                    </ul>
                </div>

                <div className="box-2">
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
                    <div className="copyright">Copyright &#169;2023 </div>
                </div>
                <div className="box-3">
                    <div className="address list-item">
                        <i class="bi bi-geo-alt-fill"></i>
                        Tartous
                    </div>
                    <div className="phone list-item">
                        <i class="bi bi-telephone-fill"></i>
                        +963937293296
                    </div>
                    <div className="email list-item">
                        <i class="bi bi-envelope-fill"></i>
                        majdsoubh53@gmail.com
                    </div>
                </div>
            </div>
        </footer>

        /*  <footer id="contact">
            <div className="social-media">
                {facebook && (
                    <Link className="facebook hover-color" to={facebook}>
                        <i className="bi bi-facebook"></i>
                    </Link>
                )}
                {instagram && (
                    <Link className="instgram hover-color" to={instagram}>
                        <i className="bi bi-instagram"></i>
                    </Link>
                )}
                {whatsapp && (
                    <Link className="whatsapp hover-color" to={whatsapp}>
                        <i className="bi bi-whatsapp"></i>
                    </Link>
                )}
            </div>
            <div className="contact">
                {address && <div className="address">Address: {address}</div>}
                {phone && <div className="phone">T: {phone}</div>}
                {email && <div className="email">E: {email}</div>}
            </div>

            <div className="copyright">Copyright &#169;2023 </div>
        </footer> */
    );
};

export default Footer;
