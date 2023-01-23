import * as React from 'react';
import './style.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { Login, RESCalculatorView } from './Views';

const Protected = ({ children }) => {
  if (false) return <Navigate to="/" replace />;
  return children;
};

export default function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/calculator" element={<RESCalculatorView />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}
