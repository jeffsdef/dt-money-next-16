import { Controller, Delete, Param, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeleteUserService } from '../services/delete-user.service';

@ApiTags('users')
@Controller('users')
export class DeleteUserController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Excluir um usuário' })
  @ApiResponse({ status: 204, description: 'Usuário excluído com sucesso.' })
  async handle(@Param('id') id: string) {
    await this.deleteUserService.execute(id);
  }
}