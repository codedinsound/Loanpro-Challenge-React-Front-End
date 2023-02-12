import React from 'react';

const ModalComponent = ({ record, modalCancelHandler, deleteRecordFromDB }) => {
  const deleteRecordHandler = async () => {
    console.log('Delete');

    await deleteRecordFromDB();
  };

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
          <div className="modal-body">
            <ul className="list-group">
              <li className="list-group-item">ID: {record.id}</li>
              <li className="list-group-item">
                Date: {record.date.toLocaleString()}
              </li>
              <li className="list-group-item">
                Operation: {record.operation_id}
              </li>

              <li className="list-group-item">Amount: {record.amount}</li>
              <li className="list-group-item">
                User Balance: {record.user_balance}
              </li>
            </ul>
          </div>
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
