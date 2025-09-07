import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

export const REDIS_CLIENT = Symbol('REDIS_CLIENT');

export const RedisProvider: Provider = {
  inject: [ConfigService],
  provide: REDIS_CLIENT,
  useFactory: async (configService: ConfigService) => {
    const redisUrl = configService.get<string>('REDIS_URL');
    const client: RedisClientType = createClient({
      url: redisUrl,
    });

    client.on('connect', () => {
      console.log('Connected to Redis...');
    });

    client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    await client.connect();
    return client;
  },
};
