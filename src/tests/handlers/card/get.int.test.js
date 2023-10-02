import { describe, expect, test } from '@jest/globals';
import cache from '../../../utils/redis.utils'
import * as getCard from '../../../handlers/card/get';
import eventGenerator from '../../../utils/test/eventGenerator';
import CardSeeder from '../../../seeders/card';

afterAll(async () => await cache.quit());

describe('get card by token integration tests', () => {
  const headers = {
    authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw'
  }

  test('it should return 200 with valid token', async () => {
    const body = CardSeeder.generate();
    delete body.cvv;
    const event = eventGenerator({
      headers,
      queryStringParameters: {
        token: 'MockToken'
      }
    });
    const dataFake = { statusCode: 200, body: JSON.stringify(body) }
    const responseDataSpy = jest.spyOn(getCard, 'handler').mockResolvedValueOnce(dataFake);
    const res = await getCard.handler(event);
    const response = JSON.parse(res.body);

    expect(res.statusCode).toBe(200);
    expect(response).toEqual(body);
    expect(responseDataSpy).toBeCalledWith(event)
  })

  test('it should return 401 without merchandise pk', async () => {
    const event = eventGenerator({});
    const res = await getCard.handler(event);

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
    const res = await getCard.handler(event);

    expect(res.statusCode).toBe(401);
    const response = JSON.parse(res.body);
    expect(response.message).toEqual('Invalid merchandise pk');
  })

  describe('rules token', () => {
    test('it should return 422 wihtout "token"', async () => {
      const event = eventGenerator({
        headers
      });
      const res = await getCard.handler(event);
      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.token[0]).toEqual('"token" is required');
    })

    test('it should return 422 wiht "token" must be a string', async () => {
      const event = eventGenerator({
        headers,
        queryStringParameters: {
          token: true
        }
      });
      const res = await getCard.handler(event);
      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.token[0]).toEqual('"token" must be a string');
    })

    test('it should return 422 wiht "token" length must be 16 characters long', async () => {
      const event = eventGenerator({
        headers,
        queryStringParameters: {
          token: '12345678901234567'
        }
      });
      const res = await getCard.handler(event);
      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.token[0]).toEqual('"token" length must be 16 characters long');
    })

    test('it should return 422 wiht "token" is invalid or expired', async () => {
      const event = eventGenerator({
        headers,
        queryStringParameters: {
          token: 'abcdABCD90123456'
        }
      });
      const res = await getCard.handler(event);
      expect(res.statusCode).toBe(422);
      const response = JSON.parse(res.body);
      expect(response.errors.token[0]).toEqual('"token" is invalid or expired');
    })
  })
});
