import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ICardBodyCreate } from '../../interfaces/card.interface'
import db from '../../utils/prisma.utils'
import cache from '../../utils/redis.utils'
import CardDto from '../../dtos/card.dto'
import { fail, created } from '../../utils/response.utils'
import CreateProductAction from '../../actions/card/create.action'

(async () => {
  await db.$connect()
  await cache.connect()
})();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const body: ICardBodyCreate = JSON.parse(event.body as string)
    const data = CardDto.create(body)
    const card = await (new CreateProductAction(data)).execute();

    return created({ token: card.id })
  } catch (error) {
    return fail()
  }
};
