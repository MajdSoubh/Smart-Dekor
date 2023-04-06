import React, { Component } from "react";

import Intro from "./intro";
import Outro from "./outro";
import Carousel from "./carousel";
import Footer from "./footer";

/* images */
import logo from "../assets/images/logo.svg";
import http from "../httpClient";

class Home extends Component {
    state = {
        intro: { introTitle: "", introDesc: "" },
        outro: { outroTitle: "", outroDesc: "" },
    };

    async componentDidMount() {
        const intro = {
            introTitle: "LUXURY INTERIOR ARCHITECTURE AND DESIGN",
            introDesc:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus doloremque perspiciatis sapiente nam ullam rem magni nemo minima et. Recusandae autem impedit vel dolore pariatur ea ratione hic, harum fuga doloribus ducimus, facere mollitia debitis esse exercitationem iusto! Dolor, voluptates?",
        };
        const outro = {
            outroTitle: "Connecting people to place",
            outroDesc:
                "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus doloremque perspiciatis sapiente nam ullam rem magni nemo minima et. Recusandae autem impedit vel dolore pariatur ea ratione hic, harum fuga doloribus ducimus, facere mollitia debitis esse exercitationem iusto! Dolor, voluptates?",
        };

        this.setState({ intro, outro });
    }
    render() {
        return (
            <section id="home" className="home">
                <div className=" home-header">
                    <div className="home-logo">
                        <div className="home-item logo-title">
                            <span className="first">SMART</span>
                            <span className="second"> DEKOR</span>
                        </div>
                        <div className="home-item">
                            <img className="logo-img" src={logo} alt="logo" />
                        </div>
                    </div>
                </div>

                <div className="container">
                    {/* Intro */}

                    <Intro data={this.state.intro} />
                    <hr className="horizontal-line" />
                    {/* Projects */}
                    <Carousel />
                    {/* vertical-line */}
                    {/*    <div className="vertical-line ">
                        <span className="line"></span>
                    </div> */}
                    <hr className="horizontal-line" />
                    <Outro data={this.state.outro} />
                </div>
            </section>
        );
    }
}

export default Home;
