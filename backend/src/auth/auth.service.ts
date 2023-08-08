import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import uuid from 'uuid';

import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { ValidationExecption } from 'src/exceptions/validation.exception';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return await this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new ValidationExecption(
        'Пользователь с таким email уже существует',
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 1);
    const activationCode = uuid.v4();
    const user = await this.usersService.createUser(
      {
        ...userDto,
        password: hashPassword,
      },
      activationCode,
    );

    return this.generateToken(user);
  }

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return {
      roles: user.roles,
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    if (user) {
      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user?.password,
      );
      if (passwordEquals) {
        return user;
      }
    }
    throw new UnauthorizedException({ message: 'Не верный email или пароль' });
  }
}
