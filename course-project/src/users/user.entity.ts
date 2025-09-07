import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { BaseModel } from '../entities/baseModel';
import { Post } from '../posts/post.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseModel {
  @Column()
  @ApiProperty({ example: 'Bob', description: 'The name of user' })
  firstName: string;

  @Column()
  @ApiProperty({ example: 'Barker', description: 'The last name of user' })
  lastName: string;

  @Column({ unique: true })
  @ApiProperty({
    example: 'bob.barker@gmail.com',
    description: 'User email to log in',
  })
  email: string;

  @Column()
  @ApiProperty({ example: 'password', description: 'saved password to log in' })
  passwordHash: string;

  @Column({ default: true })
  @ApiProperty({
    example: true,
    description: 'Whether user is active in the system',
  })
  isActive: boolean;

  @OneToMany(() => Post, (post) => post.user)
  @ApiProperty({ example: '', description: 'Id of related entity' })
  @JoinColumn()
  posts: Post[];
}
