import React from 'react';

const PaginationComponent = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(0);

  // Set the next page handler
  const nextPageHandler = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };

  // Set the previous page
  const prevPageHandler = () => {
    if (currentPage !== 0) setCurrentPage(currentPage - 1);
  };

  let numbers = pageNumbers.map((pgNumber) => {
    console.log('insde map', currentPage, pgNumber);

    return (
      <li className={`page-item ${currentPage === pgNumber ? 'active' : ''} `}>
        <button
          className="page-link"
          onClick={() => {
            setCurrentPage(pgNumber);
          }}
        >
          {pgNumber + 1}
        </button>
      </li>
    );
  });

  return (
    <nav className="row">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button className="page-link" onClick={prevPageHandler}>
            Previous
          </button>
        </li>
        {numbers}
        <li className="page-item">
          <button className="page-link" onClick={nextPageHandler}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;
