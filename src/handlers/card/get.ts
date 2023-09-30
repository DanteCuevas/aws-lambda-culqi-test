import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ICardQueryCreate } from '../../interfaces/card.interface'
import { success, fail, unprocessableEntity } from '../../utils/response.utils'
import cache from '../../utils/redis.utils'
import GetProductAction from '../../actions/card/get.action'

(async () => {
  await cache.connect()
})();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = event.queryStringParameters as ICardQueryCreate
    if (params === null || !params.token) {
      return unprocessableEntity({ message: 'Token is required' })
    }
    const data = await (new GetProductAction(params.token)).execute();
    if (!data) {
      return unprocessableEntity({ message: 'Invalid Token or Expired' })
    }

    return success(data)
  } catch (error) {
    return fail()
  }
};
