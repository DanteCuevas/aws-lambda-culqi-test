import { APIGatewayProxyResult } from 'aws-lambda';

const buildResponse = (statusCode: number, data: object): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify(data)
  };
}

const success = (data: object): APIGatewayProxyResult => {
  return buildResponse(200, data);
}

const created = (data: object): APIGatewayProxyResult => {
  return buildResponse(201, data);
}

const badRequest = (data: object): APIGatewayProxyResult => {
  return buildResponse(400, data);
}

const notFound = (data: object): APIGatewayProxyResult => {
  return buildResponse(404, data);
}

const unprocessableEntity = (data: object): APIGatewayProxyResult => {
  return buildResponse(422, data);
}

const fail = (data: object = { message: 'Server error, try again' }): APIGatewayProxyResult => {
  return buildResponse(500, data);
}

export {
  success,
  created,
  badRequest,
  notFound,
  unprocessableEntity,
  fail
};