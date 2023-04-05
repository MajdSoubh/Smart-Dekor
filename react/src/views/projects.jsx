import React, { Component } from "react";
import Footer from "./footer";
import http from "../httpClient";
class Projects extends Component {
    state = {
        projects: [],
        categories: [],
        selectedCategory: "",
        imageShow: false,
    };
    categoryListRef = React.createRef();
    async componentDidMount() {
        const { data: projects } = await http.get("project");
        const { data: categories } = await http.get("category");
        this.setState({ projects, categories });
    }
    categoryListDisplayToggle = () => {
        this.categoryListRef.current.classList.toggle("expand");
    };
    handleImageShow = () => {
        this.setState({ imageShow: !this.state.imageShow });
    };
    handleSelectCategory = (category) => {
        this.categoryListRef.current.classList.remove("expand");
        this.setState({ selectedCategory: category });
    };
    getProjects = () => {
        if (!this.state.selectedCategory) return this.state.projects;
        const projects = this.state.projects.filter(
            (project) => project.category.name == this.state.selectedCategory
        );
        return projects;
    };
    render() {
        const projects = this.getProjects();
        return (
            <div className="projects container-fluid">
                <div className="header">
                    <h1 className="title">Portfolio</h1>
                    <p className="description">
                        Whether it’s an office space, retail space, restaurant,
                        or hotel, Abel Design Group offers a trifecta of
                        crossover expertise, service, and agility that has
                        resulted in successful projects and longstanding
                        relationships.
                    </p>
                </div>
                <div>
                    <ul className="categories-list">
                        <li
                            className={
                                !this.state.selectedCategory ? "active" : ""
                            }
                            onClick={() => this.handleSelectCategory("")}
                        >
                            All
                        </li>
                        {this.state.categories.slice(0, 2).map((cat, ind) => (
                            <React.Fragment key={ind}>
                                <li>
                                    <span className="gap-line"></span>
                                </li>
                                <li
                                    className={
                                        this.state.selectedCategory === cat.name
                                            ? "active"
                                            : ""
                                    }
                                    onClick={() =>
                                        this.handleSelectCategory(cat.name)
                                    }
                                >
                                    {cat.name}
                                </li>
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
                <div className="other-categories">
                    <span
                        onClick={this.categoryListDisplayToggle}
                        className="other-categories-btn "
                    >
                        More Categories
                    </span>
                    <ul
                        ref={this.categoryListRef}
                        className="others-categories-list"
                    >
                        {this.state.categories.slice(2).map((cat, ind) => (
                            <li
                                key={ind}
                                className={
                                    this.state.selectedCategory === cat.name
                                        ? "active"
                                        : ""
                                }
                                onClick={() =>
                                    this.handleSelectCategory(cat.name)
                                }
                            >
                                {cat.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="projects-container">
                    {projects.map((project, ind) => {
                        return (
                            <div key={ind} className="project">
                                <h3 className="title">{project.title}</h3>
                                <div className="images">
                                    {project.images.map((img, ind) => {
                                        return (
                                            <div className="img-box">
                                                <img
                                                    key={ind}
                                                    src={img.path}
                                                    alt=""
                                                />
                                                <div className="img-overlay"></div>
                                                <button
                                                    onClick={
                                                        this.handleImageShow
                                                    }
                                                    className="show-btn btn btn-outline-light"
                                                >
                                                    Show
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                                <p className="description">
                                    {project.description}
                                </p>
                                <div
                                    ref={this.imageDisplayRef}
                                    className=" image-display"
                                ></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Projects;
