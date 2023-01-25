import React from 'react';
import { useState, useEffect } from 'react';

import { ArithmeticRecordsComponent, PaginationComponent } from '../components';
import { useNavigate } from 'react-router-dom';
import { lambdaURLS } from '../config';

// MARK: User Arithmetic Records
const UserArithmeticRecordsView = ({ session }) => {
  // Record States
  const [recordsData, setRecordsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage] = useState(2);
  const [searchTypeToggle, setSearchTypeToggle] = useState('btn-all');
  let [currentRecords, updateCurrentRecordsDisplay] = useState([]);

  const navigate = useNavigate();

  // Get Records from AWS Lambda
  useEffect(() => {
    let body = JSON.stringify({
      userID: session.userID,
      sessionToken: session.sessionToken,
    });

    const fetchData = async () => {
      const data = await fetch(lambdaURLS.recordsURL, {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const json = await data.json();
      setRecordsData(json);
    };

    fetchData().catch(console.error);
  }, [fetch]);

  const lastRecordIndex = (currentPage + 1) * recordsPerPage;
  const firstRecordIndex = lastRecordIndex - recordsPerPage;
  const nPages = Math.ceil(recordsData.length / recordsPerPage);

  if (searchTypeToggle === 'btn-all')
    currentRecords = recordsData
      .slice(firstRecordIndex, lastRecordIndex)
      .reverse();

  // Events Handlers
  // =========================================
  // Detect toggle function
  const detectToggleHandler = (e: any) => {
    const choice = e.target.value;
    return searchTypeToggle !== choice ? setSearchTypeToggle(choice) : '';
  };

  // Detect search queries
  const detectSearchAndUpdateHandler = (e: any) => {
    const searchQuery = e.target.value;
    const pattern = new RegExp(`^${searchQuery}`);

    let newCurrentRecords = recordsData.filter((record) => {
      return pattern.test(record.operation_id);
    });

    updateCurrentRecordsDisplay(newCurrentRecords.slice(0, 5));
  };

  // Goes back to the RES Calculator View
  const goBackToCalculatorView = () => {
    navigate('/calculator');
  };

  // Type of search field
  const searchField =
    searchTypeToggle === 'btn-all' ? (
      <PaginationComponent
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    ) : (
      <div className="row text-center">
        <div className="col mb-3">
          <input
            onChange={detectSearchAndUpdateHandler}
            type="text"
            placeholder="record search..."
          />
        </div>
      </div>
    );

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col"></div>
        <div className="col-auto ml-auto">
          <button
            className="btn btn-sm btn-danger mt-1"
            onClick={goBackToCalculatorView}
          >
            Back
          </button>
        </div>
      </div>
      <div className="row text-center">
        <h3 className="mt-2">Arithmetic Records</h3>
      </div>
      <div className="row text-center">
        <div className="col">
          <button
            className={`btn btn-sm mx-1 ${
              searchTypeToggle === 'btn-all' ? 'btn-primary' : 'btn-secondary'
            }`}
            value="btn-all"
            onClick={detectToggleHandler}
          >
            All
          </button>
          <button
            className={`btn btn-sm mx-1 ${
              searchTypeToggle === 'btn-all' ? 'btn-secondary' : 'btn-primary'
            }`}
            value="btn-search"
            onClick={detectToggleHandler}
          >
            Search
          </button>
        </div>
      </div>
      <ArithmeticRecordsComponent recordsData={currentRecords} />
      {searchField}
    </div>
  );
};

export default UserArithmeticRecordsView;
