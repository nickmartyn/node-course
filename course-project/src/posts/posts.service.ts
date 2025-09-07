import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../users/user.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { Inject } from '@nestjs/common';
import { REDIS_CLIENT } from '../redis/redis.provider';
import type { RedisClientType } from 'redis';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @Inject(REDIS_CLIENT) private readonly redisClient: RedisClientType,
  ) {}

  async create(userId: string, post: CreatePostDto): Promise<Post> {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }
    const newPost = new Post();
    newPost.title = post.title;
    newPost.hashtag = post.hashtag;
    newPost.isPublished = post.isPublished;
    newPost.content = post.content;
    newPost.user = { id: userId } as User;
    const newlyCreatedPost = await this.postsRepository.save(newPost);
    await this.resetCacheValue(userId);
    return newlyCreatedPost;
  }

  async update(userId: string, postId: string, body: UpdatePostDto) {
    const updatedPost = await this.postsRepository.update(
      { id: postId, user: { id: userId } },
      body,
    );
    console.log('Updated post:', updatedPost);
    return updatedPost;
  }

  async findAll(userId?: string): Promise<Post[]> {
    let posts: Post[];

    const cachedPosts: string | null = await this.getCacheValue(userId!);

    if (cachedPosts) {
      console.log('Returning cached posts for user:', userId);
      return JSON.parse(cachedPosts) as Post[];
    }

    try {
      posts = await this.postsRepository.find({
        where: { user: { id: userId } },
      });
      await this.setCacheValue(userId!, JSON.stringify(posts));
      return posts;
    } catch (error) {
      console.error('Error retrieving posts:', error);
      throw error;
    }
  }

  findOne(id: string): Promise<Post | null> {
    console.log('Finding post with id:', id);
    let post: Promise<Post | null>;
    try {
      post = this.postsRepository.findOneBy({ id });
    } catch (error) {
      console.error('Error finding post:', error);
      throw error;
    }
    return post;
  }

  async delete(id: string, userId: string): Promise<void> {
    await this.postsRepository.delete({ id, user: { id: userId } });
  }

  async setCacheValue(key: string, value: string) {
    console.log('Setting cache for key:', key);
    await this.redisClient.set(key, value);
  }

  async getCacheValue(key: string) {
    return this.redisClient.get(key);
  }

  resetCacheValue(key: string) {
    console.log('Resetting cache for key:', key);
    return this.redisClient.del(key);
  }
}
