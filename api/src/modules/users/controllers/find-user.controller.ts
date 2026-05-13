import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { FindUserService } from '../services/find-user.service';

@ApiTags('users')
@Controller('users')
export class FindUserController {
  constructor(private readonly findUserService: FindUserService) {}

  @Get()
  @ApiOperation({ summary: 'Buscar todos os usuários ou buscar por email' })
  @ApiQuery({ name: 'email', required: false, description: 'Email do usuário para busca específica' })
  async handle(@Query('email') email?: string) {
    return this.findUserService.execute(email);
  }
}