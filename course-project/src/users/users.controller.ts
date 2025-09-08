import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ClassSerializerInterceptor,
  UseInterceptors,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../decorators/public.decorator';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiBody,
  ApiBearerAuth,
  ApiTags
} from '@nestjs/swagger';
import type { AuthorizedUser } from '../types/authorizedUser.interface';
import { User as CurrentUser } from 'src/decorators/user.decorator';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiOkResponse({ description: 'User found', type: User })
  @ApiBadRequestResponse({ description: 'Invalid ID format' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiTags('Protected')
  @ApiBearerAuth('Bearer')
  async getUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Public()
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiCreatedResponse({ description: 'User created', type: User })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiBody({ type: CreateUserDto })
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.create(body);
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @ApiOkResponse({ description: 'User updated', type: User })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiTags('Protected')
  @ApiBearerAuth('Bearer')
  @ApiBody({ type: UpdateUserDto })
  async updateUser(
    @CurrentUser() currentUser: AuthorizedUser,
    @Param('id') userId: string,
    @Body() body: Partial<User>,
  ) {
    if (currentUser.userId !== userId) {
      throw new ForbiddenException('You can only update your own user');
    }
    const user = await this.usersService.update(userId, body);
    return user;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'User deleted' })
  @ApiBadRequestResponse({ description: 'Invalid ID format' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Access denied' })
  @ApiTags('Protected')
  @ApiBearerAuth('Bearer')
  async deleteUser(
    @CurrentUser() currentUser: AuthorizedUser,
    @Param('id') id: string,
  ) {
    if (currentUser.userId !== id) {
      throw new ForbiddenException('You can only update your own user');
    }
    await this.usersService.delete(id);
    return id;
  }
}
