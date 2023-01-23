import * as React from 'react';

const Login = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h2 className="text-center">User Login</h2>
        </div>
      </div>
      <div className="row d-flex">
        <form className="w-50 mt-1 mx-auto">
          <div className="mb-3">
            <label className="form-label">Username: </label>
            <input type="email" className="form-control"></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Password: </label>
            <input type="password" className="form-control"></input>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
        <div className="row">.</div>
      </div>
    </div>
  );
};

export default Login;
