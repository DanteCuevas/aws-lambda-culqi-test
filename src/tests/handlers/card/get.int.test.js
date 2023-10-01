import { describe, expect, test } from '@jest/globals';
import cache from '../../../utils/redis.utils'
import * as getCard from '../../../handlers/card/get';
import eventGenerator from '../../../utils/test/eventGenerator';

afterAll(async () => await cache.quit());

describe('get products integration tests', () => {
  test('it should return 200 and empty data', async () => {
    const event = eventGenerator({
      queryStringParameters: {
        name: 'xxxxxxxx'
      }
    });
    const res = await getCard.handler(event);
    expect(res.statusCode).toBe(422);
    const body = JSON.parse(res.body);
    expect(body).toEqual([]);
  })
});
