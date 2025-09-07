import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const newUser = new User();

    const { firstName, lastName, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;

    newUser.passwordHash = hashedPassword;

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

  async findOneByEmail(email: string): Promise<User | null> {
    let user: User | null;
    try {
      user = await this.usersRepository.findOneBy({ email });
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
    return user;
  }

  async update(
    id,
    user: Partial<User> & { password?: string },
  ): Promise<User | null> {
    if (user.password) {
      user.passwordHash = await bcrypt.hash(user.password, 10);
      delete user.password;
    }
    await this.usersRepository.update(id, user);
    return this.usersRepository.findOneBy({ id: user.id });
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
