import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { User } from '../users/user.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    TypeOrmModule.forFeature([User]),
    RedisModule,
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [TypeOrmModule],
})
export class PostsModule {}
