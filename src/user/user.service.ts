import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Auth } from 'googleapis';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(email: string, token: Auth.Credentials): Promise<User> {
    const user = this.usersRepository.create({ email, token });
    await this.usersRepository.insert(user);
    return user;
  }

  getById(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  getByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async updateUser(user: User) {
    return await this.usersRepository.save(user);
  }
}
