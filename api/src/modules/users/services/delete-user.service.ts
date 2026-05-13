import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../infra/repositories/user.repository.abstract';

@Injectable()
export class DeleteUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string) {
    const userExists = await this.userRepository.findById(id);
    if (!userExists) throw new NotFoundException('Usuário não encontrado.');

    await this.userRepository.delete(id);
  }
}