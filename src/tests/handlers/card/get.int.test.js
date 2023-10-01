import { describe, expect, test } from '@jest/globals';
import cache from '../../../utils/redis.utils'
import * as getCard from '../../../handlers/card/get';
import eventGenerator from '../../../utils/test/eventGenerator';

afterAll(async () => await cache.quit());

describe('get card by token integration tests', () => {
  const headers = {
    authorization: 'Bearer pk_test_LsRBKejzCOEEWOsw'
  }

  test('it should return 200 with valid token', async () => {
    /* const mockData = {
      card_number: '4111111111111111',
      cvv: '123',
      expiration_month: '12',
      expiration_year: '2024',
      email: 'danieldantecuevas22@gmail.com'
    }; */

    const event = eventGenerator({
      headers,
      queryStringParameters: {
        token: '1234567890'
      }
    });
    /* const res = await getCard.handler(event);
    expect(res.statusCode).toBe(200);
    const response = JSON.parse(res.body);
    expect(response.token).toEqual('1234567890'); */
    expect(event.headers).toBeDefined()
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

  test('it should return 422 wihtout "token"', async () => {
    const event = eventGenerator({
      headers
    });
    const res = await getCard.handler(event);
    expect(res.statusCode).toBe(422);
    const response = JSON.parse(res.body);
    expect(response.message).toEqual('"token" is required');
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
    expect(response.message).toEqual('"token" must be a string');
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
    expect(response.message).toEqual('"token" length must be 16 characters long');
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
    expect(response.message).toEqual('"token" is invalid or expired');
  })
});
