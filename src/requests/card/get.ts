import Joi from 'joi'
import { ICardQueryCreate } from '../../interfaces/card.interface'

const rulesJoi = Joi.object({
  token: Joi.string()
    .length(16)
    .required()
});

class GetCardRequest {
  private body: ICardQueryCreate;
  constructor (body: ICardQueryCreate) {
    this.body = body ?? {};
  }

  public validate = async () => {
    await rulesJoi.validateAsync(this.body);
  }
}

export default GetCardRequest;
