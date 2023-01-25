import * as React from 'react';
import sha256 from 'crypto-js/sha256';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginView = ({ loginHandler }) => {
  // State
  // ========================
  const [isInvalidLogin, isInvalidUpdate] = useState({
    invalid: false,
    error: '',
  });

  const navigate = useNavigate();

  // Event Handlers
  // =========================
  const detectInputChange = () => {
    if (isInvalidLogin.invalid) isInvalidUpdate({ invalid: false, error: '' });
  };

  const handleOnSubmitLogin = async (e: any): Promise<void> => {
    e.preventDefault();

    let protectedPassword: string = '';

    if (e.target.password.value != '')
      protectedPassword = sha256(e.target.password.value).toString();

    interface Credentials {
      u: string;
      p: string;
    }

    const credentials: Credentials = {
      u: e.target.email.value,
      p: protectedPassword,
    };

    const canNavigate: any = await loginHandler(credentials);

    if (canNavigate.invalid) {
      isInvalidUpdate({
        invalid: true,
        error: canNavigate.error,
      });
    }

    if (canNavigate.isSessionAlive) {
      navigate('/calculator');
    } else {
      navigate('/');
    }
  };

  let errorMessage: any;
  if (isInvalidLogin.invalid) {
    console.log(isInvalidLogin);
    errorMessage = <div>{isInvalidLogin.error}</div>;
  }

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
              onChange={detectInputChange}
            ></input>
          </div>
          <div className="mb-3">
            <label className="form-label">Password: </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="enter password..."
              onChange={detectInputChange}
            ></input>
          </div>
          {errorMessage}
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
