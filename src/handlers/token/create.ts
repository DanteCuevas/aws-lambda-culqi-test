import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Prisma } from '@prisma/client';
import { success, fail } from '../../utils/response.utils';
import db from '../../utils/prisma.utils'
db.$connect()

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const body: Prisma.TokenUncheckedCreateInput = JSON.parse(event.body as string);
    const data: Prisma.TokenUncheckedCreateInput = {
      card_number: body.card_number,
      cvv: body.cvv,
      expiration_month: body.expiration_month,
      expiration_year: body.expiration_year,
      email: body.email
    };
    const token = await db.token.create({ data });
    return success({ message: 'create token', token });
  } catch (error) {
    console.log(error);
    return fail();
  }
};
