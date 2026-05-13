import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../infra/repositories/user.repository.abstract';

@Injectable()
export class FindUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(email?: string) {
    if (email) {
      const user = await this.userRepository.findByEmail(email);
      if (!user) throw new NotFoundException('Usuário não encontrado.');
      
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    const users = await this.userRepository.findAll();
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }
}