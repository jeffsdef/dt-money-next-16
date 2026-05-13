import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../infra/repositories/user.repository.abstract';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UpdateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string, data: UpdateUserDto) {
    const userExists = await this.userRepository.findById(id);
    if (!userExists) throw new NotFoundException('Usuário não encontrado.');

    const dataToUpdate = { ...data };

    if (data.password) {
      dataToUpdate.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await this.userRepository.update(id, dataToUpdate);
    
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
}