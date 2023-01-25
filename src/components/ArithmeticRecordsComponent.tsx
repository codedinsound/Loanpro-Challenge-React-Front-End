import React from 'react';

const ArithmeticRecordsComponent = ({ recordsData }) => {
  const list = recordsData.map((record) => {
    const date: Date = new Date(record.date);

    return (
      <tr key={record.id}>
        <td>{record.id}</td>
        <td>{record.operation_id}</td>
        <td>{date.toLocaleDateString()}</td>
        <td>{record.amount}</td>
        <td>{record.user_balance}</td>
      </tr>
    );
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
        <tbody>{list}</tbody>
      </table>
    </div>
  );
};

export default ArithmeticRecordsComponent;
