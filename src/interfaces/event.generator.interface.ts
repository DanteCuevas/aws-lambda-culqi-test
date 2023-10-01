import { APIGatewayProxyEvent } from 'aws-lambda'

export type APIGatewayProxyEventPart = Pick<
  APIGatewayProxyEvent,
  'body' | 'headers' | 'httpMethod' | 'path' | 'queryStringParameters' | 'pathParameters' | 'stageVariables'
>
