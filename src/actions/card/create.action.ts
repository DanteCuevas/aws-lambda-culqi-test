import { ICardDtoCreate } from '../../interfaces/card.interface'
import { Card } from '@prisma/client';
import db from '../../utils/prisma.utils'
import cache from '../../utils/redis.utils'

class CreateProductAction {
  private data: ICardDtoCreate

  constructor (data: ICardDtoCreate) {
    this.data = data
  }

  public execute = async (): Promise<Card> => {
    const card = await db.card.create({ data: this.data })
    this.cacheCard(card);

    return card
  }

  private cacheCard = async (card: Card) => {
    await cache.setEx(card.id, this.expireCache(), JSON.stringify(card))
  }

  private expireCache = (): number => {
    return 60 * 15
  }
}

export default CreateProductAction;
