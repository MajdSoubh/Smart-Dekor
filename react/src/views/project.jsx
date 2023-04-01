import React, { Component } from "react";

class Project extends Component {
    render() {
        const { title, description, img } = this.props;
        return (
            <div className="project">
                <div className="project-image">
                    <img className="project-image" src={img} alt="" />
                </div>
                <div className="project-description">
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
            </div>
        );
    }
}

export default Project;
