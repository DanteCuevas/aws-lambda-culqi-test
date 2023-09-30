import * as redis from 'redis'
import { RedisClientType } from '@redis/client';

class SingletonRedis {
  private _constructor () { }
  private static instance: RedisClientType;
  public static getInstance (): RedisClientType {
    if (!SingletonRedis.instance) {
      SingletonRedis.instance = redis.createClient({
        url: 'redis://serverless-redis-culqi:6379'
      });
    }

    return SingletonRedis.instance;
  }
}

const cache = SingletonRedis.getInstance();

export default cache
