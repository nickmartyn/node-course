import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(post: Partial<Post>): Promise<Post> {
    const newPost = this.postsRepository.create(post);
    return this.postsRepository.save(newPost);
  }

  async update(id: string, body: UpdatePostDto) {
    await this.postsRepository.update(id, body);
    return this.postsRepository.findOneBy({ id });
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
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

  async delete(id: string): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
