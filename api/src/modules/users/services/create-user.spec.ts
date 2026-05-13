import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from './create-user.service';
import { UserRepository } from '../infra/repositories/user.repository.abstract';
import { InMemoryUserRepository } from '../infra/repositories/in-memory/in-memory-user.repository';
import * as bcrypt from 'bcrypt';

describe('CreateUserService', () => {
  let service: CreateUserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: UserRepository,
          useClass: InMemoryUserRepository, // Usamos o em memória para testes
        },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('deve criar um usuário com senha criptografada', async () => {
    const userDto = { name: 'Teste', email: 'teste@email.com', password: '123' };
    
    const result = await service.execute(userDto);

    expect(result).toHaveProperty('id');
    expect(result.email).toBe('teste@email.com');
    expect(result).not.toHaveProperty('password'); // Não deve retornar a senha
    
    const userInDb = await repository.findByEmail('teste@email.com');
    const isPasswordHashed = await bcrypt.compare('123', userInDb!.password!);
    expect(isPasswordHashed).toBe(true); // Garante que foi criptografado
  });
});