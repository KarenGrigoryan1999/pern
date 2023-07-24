import { Module, forwardRef } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { User } from '../user/entities/user.entity';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
        secret: process.env.PRIVATE_KEY || "SECRET",
        signOptions: {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || "24h",
        },
    }),
    HttpModule,
    SequelizeModule.forFeature([User]),
    RoleModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule]
})
export class AuthModule {}

