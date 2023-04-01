import React from "react";

import { Link } from "react-router-dom";

/* Styles */
import "../assets/styles/footer.css";
const Footer = ({
    data: { phone, email, whatsapp, facebook, instagram, address },
}) => {
    return (
        <footer id="contact">
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
        </footer>
    );
};

export default Footer;
