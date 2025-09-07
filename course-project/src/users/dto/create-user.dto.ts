import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Bob', description: 'The name of user' })
  @Length(2, 20)
  @IsString()
  firstName: string;

  @Length(3, 20)
  @IsString()
  @ApiProperty({ example: 'Barker', description: 'The last name of user' })
  lastName: string;

  @ApiProperty({
    example: 'bob.barker@gmail.com',
    description: 'User email to log in',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'your_password',
    description: 'saved password to log in',
  })
  @Length(5, 20)
  @IsString()
  password: string;
}
