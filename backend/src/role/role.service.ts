import {HttpException, HttpStatus, Injectable, Post, UseGuards} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

import { Role } from "./entities/role.entity";
import { CreateRoleDto } from "./dto/create-role.dto";

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(dto: CreateRoleDto) {
    const candidate = await this.roleRepository.findOne({ where: { value: dto.value } });
    if(!candidate) {
      return await this.roleRepository.create(dto);
    }
    throw new HttpException("Такая роль уже существует", HttpStatus.CONFLICT);
  }
  
  async getRoleByValue(value: string) {
    const role = await this.roleRepository.findOne({ where: { value } });
    if (role) {
      return role;
    }
    throw new HttpException("Не найдено такой роли", HttpStatus.NOT_FOUND);
  }
}
