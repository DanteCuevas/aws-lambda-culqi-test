import { faker } from '@faker-js/faker';

class CardSeeder {
  public static generate = (quantity = 1) => {
    const dataJson = this.dataFaker();
    const dataArray = [];
    for (let index = 0; index < quantity; index++) {
      dataArray.push(this.dataFaker());
    }
    return quantity > 1 ? dataArray : dataJson;
  }

  private static dataFaker = () => {
    const provider = faker.helpers.arrayElement(['gmail.com', 'hotmail.com', 'yahoo.es'])
    const year = new Date().getFullYear()
    return {
      card_number: faker.finance.creditCardNumber({ issuer: '63[7-9]############L' }),
      cvv: faker.finance.creditCardCVV().toString(),
      expiration_month: faker.number.int({ min: 1, max: 12 }).toString(),
      expiration_year: faker.number.int({ min: year, max: year + 5 }).toString(),
      email: faker.internet.email({ provider })
    }
  }
}

export default CardSeeder
