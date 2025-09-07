import { Module } from '@nestjs/common';
import { RedisProvider } from './redis.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [RedisProvider],
  exports: [RedisProvider],
})
export class RedisModule {}
