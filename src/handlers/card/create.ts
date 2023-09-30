import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ICardBodyCreate } from '../../interfaces/card.interface'
import db from '../../utils/prisma.utils'
import cache from '../../utils/redis.utils'
import CardDto from '../../dtos/card.dto'
import { fail, created } from '../../utils/response.utils'

(async () => {
  await db.$connect()
  await cache.connect()
})();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const body: ICardBodyCreate = JSON.parse(event.body as string)
    const data = CardDto.create(body)
    const card = await db.card.create({ data })
    await cache.setEx(card.id, 60, JSON.stringify(card))

    return created({ token: card.id })
  } catch (error) {
    return fail()
  }
};
