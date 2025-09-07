import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseModel } from '../entities/baseModel';
import { User } from 'src/users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Post extends BaseModel {
  @Column()
  @ApiProperty({
    example: 'My First Post',
    description: 'The title of the post',
  })
  title: string;

  @Column()
  @ApiProperty({ example: '#nestjs', description: 'The hashtag of the post' })
  hashtag: string;

  @Column({ default: false })
  @ApiProperty({ example: false, description: 'Whether the post is published' })
  isPublished: boolean;

  @Column()
  @ApiProperty({
    example: 'This is my first post',
    description: 'The content of the post',
  })
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  @ApiProperty({
    example: 'id',
    description: 'The author user id of the post',
  })
  user: User;
}
