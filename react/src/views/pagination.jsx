import React from "react";
import _ from "lodash";
import "../assets/styles/pagination.css";
const Pagination = ({ count, limit, current, onChange }) => {
  const numberOfPages = Math.ceil(count / limit);
  const pages = _.range(1, numberOfPages + 1);
  return (
    <div className="pagination">
      <ul className="pagination-list">
        {pages.map((l, i) => {
          return (
            <li
              key={l}
              onClick={() => onChange(i)}
              className={
                i === current
                  ? "pagination-page hover-color active"
                  : "pagination-page hover-color "
              }
            >
              {l}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Pagination;
