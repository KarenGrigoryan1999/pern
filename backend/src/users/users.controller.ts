import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Auth } from '../auth/roles-auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Auth('ADMIN')
  @Get()
  getAll(@Query('page') page: string, @Query('perPage') perPage: string) {
    return this.usersService.getAllUsers(page, perPage);
  }
}
