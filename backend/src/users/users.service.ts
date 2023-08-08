import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto, activation_code: string) {
    const user = await this.userRepository.create({
      ...dto,
      activation_code,
    });
    const role = await this.rolesService.getRoleByValue('STUDENT');
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

  async getUserByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
  }
}
