import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiBody,
} from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  @ApiOkResponse({ description: 'List of posts', type: [PostEntity] })
  @ApiForbiddenResponse({ description: 'Access denied' })
  async getAllPosts() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Post found', type: PostEntity })
  @ApiBadRequestResponse({ description: 'Invalid ID format' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  async getPost(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    console.log('Retrieved post:', post);
    if (!post) {
      return { message: 'Post not found' };
    }
    return post;
  }

  @Post()
  @ApiCreatedResponse({ description: 'Post created', type: PostEntity })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  async createPost(@Body() body: CreatePostDto) {
    const post = await this.postsService.create(body);
    return post;
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Post updated', type: PostEntity })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiBody({ type: UpdatePostDto })
  async updatePost(@Param('id') id: string, @Body() body: UpdatePostDto) {
    const post = await this.postsService.update(id, body);
    return post;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Post deleted' })
  @ApiBadRequestResponse({ description: 'Invalid ID format' })
  @ApiNotFoundResponse({ description: 'Post not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  async deletePost(@Param('id') id: string) {
    const post = await this.postsService.delete(id);
    return post;
  }
}
