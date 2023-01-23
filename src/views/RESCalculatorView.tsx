import * as React from 'react';
import { useState } from 'react';

import { lambdaURLS } from '../config';

// MARK: RES Calculator View
const RESCalculatorView = ({ userInfo, loggingOutHandler }) => {
  console.log(userInfo);
  // User Balance
  const [userStatus, updateUserStatus] = useState({
    balance: userInfo.balance,
    cost: 0,
    total: 0,
    userName: userInfo.username,
  });

  // Operations State
  const [currentOperation, updateCurrentOperation] = useState({
    operation: '',
    symbol: '',
    balance: '',
    cost: '',
    total: '',
  });

  // Handle Operation Button Pressed
  const handleOperationPressed = (e: any) => {
    const operation: string = e.target.id;

    const newUserStatus = { ...userStatus };
    let newOperationState = { ...currentOperation };

    newUserStatus.cost = 2;

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

    console.log(operation);

    updateUserStatus(newUserStatus);
    updateCurrentOperation(newOperationState);
  };

  const handleSubmitOperationToLambda = async () => {
    console.log('Submitting to Amazon AWS');

    let body = JSON.stringify({});

    let res = await fetch(
      'https://g0eq2tenb2.execute-api.us-west-1.amazonaws.com/Master-Stage/loanpro-challenge-aws-lambda-backend-dev-authenticate',
      {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    let json = await res.json();

    console.log(json);
  };

  // Log Out of the Res Calculator
  const logOut = () => {
    console.log('Logging Out Clearing Session Token');
    loggingOutHandler();
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
          <div className="row">Recent Operations</div>
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
            <div className="col">
              <button
                id="ADD"
                type="button"
                className="operations-btns"
                onClick={handleOperationPressed}
              >
                Add (+)
              </button>
            </div>
            <div className="col">
              <button
                id="SUBTRACT"
                type="button"
                className="operations-btns"
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
                className="operations-btns"
                onClick={handleOperationPressed}
              >
                Multiply (x)
              </button>
            </div>
            <div className="col">
              <button
                id="DIVIDE"
                type="button"
                className="operations-btns"
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
                className="operations-btns"
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
