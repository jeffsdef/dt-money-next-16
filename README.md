# Módulo de Usuários - DT Money

## 1. Requisitos Funcionais

### Inserir, Alterar, Buscar e Excluir
As quatro operações foram implementadas no repositório em memória e expostas através dos seus respetivos *services*.
```typescript
// api/src/modules/users/infra/in-memory/in-memory-user.repository.ts
async create(data: CreateUserDto): Promise<User> { ... }
async update(id: string, data: UpdateUserDto): Promise<User> { ... }
async findAll(): Promise<User[]> { ... }
async findByEmail(email: string): Promise<User | null> { ... }
async delete(id: string): Promise<void> { ... }
```

### Criptografia de Senha
Utilizamos a biblioteca `bcrypt` para criptografar a senha antes da persistência no banco de dados (neste caso, em memória).
```typescript
// api/src/modules/users/services/create-user.service.ts
const hashedPassword = await bcrypt.hash(data.password, 10);

const user = await this.userRepository.create({
  ...data,
  password: hashedPassword,
});
```

---

## 2. Qualidade do Código

### Services Separados (Princípio da Responsabilidade Única)
Cada operação possui a sua própria classe *Service*, garantindo que cada ficheiro tenha apenas um motivo para ser alterado (SRP). Exemplo do serviço de criação:
```typescript
// api/src/modules/users/services/create-user.service.ts
@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(data: CreateUserDto) { ... }
}
```

### Testes Unitários
Foram criados ficheiros `.spec.ts` para cada um dos serviços.
```typescript
// api/src/modules/users/services/create-user.spec.ts
it('deve criar um usuário com senha criptografada', async () => {
  const userDto = { name: 'Teste', email: 'teste@email.com', password: '123' };
  const result = await service.execute(userDto);
  
  expect(result).toHaveProperty('id');
  expect(result.email).toBe('teste@email.com');
  expect(result).not.toHaveProperty('password'); 
});
```

### Documentação (SWAGGER)
As rotas estão isoladas em *controllers* com responsabilidade única e devidamente decoradas para aparecerem no Swagger.
```typescript
// api/src/modules/users/controllers/create-user.controller.ts
@ApiTags('users')
@Controller('users')
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  async handle(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.execute(createUserDto);
  }
}
```

### Validação de Dados (Class Validator)
Uso de decoradores do `class-validator` nos DTOs para garantir a integridade dos dados de entrada.
```typescript
// api/src/modules/users/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}
```

### Repository Pattern
O acesso aos dados foi isolado utilizando uma classe abstrata, criando um contrato universal independente do banco de dados utilizado.
```typescript
// api/src/modules/users/infra/repositories/user.repository.abstract.ts
export abstract class UserRepository {
  abstract create(data: CreateUserDto): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract update(id: string, data: UpdateUserDto): Promise<User>;
  abstract delete(id: string): Promise<void>;
}
```

### Inversão de Dependência
Os *services* dependem apenas da abstração (`UserRepository`). O módulo encarrega-se de injetar a classe concreta em tempo de execução.
```typescript
// api/src/modules/users/users.module.ts
@Module({
  // ... controllers e services
  providers: [
    CreateUserService,
    {
      provide: UserRepository,
      useClass: InMemoryUserRepository, // Injeção da implementação em memória
    },
  ],
})
export class UsersModule {}
```

---

> **Nota:** A integração direta com um banco de dados persistente não foi realizada. O módulo utiliza atualmente um repositório em memória para armazenamento temporário dos dados durante a execução. A arquitetura implementada (Repository Pattern e DIP) permite que a futura troca para um banco real (como PostgreSQL com Prisma) exija a alteração de apenas uma linha no ficheiro `users.module.ts`.
