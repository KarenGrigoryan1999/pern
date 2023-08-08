import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Dialect } from 'sequelize/types/sequelize';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './roles/entities/user-roles.entity';
import { Role } from './roles/entities/role.entity';
import { NotesModule } from './notes/notes.module';
import { Note } from './notes/entities/note.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: process.env.DATABASE_DIALECT as Dialect,
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      synchronize: true,
      models: [User, Role, Note, UserRoles],
    }),
    RolesModule,
    UsersModule,
    AuthModule,
    NotesModule,
  ],
})
export class AppModule {}
