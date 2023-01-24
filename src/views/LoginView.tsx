import * as React from 'react';
import sha256 from 'crypto-js/sha256';

import { useNavigate } from 'react-router-dom';

const LoginView = ({ loginHandler }) => {
  const navigate = useNavigate();

  const handleOnSubmitLogin = async (e: any): Promise<void> => {
    e.preventDefault();

    console.log(e.target.password.value);

    let protectedPassword = '';

    if (e.target.password.value != '')
      protectedPassword = sha256(e.target.password.value).toString();

    console.log(protectedPassword);

    const credentials = {
      u: e.target.email.value,
      p: protectedPassword,
    };

    console.log(credentials);

    let canNavigate: boolean = await loginHandler(credentials);

    console.log(canNavigate);

    if (canNavigate) {
      navigate('/calculator');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col">
          <h2 className="text-center">User Login</h2>
        </div>
      </div>
      <div className="row d-flex">
        <form className="w-50 mt-1 mx-auto mb-3" onSubmit={handleOnSubmitLogin}>
          <div className="mb-3">
            <label className="form-label">Email: </label>
            <input
              type="email"
              id="email"
              className="form-control"
              defaultValue=""
              placeholder="enter email..."
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Password: </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="enter password..."
            ></input>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
