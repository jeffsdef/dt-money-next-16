import { Test, TestingModule } from '@nestjs/testing';
import { FindUserService } from './find-user.service';
import { UserRepository } from '../infra/repositories/user.repository.abstract';
import { InMemoryUserRepository } from '../infra/in-memory/in-memory-user.repository';
import { NotFoundException } from '@nestjs/common';

describe('FindUserService', () => {
  let service: FindUserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindUserService,
        {
          provide: UserRepository,
          useClass: InMemoryUserRepository,
        },
      ],
    }).compile();

    service = module.get<FindUserService>(FindUserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('deve retornar todos os usuários', async () => {
    await repository.create({ name: 'User 1', email: 'user1@email.com', password: '123' });
    await repository.create({ name: 'User 2', email: 'user2@email.com', password: '123' });

    const result = await service.execute();

    expect(result).toHaveLength(2);
    expect(result[0]).not.toHaveProperty('password'); 
  });

  it('deve buscar um usuário pelo email', async () => {
    await repository.create({ name: 'User Teste', email: 'teste@email.com', password: '123' });

    const result = await service.execute('teste@email.com');

    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    if (!Array.isArray(result)) {
        expect(result.email).toBe('teste@email.com');
        expect(result).not.toHaveProperty('password');
    }
  });

  it('deve retornar erro se o email não existir', async () => {
    await expect(service.execute('naoexiste@email.com')).rejects.toBeInstanceOf(NotFoundException);
  });
});