import React, { Component } from "react";

import Project from "./project.jsx";
import projectOne from "../assets/images/project-1.jpg";
import projectTwo from "../assets/images/project-2.jpg";
import projectThree from "../assets/images/project-3.jpg";
import projectFour from "../assets/images/project-4.jpg";
import projectFive from "../assets/images/project-5.jpg";
import projectSechs from "../assets/images/project-6.jpg";
import projectSeven from "../assets/images/project-7.jpg";
import projectEight from "../assets/images/project-8.jpg";

class Carousel extends Component {
    state = { projects: [], pagination: { currentPage: 0, pageLimit: 6 } };
    carouselRef = React.createRef();
    projectRef = React.createRef();
    arrowForwardRef = React.createRef();
    arrowBackwardRef = React.createRef();
    isDragStart = false;
    carouselHandleSlide = () => {
        const dragStart = (e) => {
            if (this.isDragStart) return;
            this.prePageX = e.pageX || e.touches[0].pageX;
            this.preCarouselScroll = this.carouselRef.current.scrollLeft;
            this.carouselRef.current.classList.add("dragging");
            this.isDragStart = true;
        };
        const dragging = (e) => {
            if (!this.isDragStart) return;
            this.isDragging = true;
            e.preventDefault();
            this.posDiff = (e.pageX || e.touches[0].pageX) - this.prePageX;
            this.carouselRef.current.scrollLeft =
                this.preCarouselScroll + this.posDiff;
        };
        const dragStop = () => {
            this.isDragStart = false;
            this.carouselRef.current.classList.remove("dragging");
            if (!this.isDragging) return;
            this.isDragging = false;
            autoSlide();
            this.carouselButtonsHide();
        };
        const autoSlide = () => {
            if (this.preCarouselScroll == this.carouselRef.current.scrollLeft)
                return;
            const moveValue = Math.abs(this.posDiff);
            let project = document.querySelector(".project");
            let margin = parseFloat(getComputedStyle(project).marginRight);
            let projectWidth = project.clientWidth + 2 * margin;
            const projectDiff = projectWidth - moveValue;
            if (parseInt(projectWidth) / 3 < moveValue) {
                this.carouselRef.current.scrollLeft +=
                    this.preCarouselScroll < this.carouselRef.current.scrollLeft
                        ? projectDiff
                        : -projectDiff;
            } else {
                this.carouselRef.current.scrollLeft +=
                    this.preCarouselScroll < this.carouselRef.current.scrollLeft
                        ? -moveValue
                        : moveValue;
            }
        };
        this.carouselRef.current.addEventListener("mousedown", dragStart);
        this.carouselRef.current.addEventListener("touchstart", dragStart);
        this.carouselRef.current.addEventListener("mousemove", dragging);
        this.carouselRef.current.addEventListener("touchmove", dragging);
        this.carouselRef.current.addEventListener("mouseup", dragStop);
        this.carouselRef.current.addEventListener("touchend", dragStop);
        this.carouselRef.current.addEventListener("mouseleave", dragStop);
    };
    componentDidMount() {
        const projects = [
            {
                title: "Project 1",
                description: "Manulife Canadian Head Office",
                img: projectOne,
            },
            {
                title: "Project 2",
                description: "Manulife Canadian Head Office",
                img: projectTwo,
            },
            {
                title: "Caivan Design Studio",
                description: "Manulife Canadian Head Office",
                img: projectThree,
            },
            {
                title: "Caivan Design Studio",
                description: "Manulife Canadian Head Office",
                img: projectFour,
            },
            {
                title: "Caivan Design Studio",
                description: "Manulife Canadian Head Office",
                img: projectFive,
            },
            {
                title: "Caivan Design Studio",
                description: "Manulife Canadian Head Office",
                img: projectSechs,
            },
            {
                title: "Caivan Design Studio",
                description: "Manulife Canadian Head Office",
                img: projectSeven,
            },
            {
                title: "Caivan Design Studio",
                description: "Manulife Canadian Head Office",
                img: projectEight,
            },
        ];
        this.carouselHandleSlide();
        this.setState({ projects });
    }

    handlePageChange = (currentPage) => {
        const pagination = { ...this.state.pagination };
        pagination.currentPage = currentPage;

        this.setState({ pagination });
    };
    carouselButtonsHide = () => {
        const carousel = this.carouselRef.current;
        setTimeout(() => {
            const backward = this.arrowBackwardRef.current;
            const forward = this.arrowForwardRef.current;
            carousel.scrollWidth - carousel.clientWidth - 150 <=
            carousel.scrollLeft
                ? forward.classList.add("disabled")
                : forward.classList.remove("disabled");
            carousel.scrollLeft - 150 > 0
                ? backward.classList.remove("disabled")
                : backward.classList.add("disabled");
            this.isDragStart = false;
        }, 250);
    };
    handleCarouselChange = (e, dir) => {
        if (this.isDragStart) return;
        this.isDragStart = true;
        let item = document.querySelector(".project");
        let width = item.clientWidth;
        let margin = parseInt(getComputedStyle(item).marginRight);
        const value = 2 * margin + width;
        const carousel = this.carouselRef.current;
        carousel.scrollLeft += dir == "l" ? value : -value;
        this.carouselButtonsHide();
    };
    render() {
        const projects = [...this.state.projects];

        return (
            <div className="carousel" id="carousel">
                <div className="projects-title">
                    <h2>Check our latest work</h2>
                    <p>Celebrating inspiring design & thought leadership.</p>
                </div>

                <div className="projects-group ">
                    <div ref={this.carouselRef} className="carousel">
                        {projects.map((p, ind) => {
                            return (
                                <Project
                                    ref={this.projectRef}
                                    key={ind}
                                    title={p.title}
                                    description={p.description}
                                    img={p.img}
                                />
                            );
                        })}
                    </div>
                    <span
                        onClick={(e) => this.handleCarouselChange(e, "r")}
                        className="arrow backward disabled"
                        ref={this.arrowBackwardRef}
                    >
                        <i className="bi bi-caret-left-fill"></i>
                    </span>
                    <span
                        onClick={(e) => this.handleCarouselChange(e, "l")}
                        className="arrow forward"
                        ref={this.arrowForwardRef}
                    >
                        <i className="bi bi-caret-right-fill"></i>
                    </span>
                </div>
                {/*       <Pagination
                    count={count}
                    limit={limit}
                    current={current}
                    onChange={this.handlePageChange}
                /> */}
            </div>
        );
    }
}

export default Carousel;
