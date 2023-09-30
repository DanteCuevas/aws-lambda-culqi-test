import { ICardGeTResponse } from '../../interfaces/card.interface'
import { Card } from '@prisma/client';
import cache from '../../utils/redis.utils'
import { decryp } from '../../utils/cryptojs.utils'

class GetProductAction {
  private token: string

  constructor (token: string) {
    this.token = token
  }

  public execute = async (): Promise<ICardGeTResponse|null> => {
    const cacheCard = await cache.get(this.token)
    if (!cacheCard) {
      return null
    }
    const data: Card = JSON.parse(cacheCard);

    return this.decryp(data)
  }

  private decryp = (card: Card): ICardGeTResponse => {
    return {
      card_number: decryp(card.card_number),
      expiration_month: decryp(card.expiration_month),
      expiration_year: decryp(card.expiration_year),
      email: decryp(card.email)
    }
  }
}

export default GetProductAction;
