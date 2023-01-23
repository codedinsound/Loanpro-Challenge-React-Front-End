import * as React from 'react';
import './style.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { Login, RESCalculatorView } from './views';

import { lambdaURLS } from './config';
import { useState } from 'react';

// MARK: Protect the routes
const Protected = ({ children, isSessionAlive }) => {
  if (isSessionAlive) return children;
  return <Navigate to="/" replace />;
};

export default function App() {
  const [session, updateSession] = useState({ isSessionAlive: false });

  // MARK: Handle Authentication with Amazon AWS
  const loginHandler = async (credentials): Promise<boolean> => {
    console.log('app', credentials);

    // let body = JSON.stringify(credentials);

    // let res = await fetch(lambdaURLS.authURL, {
    //   method: 'POST',
    //   body,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    // let json = await res.json();

    // if (json.error) return false;

    const info = {
      status: 'active',
      date: '2023-01-23T06:28:40.894Z',
      balance: 4060,
      userID: 1,
      username: 'luissantanderdev@gmail.com',
      sessionToken: 'abc4',
    };

    updateSession({
      isSessionAlive: true,
      ...info,
    });

    console.log(session);

    return true;
  };

  const loggingOutHandler = () => {
    updateSession({ isSessionAlive: false });
  };

  return (
    <React.Fragment>
      <div className="container mt-5">
        <Router>
          <Routes>
            <Route path="/" element={<Login loginHandler={loginHandler} />} />

            <Route
              path="/calculator"
              element={
                <Protected isSessionAlive={session.isSessionAlive}>
                  <RESCalculatorView
                    userInfo={session}
                    loggingOutHandler={loggingOutHandler}
                  />
                </Protected>
              }
            />
          </Routes>
        </Router>
      </div>
    </React.Fragment>
  );
}
