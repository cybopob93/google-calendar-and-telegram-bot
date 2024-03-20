import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(chatId: number, name: string): Promise<User> {
    const user = this.usersRepository.create({
      chatId,
      name,
    });
    await this.usersRepository.insert(user);
    return user;
  }

  getByChatId(chatId: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ chatId });
  }

  getByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async removeByChatId(chatId: number): Promise<void> {
    await this.usersRepository.delete(chatId);
  }

  async updateUser(user: User) {
    return await this.usersRepository.save(user);
  }
}
