import Joi from 'joi'
import { ICardBodyCreate } from '../../interfaces/card.interface'

const rulesJoi = Joi.object({
  card_number: Joi.string()
    .min(13)
    .max(16)
    .creditCard()
    .required(),

  cvv: Joi.string()
    .min(3)
    .max(4)
    .regex(/^\d+$/)
    .messages({ 'string.pattern.base': 'cvv must be contain only numbers' })
    .required(),

  expiration_month: Joi.number()
    .min(1)
    .max(12)
    .required(),

  expiration_year: Joi.string()
    .length(4)
    .regex(/^\d+$/)
    .custom((value, helper) => {
      console.log(value, typeof value)
      const year: number = parseInt(value)
      const currentYear: number = new Date().getFullYear()
      if (year < currentYear || year > currentYear + 5) {
        // @ts-ignore
        return helper.message('expiration_year must be a valid year')
      }
      return true
    })
    .messages({ 'string.pattern.base': 'expiration_year must be a number' })
    .required(),

  email: Joi.string()
    .email()
    .custom((value: string, helper) => {
      const domain: string = value.split('@')[1]
      if (domain !== 'gmail.com' && domain !== 'hotmail.com' && domain !== 'yahoo.es') {
        // @ts-ignore
        return helper.message('email must be a gmail.com, hotmail.com, yahoo.es')
      }
      return true
    })
    .required()
});

class CreateCardRequest {
  private body: ICardBodyCreate;
  constructor (body: ICardBodyCreate) {
    this.body = body;
  }

  public validate = async () => {
    await rulesJoi.validateAsync(this.body);
  }
}

export default CreateCardRequest;
