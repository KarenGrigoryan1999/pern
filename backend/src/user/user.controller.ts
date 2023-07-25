import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from '../auth/roles-auth.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth("ADMIN")
  @Get()
  getAll(@Query("page") page: string, @Query("perPage") perPage: string) {
      return this.userService.getAllUsers(page, perPage);
  }

}
