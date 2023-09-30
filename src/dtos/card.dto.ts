import { ICardBodyCreate, ICardDtoCreate } from '../interfaces/card.interface';
import { encryp, tokenCard } from '../utils/cryptojs.utils';

class CardDto {
  public static create = (body: ICardBodyCreate): ICardDtoCreate => {
    return {
      id: tokenCard(),
      card_number: encryp(body.card_number.toString()),
      cvv: encryp(body.cvv.toString()),
      expiration_month: encryp(body.expiration_month),
      expiration_year: encryp(body.expiration_year),
      email: encryp(body.email),
      merchandice: 'cadena'
    }
  }
}

export default CardDto;
