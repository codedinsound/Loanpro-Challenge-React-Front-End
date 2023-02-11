import * as React from 'react';
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

import './css/style.css';
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

// MARK: Initial State
const initialState = {
  isSessionAlive: false,
  status: '',
  date: '',
  balance: -1,
  userID: -1,
  username: '',
  sessionToken: '',
  randomNumbers: [],
};
// ============

// MARK: Generate Random Numbers from Random Org.
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
        min: -100,
        max: 1000,
      },
      id: 42,
    }),
  });

  if (res.ok) {
    let data = await res.json();
    generatedRandomValues = data.result.random.data;
  }

  return generatedRandomValues;
};

export default function App() {
  // Session State
  const [session, updateSession] = useState(initialState);

  // MARK: Event Handlers
  // =======================================
  // Handle Authentication with Amazon AWS
  const loginHandler = async (credentials): Promise<any> => {
    let awsResponse;
    let body = JSON.stringify(credentials);

    let randomNumbers: number[] = await generateARandomNumbersSetFromAPI();

    console.log(92, body);

    let res = await fetch(lambdaURLS.authURL, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let json = await res.json();

    console.log('App', 102, json);

    if (!json.error) {
      awsResponse = {
        isSessionAlive: true,
        ...json,
        randomNumbers,
      };

      updateSession(awsResponse);
    } else {
      awsResponse = {
        invalid: true,
        error: json.error,
      };
    }

    return awsResponse;
  };

  // Update balance change in session
  const updateBalanceInSessionState = (balance: number): void => {
    const newSessionState = {
      ...session,
      balance,
    };
    updateSession(newSessionState);
  };

  // Handle Logging Out
  const loggingOutHandler = () => {
    updateSession(initialState);

    console.log('app', 126, session);
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
                    updateBalance={updateBalanceInSessionState}
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
