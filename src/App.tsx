import * as React from 'react';
import './css/style.css';

import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  BrowserRouter,
} from 'react-router-dom';

import {
  LoginView,
  RESCalculatorView,
  UserArithmeticRecordsView,
} from './views';

import { APIKeys, APIURLs, lambdaURLS } from './config';
import { useState, useEffect } from 'react';

// MARK: Protect the routes
const ProtectedRoute = ({ children, session }) => {
  const navigate = useNavigate();
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    if (!session.isSessionAlive && !navigating) {
      setNavigating(true);
      navigate('/', { replace: true });
    }
  }, [session.isSessionAlive, navigate, navigating]);

  return session.isSessionAlive || navigating ? children : null;
};

// For Testing
// =============
const info = {
  isSessionAlive: true,
  status: 'active',
  date: '2023-01-23T06:28:40.894Z',
  balance: 100,
  userID: 1,
  username: 'luissantanderdev@gmail.com',
  sessionToken: 'abc4',
  randomNumbers: [-1],
};
// ============

// Generate a Random Integer to Use for cost and pass over to
// the server function
const generateARandomNumbersSetFromAPI = async (): Promise<number[]> => {
  let generatedRandomValues = [1];

  let res = await fetch(APIURLs.randomURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'generateIntegers',
      params: {
        apiKey: APIKeys.randomORGKey,
        n: 100,
        min: 1,
        max: 1000,
      },
      id: 42,
    }),
  });

  console.log(res);

  if (res.ok) {
    let data = await res.json();
    generatedRandomValues = data.result.random.data;
  }

  return generatedRandomValues;
};

export default function App() {
  // State
  const [session, updateSession] = useState(info);
  // const [session, updateSession] = useState({});

  // MARK: Event Handlers
  // =======================================
  // Handle Authentication with Amazon AWS
  const loginHandler = async (credentials): Promise<any> => {
    let awsResponse;
    let body = JSON.stringify(credentials);

    let randomNumbers: number[] = await generateARandomNumbersSetFromAPI();

    let res = await fetch(lambdaURLS.authURL, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let json = await res.json();

    console.log(json);

    if (json.error) {
      awsResponse = {
        isSessionAlive: false,
        ...json,
      };
    }

    console.log(72, body, randomNumbers);

    updateSession(awsResponse);

    return awsResponse;
  };

  // Handle Logging Out
  const loggingOutHandler = () => {
    updateSession({
      isSessionAlive: false,
      status: '',
      date: '',
      balance: -1,
      userID: -1,
      username: '',
      sessionToken: '',
      randomNumbers: [],
    });
    <Navigate to="/" replace />;
  };

  return (
    <React.Fragment>
      <div className="container mt-5">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<LoginView loginHandler={loginHandler} />}
            />
            <Route
              path="/calculator"
              element={
                <ProtectedRoute session={session}>
                  <RESCalculatorView
                    session={session}
                    loggingOutHandler={loggingOutHandler}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/records"
              element={
                <ProtectedRoute session={session}>
                  <UserArithmeticRecordsView session={session} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
}
