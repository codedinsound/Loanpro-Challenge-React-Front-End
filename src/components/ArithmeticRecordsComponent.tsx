import React, { useState } from 'react';

const TableRowComponent = ({ record, onDoubleClickRecordOpenModalHandler }) => {
  const date: Date = new Date(record.date);

  const onDoubleClickTableRowHandler = (): void => {
    onDoubleClickRecordOpenModalHandler(record);
  };

  return (
    <tr key={record.id} onDoubleClick={onDoubleClickTableRowHandler}>
      <td>{record.id}</td>
      <td>{record.operation_id}</td>
      <td>{date.toLocaleDateString()}</td>
      <td>{record.amount}</td>
      <td>{record.user_balance}</td>
    </tr>
  );
};

const ArithmeticRecordsComponent = ({ recordsData }) => {
  // State
  // =========================================
  const [showModal, setShowModal] = useState(true);

  // Event Handlers
  // =========================================
  const onDoubleClickRecordOpenModalHandler = (record): void => {
    console.log(record);
    setShowModal(true);
  };

  const tableRows = recordsData.map((record) => {
    const row = (
      <TableRowComponent
        record={record}
        onDoubleClickRecordOpenModalHandler={
          onDoubleClickRecordOpenModalHandler
        }
      />
    );

    return row;
  });

  return (
    <div className="row">
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Operation ID</th>
            <th scope="col">Date</th>
            <th scope="col">Cost</th>
            <th scope="col">Balance</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
};

export default ArithmeticRecordsComponent;
