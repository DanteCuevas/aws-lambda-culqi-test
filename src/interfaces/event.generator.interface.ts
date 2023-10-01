import { APIGatewayProxyEvent } from 'aws-lambda'

export type APIGatewayProxyEventPart = Pick<
  APIGatewayProxyEvent,
  'body' | 'httpMethod' | 'path' | 'queryStringParameters' | 'pathParameters' | 'stageVariables'
>
