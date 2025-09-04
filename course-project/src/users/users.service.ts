import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    console.log('Finding user with id:', id);
    let user: User | null;
    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
    return user;
  }

  async update(id, user: Partial<User>): Promise<User | null> {
    await this.usersRepository.update(id, user);
    return this.usersRepository.findOneBy({ id: user.id });
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
