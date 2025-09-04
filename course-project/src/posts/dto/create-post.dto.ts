import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsBoolean } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'My First Post',
    description: 'The title of the post',
  })
  @Length(10, 200)
  @IsString()
  title: string;

  @IsString()
  @ApiProperty({ example: '#nestjs', description: 'The hashtag of the post' })
  hashtag: string;

  // IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Whether the post is published',
    default: true,
  })
  isPublished: boolean;

  @IsString()
  @ApiProperty({
    example: 'This is my first post',
    description: 'The content of the post',
  })
  content: string;
}
