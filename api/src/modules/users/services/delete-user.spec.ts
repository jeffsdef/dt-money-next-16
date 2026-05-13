import { Test, TestingModule } from '@nestjs/testing';
import { DeleteUserService } from './delete-user.service';
import { UserRepository } from '../infra/repositories/user.repository.abstract';
import { InMemoryUserRepository } from '../infra/in-memory/in-memory-user.repository';
import { NotFoundException } from '@nestjs/common';

describe('DeleteUserService', () => {
  let service: DeleteUserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserService,
        {
          provide: UserRepository,
          useClass: InMemoryUserRepository,
        },
      ],
    }).compile();

    service = module.get<DeleteUserService>(DeleteUserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('deve excluir um usuário existente', async () => {
    const user = await repository.create({ name: 'Para Excluir', email: 'excluir@email.com', password: '123' });

    await service.execute(user.id);

    const checkUser = await repository.findById(user.id);
    expect(checkUser).toBeNull();
  });

  it('deve retornar erro ao tentar excluir um usuário que não existe', async () => {
    await expect(service.execute('id-falso')).rejects.toBeInstanceOf(NotFoundException);
  });
});