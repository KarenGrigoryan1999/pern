import { Controller, Get, Query } from '@nestjs/common';

import { UsersService } from './users.service';
import { Auth } from '../auth/roles-auth.decorator';
import { ROLES } from '../roles/constants/roles.constant';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Auth(ROLES.ADMIN)
  @Get()
  getAll(@Query('page') page: string, @Query('perPage') perPage: string) {
    return this.usersService.getAllUsers(page, perPage);
  }
}
