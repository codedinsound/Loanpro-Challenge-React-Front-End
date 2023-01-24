import React from 'react';
import { useState, useEffect } from 'react';

import { ArithmeticRecordsComponent, PaginationComponent } from '../components';

// MARK: User Arithmetic Records
const UserArithmeticRecordsView = () => {
  // Record States
  const [recordsData, setRecordsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage] = useState(2);
  const [searchTypeToggle, setSearchTypeToggle] = useState('btn-all');

  let [currentRecords, updateCurrentRecordsDisplay] = useState([]);

  // Toggle All and Search Field

  // Get Records from AWS Lambda
  useEffect(() => {
    console.log('effect loading after component rendered');

    setRecordsData([
      {
        id: 1,
        dp2: 'test 1',
        dp3: 'test 1',
        dp4: 'test 1',
      },
      {
        id: 2,
        dp2: 'data x',
        dp3: 'data 3',
        dp4: 'data 4',
      },
      {
        id: 3,
        dp2: 'data 2',
        dp3: 'data 3',
        dp4: 'data 4',
      },
      {
        id: 4,
        dp2: 'data 2',
        dp3: 'data 3',
        dp4: 'data 4',
      },
      {
        id: 5,
        dp2: 'data 2',
        dp3: 'data 3',
        dp4: 'data 4',
      },
      {
        id: 6,
        dp2: 'data 2',
        dp3: 'data 3',
        dp4: 'data 4',
      },
    ]);
  }, []);

  const lastRecordIndex = (currentPage + 1) * recordsPerPage;
  const firstRecordIndex = lastRecordIndex - recordsPerPage;
  const nPages = Math.ceil(recordsData.length / recordsPerPage);

  if (searchTypeToggle === 'btn-all') {
    currentRecords = recordsData.slice(firstRecordIndex, lastRecordIndex);
  }

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
      return pattern.test(record.dp2);
    });

    updateCurrentRecordsDisplay(newCurrentRecords.slice(0, 5));
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
          <button className="btn btn-sm btn-danger mt-1">Back</button>
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
