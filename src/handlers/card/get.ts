import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ICardQueryCreate } from '../../interfaces/card.interface'
import { success, fail, unprocessableEntity, badRequest } from '../../utils/response.utils'
import cache from '../../utils/redis.utils'
import { decryp } from '../../utils/cryptojs.utils'

(async () => {
  await cache.connect()
})();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const params = event.queryStringParameters as ICardQueryCreate
    if (params === null || !params.token) {
      return unprocessableEntity({ message: 'Token is required' })
    }
    const card = await cache.get(params.token)
    if (!card) {
      return badRequest({ message: 'Invalid token or expired' })
    }
    let data = JSON.parse(card)
    data = {
      card_number: decryp(data.card_number),
      expiration_month: decryp(data.expiration_month),
      expiration_year: decryp(data.expiration_year),
      email: decryp(data.email)
    }
    return success(data)
  } catch (error) {
    console.log(error)
    return fail()
  }
};
