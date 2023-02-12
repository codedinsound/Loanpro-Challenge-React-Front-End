import React from 'react';
import { useState, useEffect } from 'react';

import {
  ArithmeticRecordsComponent,
  ModalComponent,
  PaginationComponent,
} from '../components';
import { useNavigate } from 'react-router-dom';
import { lambdaURLS } from '../config';
import { AsyncTimer } from '../utils';

// TESTING DUMMY DATA
// =====================================================================
const dummyRecords = [
  {
    id: '4-1',
    operation_id: 'ADD',
    date: new Date(),
    amount: 1000,
    user_balance: 100000,
  },
];
// =====================================================================

// MARK: User Arithmetic Records
const UserArithmeticRecordsView = ({ session }) => {
  // Client State
  // =========================================
  // const [recordsData, setRecordsData] = useState([]);

  const [reRender, setRenderToggle] = useState(false);

  const [recordsData, setRecordsData] = useState(dummyRecords);

  const [currentPage, setCurrentPage] = useState(0);
  const [recordsPerPage] = useState(2);
  const [searchTypeToggle, setSearchTypeToggle] = useState('btn-all');
  let [currentRecords, updateCurrentRecordsDisplay] = useState([]);

  const [showModal, toggleShowModal] = useState({
    show: true,
    record: {
      id: '',
      operation_id: '',
      date: new Date(),
      amount: -1,
      user_balance: -1,
    },
  });

  const navigate = useNavigate();

  // Get Records from AWS Lambda
  // useEffect(() => {
  //   let body = JSON.stringify({
  //     userID: session.userID,
  //     sessionToken: session.sessionToken,
  //   });

  //   const fetchData = async () => {
  //     const data = await fetch(lambdaURLS.recordsURL, {
  //       method: 'POST',
  //       body,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });

  //     const json = await data.json();
  //     setRecordsData(json);
  //   };

  //   fetchData().catch(console.error);
  // }, [fetch]);

  const lastRecordIndex = (currentPage + 1) * recordsPerPage;
  const firstRecordIndex = lastRecordIndex - recordsPerPage;
  const nPages = Math.ceil(recordsData.length / recordsPerPage);

  if (searchTypeToggle === 'btn-all')
    currentRecords = recordsData
      .slice(firstRecordIndex, lastRecordIndex)
      .reverse();

  // Events Handlers
  // =========================================

  const showModalHandler = (record): void => {
    console.log('Show Modal', record);

    toggleShowModal({
      show: true,
      record: record,
    });
  };

  const detectToggleHandler = (e: any) => {
    const choice = e.target.value;
    return searchTypeToggle !== choice ? setSearchTypeToggle(choice) : '';
  };

  const detectSearchAndUpdateHandler = (e: any) => {
    const searchQuery = e.target.value;
    const pattern = new RegExp(`^${searchQuery}`);

    let newCurrentRecords = recordsData.filter((record) => {
      return pattern.test(record.operation_id);
    });

    updateCurrentRecordsDisplay(newCurrentRecords.slice(0, 5));
  };

  const goBackToCalculatorView = () => {
    navigate('/calculator');
  };

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

  const modalCancelHandler = (): void => {
    console.log('Canceling Delete Operation from Modal');
    toggleShowModal({
      show: false,
      record: {
        id: '',
        operation_id: '',
        date: new Date(),
        amount: -1,
        user_balance: -1,
      },
    });
  };

  const deleteRecordFromDB = async () => {
    console.log(1, session);
    console.log(showModal);

    const body = JSON.stringify({
      userID: session.userID,
      sessionToken: session.sessionToken,
      operation: 'DELETE_RECORD',
      record: showModal.record,
    });

    // const awsResponse = await fetch(lambdaURLS.deleteRecordURL, {
    //   method: 'DELETE',
    //   body,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    // const json = await awsResponse.json();
    // console.log(json);

    await AsyncTimer.sleep(10000);

    console.log('Got a response');
  };

  return (
    <div className="container mt-5">
      {showModal.show && (
        <ModalComponent
          record={showModal.record}
          modalCancelHandler={modalCancelHandler}
          deleteRecordFromDB={deleteRecordFromDB}
        />
      )}
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
      <ArithmeticRecordsComponent
        recordsData={currentRecords}
        openModalHandler={showModalHandler}
      />
      {searchField}
    </div>
  );
};

export default UserArithmeticRecordsView;
