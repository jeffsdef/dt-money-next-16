import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserService } from './update-user.service';
import { UserRepository } from '../infra/repositories/user.repository.abstract';
import { InMemoryUserRepository } from '../infra/in-memory/in-memory-user.repository';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('UpdateUserService', () => {
  let service: UpdateUserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserService,
        {
          provide: UserRepository,
          useClass: InMemoryUserRepository,
        },
      ],
    }).compile();

    service = module.get<UpdateUserService>(UpdateUserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('deve alterar os dados de um usuário existente', async () => {
    const user = await repository.create({ name: 'Original', email: 'original@email.com', password: '123' });

    const result = await service.execute(user.id, { name: 'Alterado' });

    expect(result.name).toBe('Alterado');
    expect(result.email).toBe('original@email.com'); 
  });

  it('deve criptografar a nova senha se ela for alterada', async () => {
    const user = await repository.create({ name: 'Teste', email: 'teste@email.com', password: '123' });

    await service.execute(user.id, { password: 'nova-senha' });

    const updatedUserInDb = await repository.findById(user.id);
    const isPasswordHashed = await bcrypt.compare('nova-senha', updatedUserInDb!.password!);
    
    expect(isPasswordHashed).toBe(true);
  });

  it('deve retornar erro ao tentar alterar um usuário que não existe', async () => {
    await expect(service.execute('id-falso', { name: 'Teste' })).rejects.toBeInstanceOf(NotFoundException);
  });
});