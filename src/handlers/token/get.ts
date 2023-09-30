import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { success, fail } from '../../utils/response.utils';
import db from '../../utils/prisma.utils'
db.$connect()

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const token = await db.token.findMany();

    return success({ message: 'get data token', token, event });
  } catch (error) {
    return fail();
  }
};
