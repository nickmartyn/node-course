import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    example: 'bob@gmail.com',
    description: 'email of the registered user',
  })
  email: string;

  @ApiProperty({
    example: 'yourStrongP@ssw0rd',
    description: 'password of the registered user',
  })
  password: string;
}
