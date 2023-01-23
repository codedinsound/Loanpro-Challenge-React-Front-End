import React from 'react';

const PaginationComponent = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice();

  console.log(pageNumbers);

  return (
    <nav>
      <ul>
        <li>
          <button>Previous</button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;
