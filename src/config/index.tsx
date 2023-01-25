// MARK: API Keys for Testing
const APIKeys = {
  randomORGKey: '6b591cde-a756-4f16-9b68-46f63cd14494',
};

// MARK: API Urls
const APIURLs = {
  randomURL: 'https://api.random.org/json-rpc/1/invoke',
};

// MARK: AWS Lambda Endpoits
const lambdaURLS = {
  authURL:
    'https://g0eq2tenb2.execute-api.us-west-1.amazonaws.com/Master-Stage/loanpro-challenge-aws-lambda-backend-dev-authenticate',
  processURL:
    'https://g0eq2tenb2.execute-api.us-west-1.amazonaws.com/Master-Stage/loanpro-challenge-aws-lambda-backend-dev-processarithmetic',
  recordsURL:
    'https://g0eq2tenb2.execute-api.us-west-1.amazonaws.com/Master-Stage/loanpro-challenge-aws-lambda-backend-dev-retrieverecord',
};

export { APIKeys, APIURLs, lambdaURLS };
