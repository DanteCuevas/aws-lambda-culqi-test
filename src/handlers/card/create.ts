import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ICardBodyCreate } from '../../interfaces/card.interface'
import db from '../../utils/prisma.utils'
import cache from '../../utils/redis.utils'
import CardDto from '../../dtos/card.dto'
import { fail, created, unprocessableEntity, unauthorized } from '../../utils/response.utils'
import CreateProductAction from '../../actions/card/create.action'
import ValidateMerchandiseAction from '../../actions/merchandise/validate.action'
import CreateCardRequest from '../../requests/card/create'
import UnauthorizedError from '../../utils/errors/unauthorized'
import Joi from 'joi'
import JoiErrorCustom from '../../utils/errors/joi'

(async () => {
  await db.$connect()
  await cache.connect()
})();

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    (new ValidateMerchandiseAction(event.headers.authorization)).execute();
    const body: ICardBodyCreate = JSON.parse(event.body as string)
    await (new CreateCardRequest(body)).validate()
    const data = CardDto.create(body)
    const card = await (new CreateProductAction(data)).execute();

    return created({ token: card.id })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return unauthorized({ message: error.message });
    }
    if (error instanceof Joi.ValidationError) {
      const message = JoiErrorCustom.format(error)
      return unprocessableEntity(message);
    }
    return fail()
  }
};
