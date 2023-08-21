import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { RolesService } from '../roles/roles.service';
import { ROLES } from '../roles/constants/roles.constant';
import { CreateUserDto } from '../auth/dto/create-user.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    private readonly rolesService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto, activation_code: string) {
    const user = await this.userRepository.create({
      ...dto,
      activation_code,
    });
    const role = await this.rolesService.getRoleByValue(ROLES.USER);
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getAllUsers(page, perPage) {
    const users = await this.userRepository.findAndCountAll({
      include: { all: true },
      limit: Number(perPage),
      attributes: {
        exclude: ['password'],
      },
      offset:
        Number(page) === 1
          ? 0
          : Number(page) * Number(perPage) - Number(perPage),
    });

    return {
      count: users.count,
      users: users.rows,
    };
  }

  getUserByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }
}
