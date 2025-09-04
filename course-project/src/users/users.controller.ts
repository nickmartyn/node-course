import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiBody,
} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get(':id')
  @ApiOkResponse({ description: 'User found', type: User })
  @ApiBadRequestResponse({ description: 'Invalid ID format' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    console.log('Retrieved user:', user);
    if (!user) {
      return { message: 'User not found' };
    }
    return user;
  }

  @Post()
  @ApiCreatedResponse({ description: 'User created', type: User })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(body);
    return user;
  }

  @Put()
  @ApiOkResponse({ description: 'User updated', type: User })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiBody({ type: UpdateUserDto })
  async updateUser(@Body() body: Partial<User>) {
    const user = await this.usersService.update(body.id, body);
    return user;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'User deleted' })
  @ApiBadRequestResponse({ description: 'Invalid ID format' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  async deleteUser(@Param('id') id: string) {
    const user = await this.usersService.delete(id);
    return user;
  }
}
