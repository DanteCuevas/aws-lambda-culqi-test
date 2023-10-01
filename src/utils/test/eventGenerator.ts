import { APIGatewayProxyEventPart } from '../../interfaces/event.generator.interface'

const APIGatewayRequest = ({
  body,
  headers = {},
  httpMethod,
  path = '',
  queryStringParameters,
  pathParameters,
  stageVariables = null
}: APIGatewayProxyEventPart) => {
  const request = {
    body: body ? JSON.stringify(body) : null,
    headers,
    multiValueHeaders: {},
    httpMethod,
    isBase64Encoded: false,
    path,
    pathParameters: pathParameters || null,
    queryStringParameters: queryStringParameters || null,
    multiValueQueryStringParameters: null,
    stageVariables,
    requestContext: {
      accountId: '',
      apiId: '',
      httpMethod,
      identity: {
        accessKey: '',
        accountId: '',
        apiKey: '',
        apiKeyId: '',
        caller: '',
        cognitoAuthenticationProvider: '',
        cognitoAuthenticationType: '',
        cognitoIdentityId: '',
        cognitoIdentityPoolId: '',
        principalOrgId: '',
        sourceIp: '',
        user: '',
        userAgent: '',
        userArn: ''
      },
      path,
      stage: '',
      requestId: '',
      requestTimeEpoch: 3,
      resourceId: '',
      resourcePath: ''
    },
    resource: ''
  };
  return request;
};

module.exports = APIGatewayRequest;
