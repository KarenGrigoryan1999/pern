import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";
import * as uuid from "uuid";

import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  
  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    return await this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        "Пользователь с таким email уже существует",
        HttpStatus.BAD_REQUEST
      );
    }
  
    const hashPassword = await bcrypt.hash(userDto.password, 1);
    const activationCode = uuid.v4();
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    }, activationCode);

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
    const user = await this.userService.getUserByEmail(userDto.email);
    if (user) {
      const passwordEquals = await bcrypt.compare(
        userDto.password,
        user?.password
      );
      if (passwordEquals) {
        return user;
      }
    }
    throw new UnauthorizedException({ message: "Не верный email или пароль" });
  }
}
