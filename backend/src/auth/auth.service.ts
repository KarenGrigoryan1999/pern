import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import uuid from 'uuid';

import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { ConfigService } from '../config/config.service';
import { ValidationExecption } from '../exceptions/validation.exception';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    if (candidate != null) {
      throw new ValidationExecption(
        'Пользователь с таким email уже существует',
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, this.configService.getHashSalt());
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
    const payload = {
      email: user.email,
      id: user.id,
      roles: user.roles
    };
    return {
      roles: user.roles,
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: LoginUserDto) {
    const user = await this.usersService.getUserByEmail(userDto.email);
    if (user !== null) {
      const arePasswordsEquals = await bcrypt.compare(
        userDto.password,
        user.password,
      );
      if (arePasswordsEquals) {
        return user;
      }
    }
    throw new UnauthorizedException({ message: 'Не верный email или пароль' });
  }
}
