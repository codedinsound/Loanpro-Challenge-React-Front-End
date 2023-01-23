import React from 'react';

const ArithmeticRecordsComponent = ({ recordsData }) => {
  let list = recordsData.map((record) => {
    return (
      <tr key={record.id}>
        <td>{record.id}</td>
        <td>{record.dp2}</td>
        <td>{record.dp3}</td>
        <td>{record.dp4}</td>
      </tr>
    );
  });

  return (
    <div className="row">
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

export default ArithmeticRecordsComponent;

{
  /* <div className="row">
<div></div>
<button className="">Back</button>
</div> */
}
