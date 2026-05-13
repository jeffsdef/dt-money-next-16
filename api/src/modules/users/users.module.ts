import { Module } from '@nestjs/common';
import { UserRepository } from './infra/repositories/user.repository.abstract';
import { InMemoryUserRepository } from './infra/in-memory/in-memory-user.repository';

import { CreateUserService } from './services/create-user.service';
import { FindUserService } from './services/find-user.service';
import { UpdateUserService } from './services/update-user.service';
import { DeleteUserService } from './services/delete-user.service';

import { CreateUserController } from './controllers/create-user.controller';
import { FindUserController } from './controllers/find-user.controller';
import { UpdateUserController } from './controllers/update-user.controller';
import { DeleteUserController } from './controllers/delete-user.controller';

@Module({
  controllers: [
    CreateUserController,
    FindUserController,
    UpdateUserController,
    DeleteUserController,
  ],
  providers: [
    CreateUserService,
    FindUserService,
    UpdateUserService,
    DeleteUserService,
    {
      provide: UserRepository,
      useClass: InMemoryUserRepository, 
    },
  ],
})
export class UsersModule {}