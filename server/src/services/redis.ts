import { createClient, RedisClientType } from 'redis';

class RedisWrapper {
  private _client?: RedisClientType<any, any>;

  get client() {
    if (!this._client) throw new Error('Cannot access Redis Client before connecting');
    return this._client;
  }

  async connect() {
    this._client = createClient({ url: process.env.REDIS_HOST });

    this.client.on('error', (err) => {
      console.error('Redis Connection Error:', err);
      throw new Error('Failed to connect to redis');
    });

    await this.client.connect();
  }
}

export const redisWrapper = new RedisWrapper();
