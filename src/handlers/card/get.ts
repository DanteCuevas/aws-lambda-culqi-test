import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ICardQueryCreate } from '../../interfaces/card.interface'
import { success, fail, unprocessableEntity } from '../../utils/response.utils'
import cache from '../../utils/redis.utils'
import GetProductAction from '../../actions/card/get.action'
import GetCardRequest from '../../requests/card/get'
import Joi from 'joi'

(async () => {
  await cache.connect()
})();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = event.queryStringParameters as ICardQueryCreate
    await (new GetCardRequest(params)).validate()
    const data = await (new GetProductAction(params.token)).execute()
    if (!data) {
      return unprocessableEntity({ message: 'tokens is invalid  or expired' })
    }

    return success(data)
  } catch (error) {
    if (error instanceof Joi.ValidationError) {
      const { message } = error.details[0];
      return unprocessableEntity({ message });
    }
    return fail()
  }
};
