import React from 'react';

const ArithmeticRecords = ({ recordsData }) => {
  const dummyTestData = [
    {
      id: 1,
      dp2: 'data 2',
      dp3: 'data 3',
      dp4: 'data 4',
    },
  ];

  let list = dummyTestData.map((record) => {
    return (
      <tr>
        <td>{record.id}</td>
        <td>{record.dp2}</td>
        <td>{record.dp3}</td>
        <td>{record.dp4}</td>
      </tr>
    );
  });

  return (
    <div>
      <div className="row">
        <div></div>
        <button className="">Back</button>
      </div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">ID</th>
            <th scope="col">ID</th>
            <th scope="col">ID</th>
          </tr>
        </thead>
        <tbody>{list}</tbody>
      </table>
    </div>
  );
};

export default ArithmeticRecords;
