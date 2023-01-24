import * as React from 'react';
import sha256 from 'crypto-js/sha256';

import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

const LoginView = ({ loginHandler }) => {
  // State 
  // ========================
  const [isInvalidLogin, isInvalidUpdate] = useState(false); 

  const navigate = useNavigate();

  console.log(isInvalidLogin);

  // Event Handlers 
  // =========================
  const detectInputChange = () => {
      if (isInvalidLogin) 
        isInvalidUpdate(false); 
  }

  const handleOnSubmitLogin = async (e: any): Promise<void> => {
    e.preventDefault();

    let protectedPassword = '';

    if (e.target.password.value != '')
      protectedPassword = sha256(e.target.password.value).toString();

    console.log(protectedPassword);

    interface Credentials {
        u: string, 
        p: string
    }

    const credentials: Credentials = {
      u: e.target.email.value,
      p: protectedPassword,
    };

    let canNavigate: boolean = await loginHandler(credentials);

    isInvalidUpdate(true);


    if (canNavigate) {
      navigate('/calculator');
    } else {
      navigate('/');
    }
  };

  let errorMessage: any; 
  if (isInvalidLogin) {
      errorMessage = <div>{"Invalid Login"}</div>;
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
