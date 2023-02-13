import * as React from 'react';
import { useState } from 'react';

import { lambdaURLS } from '../config';
import { useNavigate } from 'react-router-dom';
import { getRandomIntegerFromSet } from '../utils';

// Initial States
// ==================================
const operationsInitialState = {
  operation: '',
  symbol: '',
  balance: '',
  cost: '',
  total: '',
};

// ==================================
// MARK: RES Calculator View
const RESCalculatorView = ({ session, updateBalance, loggingOutHandler }) => {
  const navigator = useNavigate();

  // Client State
  // ================================================
  // User Balance
  const [userStatus, updateUserStatus] = useState({
    balance: session.balance,
    cost: 0,
    total: 0,
    userName: session.username,
  });

  // Operations State
  const [currentOperation, updateCurrentOperation] = useState(
    operationsInitialState
  );

  // Event Handlers
  // ================================================
  // Handle Operation Button Pressed
  const handleOperationPressed = (e: any) => {
    const operation: string = e.target.id;

    const newUserStatus = { ...userStatus };
    let newOperationState = { ...currentOperation };

    newUserStatus.cost = getRandomIntegerFromSet(session.randomNumbers);

    newOperationState.balance = `${newUserStatus.balance}`;
    newOperationState.cost = `${newUserStatus.cost}`;

    if (operation === 'ADD') {
      newOperationState.operation = 'ADD';
      newOperationState.symbol = '+';
      newUserStatus.total = newUserStatus.balance + newUserStatus.cost;
      newOperationState.total = `${newUserStatus.total}`;
    }

    if (operation === 'SUBTRACT') {
      newOperationState.operation = 'SUBTRACT';
      newOperationState.symbol = '-';

      newUserStatus.total = newUserStatus.balance - newUserStatus.cost;
      newOperationState.total = `${newUserStatus.total}`;
    }

    if (operation === 'MULTIPLY') {
      newOperationState.operation = 'MULTIPLY';
      newOperationState.symbol = '*';
      newUserStatus.total = newUserStatus.balance * newUserStatus.cost;
      newOperationState.total = `${newUserStatus.total}`;
    }

    if (operation === 'DIVIDE') {
      newOperationState.operation = 'DIVIDE';
      newOperationState.symbol = '/';
      newUserStatus.total = newUserStatus.balance / newUserStatus.cost;
      newOperationState.total = `${newUserStatus.total}`;
    }

    if (operation === 'SQUARE_ROOT') {
      newOperationState.operation = 'SQUARE_ROOT';
      newOperationState.symbol = '√';
      newOperationState.balance = '';
      newOperationState.cost = '' + newUserStatus.balance;
      newUserStatus.total = Math.sqrt(newUserStatus.balance);
      newOperationState.total = `${newUserStatus.total}`;
    }

    if (operation === 'RANDOM') {
      newOperationState = {
        operation: 'RANDOM',
        symbol: '',
        balance: '',
        cost: '',
        total: '',
      };
    }

    updateUserStatus(newUserStatus);
    updateCurrentOperation(newOperationState);
  };

  const handleSubmitOperationToLambda = async () => {
    const body = JSON.stringify({
      userID: session.userID,
      operation: currentOperation.operation,
      cost: +currentOperation.cost,
    });

    const res = await fetch(lambdaURLS.processURL, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let json = await res.json();
    const { balance } = json;

    const newUserStatus = {
      balance,
      cost: 0,
      total: 0,
      userName: session.username,
    };

    updateBalance(balance);
    updateCurrentOperation(operationsInitialState);
    updateUserStatus(newUserStatus);
  };

  const logOut = () => {
    loggingOutHandler();
  };

  const navigateToArithmeticRecords = () => {
    navigator('/records');
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col mt-1">
          <div>User: {userStatus.userName}</div>
        </div>
        <div className="col mt-1 d-flex justify-content-end">
          <button className="btn btn-sm btn-danger" onClick={logOut}>
            Logout
          </button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col dis">
          <div className="row">Balance: {userStatus.balance}</div>
          <div className="row mt-3">
            <button
              className="btn btn-sm btn-primary w-75"
              onClick={navigateToArithmeticRecords}
            >
              Arithmetic Records
            </button>
          </div>
        </div>
        <div className="col">
          <div className="row text-end screen">
            <span>
              {currentOperation.balance} {currentOperation.symbol}{' '}
              {currentOperation.cost} = {currentOperation.total}
            </span>
          </div>
          <div className="row mt-1">
            <div className="col">Op: {currentOperation.operation}</div>
            <div className="col">Cost: {currentOperation.cost}</div>
          </div>
          <div className="row mt-1">
            <div className="col mh-100">
              <button
                id="ADD"
                type="button"
                className="operations-btns h-100"
                onClick={handleOperationPressed}
              >
                Add (+)
              </button>
            </div>
            <div className="col">
              <button
                id="SUBTRACT"
                type="button"
                className="operations-btns h-100"
                onClick={handleOperationPressed}
              >
                Subtract (-)
              </button>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col">
              <button
                id="MULTIPLY"
                type="button"
                className="operations-btns h-100"
                onClick={handleOperationPressed}
              >
                Multiply (x)
              </button>
            </div>
            <div className="col">
              <button
                id="DIVIDE"
                type="button"
                className="operations-btns h-100"
                onClick={handleOperationPressed}
              >
                Divide (/)
              </button>
            </div>
          </div>
          <div className="row mt-1">
            <div className="col">
              <button
                id="SQUARE_ROOT"
                type="button"
                className="operations-btns h-100"
                onClick={handleOperationPressed}
              >
                Square Root (√)
              </button>
            </div>
            <div className="col">
              <button
                id="RANDOM"
                type="button"
                className="operations-btns"
                onClick={handleOperationPressed}
              >
                Random (*)
              </button>
            </div>
          </div>
          <div className="row w-100 mt-3 mb-3 test-r">
            <button
              type="button"
              className="operations-btns-submit"
              onClick={handleSubmitOperationToLambda}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RESCalculatorView;
