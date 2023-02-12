import React, { useState } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { AsyncTimer } from '../utils';

const ModalComponent = ({ record, modalCancelHandler, deleteRecordFromDB }) => {
  const [isLoading, updateLoading] = useState('initial');

  const deleteRecordHandler = async () => {
    console.log('Delete');
    updateLoading('loading');
    await deleteRecordFromDB();

    updateLoading('success');

    await AsyncTimer.sleep(2000);

    modalCancelHandler();
  };

  let modalBody;

  if (isLoading === 'initial') {
    modalBody = (
      <ul className="list-group">
        <li className="list-group-item">ID: {record.id}</li>
        <li className="list-group-item">
          Date: {record.date.toLocaleString()}
        </li>
        <li className="list-group-item">Operation: {record.operation_id}</li>
        <li className="list-group-item">Amount: {record.amount}</li>
        <li className="list-group-item">User Balance: {record.user_balance}</li>
      </ul>
    );
  }

  if (isLoading === 'loading') {
    modalBody = (
      <div className="row d-flex justify-content-center loading">
        <ClipLoader
          color={'red'}
          loading={isLoading === 'loading' ? true : false}
          size={75}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <div className="text-center">Deleting Record....</div>
      </div>
    );
  }

  if (isLoading === 'success') {
    modalBody = (
      <div className="text-center">Record {record.id} Deleted Successfully</div>
    );
  }

  return (
    <div
      className="modal fade show"
      tabIndex={-1}
      role="dialog"
      style={{ display: true ? 'block' : 'none' }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <div></div>
            <h5 className="modal-title">Delete Record</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={modalCancelHandler}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{modalBody}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={modalCancelHandler}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteRecordHandler}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
