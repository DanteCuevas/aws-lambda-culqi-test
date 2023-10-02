import { describe, expect, test } from '@jest/globals';
import cache from '../../../utils/redis.utils'
import * as createCard from '../../../handlers/card/create';
import eventGenerator from '../../../utils/test/eventGenerator';
import CardSeeder from '../../../seeders/card';

afterAll(async () => await cache.quit());

describe('create token integration tests', () => {
  const headers = {
    authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw'
  }

  test('it should return 200 with valid token', async () => {
    const body = CardSeeder.generate();
    const event = eventGenerator({ headers, body })
    const res = await createCard.handler(event);

    expect(res.statusCode).toBe(201);
    const response = JSON.parse(res.body);
    expect(response.token).toBeDefined();
  })

  describe('rules merchandise pk', () => {
    test('it should return 401 without merchandise pk', async () => {
      const event = eventGenerator({});
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(401);
      const response = JSON.parse(res.body);
      expect(response.message).toEqual('Invalid merchandise pk');
    })

    test('it should return 401 wiht invalid merchandise pk', async () => {
      const event = eventGenerator({
        headers: {
          authorization: 'Bearer pk_test_1'
        }
      });
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(401);
      const response = JSON.parse(res.body);
      expect(response.message).toEqual('Invalid merchandise pk');
    })
  })

  describe('rules card_number', () => {
    test('it should return 422 when the "card_number" is no present in the body', async () => {
      const body = CardSeeder.generate();
      delete body.card_number;
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.card_number[0]).toBe('"card_number" is required');
    })

    test('it should return 422 when the body is correct but the "card_number" must be a string', async () => {
      const body = CardSeeder.generate();
      body.card_number = true
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.card_number[0]).toBe('"card_number" must be a string');
    })

    test('it should return 422 when the body is correct but the "card_number" length must be at least 13 characters long', async () => {
      const body = CardSeeder.generate();
      body.card_number = '123412341234'
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.card_number[0]).toBe('"card_number" length must be at least 13 characters long');
    })

    test('it should return 422 when the body is correct but the "card_number" length must be less than or equal to 16 characters long', async () => {
      const body = CardSeeder.generate();
      body.card_number = '12341234123412341234'
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.card_number[0]).toBe('"card_number" length must be less than or equal to 16 characters long');
    })

    test('it should return 422 when the body is correct but the "card_number" must be a credit card', async () => {
      const body = CardSeeder.generate();
      body.card_number = '123412341234123a'
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.card_number[0]).toBe('"card_number" must be a credit card');
    })
  })

  describe('rules cvv', () => {
    test('it should return 422 when the "cvv" is no present in the body', async () => {
      const body = CardSeeder.generate();
      delete body.cvv;
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.cvv[0]).toBe('"cvv" is required');
    })

    test('it should return 422 when the body is correct but the "cvv" must be a string', async () => {
      const body = CardSeeder.generate();
      body.cvv = true
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.cvv[0]).toBe('"cvv" must be a string');
    })

    test('it should return 422 when the body is correct but the "cvv" length must be at least 3 characters long', async () => {
      const body = CardSeeder.generate();
      body.cvv = '12'
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.cvv[0]).toBe('"cvv" length must be at least 3 characters long');
    })

    test('it should return 422 when the body is correct but the "cvv" length must be less than or equal to 4 characters long', async () => {
      const body = CardSeeder.generate();
      body.cvv = '12345'
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.cvv[0]).toBe('"cvv" length must be less than or equal to 4 characters long');
    })

    test('it should return 422 when the body is correct but the "cvv" must be contain only numbers', async () => {
      const body = CardSeeder.generate();
      body.cvv = 'abc'
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.cvv[0]).toBe('"cvv" must be contain only numbers');
    })
  })

  describe('rules expiration_month', () => {
    test('it should return 422 when the "expiration_month" is no present in the body', async () => {
      const body = CardSeeder.generate();
      delete body.expiration_month;
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.expiration_month[0]).toBe('"expiration_month" is required');
    })

    test('it should return 422 when the body is correct but the "expiration_month" must be a number', async () => {
      const body = CardSeeder.generate();
      body.expiration_month = true
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.expiration_month[0]).toBe('"expiration_month" must be a number');
    })

    test('it should return 422 when the body is correct but the "expiration_month" must be greater than or equal to 1', async () => {
      const body = CardSeeder.generate();
      body.expiration_month = 0
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.expiration_month[0]).toBe('"expiration_month" must be greater than or equal to 1');
    })

    test('it should return 422 when the body is correct but the "expiration_month" must be less than or equal to 12', async () => {
      const body = CardSeeder.generate();
      body.expiration_month = 13
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.expiration_month[0]).toBe('"expiration_month" must be less than or equal to 12');
    })
  })

  describe('rules expiration_year', () => {
    test('it should return 422 when the "expiration_year" is no present in the body', async () => {
      const body = CardSeeder.generate();
      delete body.expiration_year;
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.expiration_year[0]).toBe('"expiration_year" is required');
    })

    test('it should return 422 when the body is correct but the "expiration_year" must be a string', async () => {
      const body = CardSeeder.generate();
      body.expiration_year = true
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.expiration_year[0]).toBe('"expiration_year" must be a string');
    })

    test('it should return 422 when the body is correct but the "expiration_year" must be contain only numbers', async () => {
      const body = CardSeeder.generate();
      body.expiration_year = 'abcd'
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.expiration_year[0]).toBe('"expiration_year" must be contain only numbers');
    })

    test('it should return 422 when the body is correct but the "expiration_year" length must be 4 characters long', async () => {
      const body = CardSeeder.generate();
      body.expiration_year = '123'
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.expiration_year[0]).toBe('"expiration_year" length must be 4 characters long');
    })

    test('it should return 422 when the body is correct but the "expiration_year" must be a valid year', async () => {
      const body = CardSeeder.generate();
      body.expiration_year = ((new Date().getFullYear()) - 2).toString()
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.expiration_year[0]).toBe('"expiration_year" must be a valid year');
    })
  })

  describe('rules email', () => {
    test('it should return 422 when the "email" is no present in the body', async () => {
      const body = CardSeeder.generate();
      delete body.email;
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.email[0]).toBe('"email" is required');
    })

    test('it should return 422 when the body is correct but the "email" must be a string', async () => {
      const body = CardSeeder.generate();
      body.email = true
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.email[0]).toBe('"email" must be a string');
    })

    test('it should return 422 when the body is correct but the "email" must be a valid email', async () => {
      const body = CardSeeder.generate();
      body.email = 'abcd'
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.email[0]).toBe('"email" must be a valid email');
    })

    test('it should return 422 when the body is correct but the "email" must be a gmail.com, hotmail.com, yahoo.es', async () => {
      const body = CardSeeder.generate();
      body.email = 'prueba@prueba.com'
      const event = eventGenerator({ headers, body })
      const res = await createCard.handler(event);

      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.email[0]).toBe('"email" must be a gmail.com, hotmail.com, yahoo.es');
    })
  })
})
