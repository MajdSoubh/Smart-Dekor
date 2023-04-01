import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "../common/pagination";
import Table from "../common/table";
/* styles */
import "../../assets/styles/table.css";
class ProjectTable extends Component {
    state = {
        projects: [
            {
                id: 1,
                title: "hello my name is majd af adf adfsdfsdf",
                description: "asfas",
            },
            { id: 2, title: "ahello2", description: "basfa2s" },
            { id: 3, title: "f", description: "asfas" },
            { id: 4, title: "aheldfsadfsadfgdflo2", description: "basfa2s" },
        ],
        sortColumns: [],
        search: "",
        currentPage: 1,
        pageLimit: 4,
    };
    columns = [
        {
            label: "Title",
            path: "title",
        },
        { label: "Description", path: "description" },

        {
            label: "Action",
            key: "action",
            content: (project) => {
                return (
                    <div>
                        {this.renderTableButtons(project)}
                        {this.renderRemove(project)}
                    </div>
                );
            },
        },
    ];
    renderTableButtons(project) {
        return (
            <div className="table-buttons">
                <button
                    data-bs-toggle="modal"
                    data-bs-target="#remove-modal"
                    className="btn btn-danger "
                >
                    <i className="bi bi-trash-fill"></i>
                </button>
                <Link
                    className="btn btn-secondary"
                    to={`/admin/project/modify/${project.id}`}
                >
                    <i className="bi bi-pencil-square"></i>
                </Link>
            </div>
        );
    }
    renderRemove(project) {
        return (
            <div class="modal fade" id="remove-modal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5">Alert</h1>
                            <button
                                type="button"
                                class="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div class="modal-body">Are you sure from remove?</div>
                        <div class="modal-footer">
                            <button
                                type="button"
                                class="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => this.handleDelete(project)}
                                type="button"
                                class="btn btn-danger"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleChange = ({ currentTarget: input }) => {
        const { name, value } = input;

        this.setState({ [name]: value });
    };
    handleSort = (sortColumns) => {
        this.setState({ sortColumns });
    };
    handleDelete = (project) => {
        /*   const projects = this.state.projects.filter((m) => m.id !== project.id);
        this.setState({ projects }); */
    };
    handelPageChange = (currentPage) => {
        this.setState({ currentPage });
    };
    paginate(items, itemsCount, pageSize, selectedPage) {
        const startIndex = (selectedPage - 1) * pageSize;
        return _(items).slice(startIndex).take(pageSize).value();
    }

    getPageData() {
        const { pageLimit, currentPage, sortColumns, search, projects } =
            this.state;

        /* searching */
        const searched = projects.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
        );
        /* sorting */
        const sorted = _.orderBy(
            searched,
            _.map(sortColumns, "name"),
            _.map(sortColumns, "order")
        );
        /* pagination */
        const data = this.paginate(
            sorted,
            sorted.length,
            pageLimit,
            currentPage
        );

        const count = searched.length;
        return { count, data };
    }

    render() {
        const { count, data: projects } = this.getPageData();
        return (
            <div className="admin-projects">
                <div className="  m-3 text-center">
                    <div className="table-utility mb-3">
                        <input
                            type="text"
                            value={this.state.search}
                            onChange={this.handleChange}
                            name="search"
                            className="form-control table-search"
                            placeholder="Search"
                        />
                        <Link
                            to="/admin/project/add"
                            className="btn btn-primary "
                        >
                            Add Project
                        </Link>
                    </div>
                    {count == 0 && (
                        <h4 styles={{ textAlign: "center" }} className="mt-4">
                            Sorry no data found
                        </h4>
                    )}
                    {count != 0 && (
                        <Table
                            data={projects}
                            columns={this.columns}
                            onSort={this.handleSort}
                            sortColumns={this.state.sortColumns}
                        />
                    )}
                    <Pagination
                        onPageChange={this.handelPageChange}
                        currentPage={this.state.currentPage}
                        pageLimit={this.state.pageLimit}
                        itemCount={count}
                    />
                </div>
            </div>
        );
    }
}
export default ProjectTable;
