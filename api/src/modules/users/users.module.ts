import { Module } from '@nestjs/common';
import { UserRepository } from './infra/repositories/user.repository.abstract';
import { InMemoryUserRepository } from './infra/repositories/in-memory/in-memory-user.repository';
import { CreateUserService } from './services/create-user.service';
import { CreateUserController } from './controllers/create-user.controller';

@Module({
  controllers: [
    CreateUserController,
  ],
  providers: [
    CreateUserService,
    {
      provide: UserRepository,
      useClass: InMemoryUserRepository, // QUANDO TIVER BANCO, É SÓ TROCAR ESSA LINHA PARA O PrismaUserRepository!
    },
  ],
})
export class UsersModule {}