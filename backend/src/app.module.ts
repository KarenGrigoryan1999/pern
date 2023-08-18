import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './roles/entities/user-roles.entity';
import { Role } from './roles/entities/role.entity';
import { NotesModule } from './notes/notes.module';
import { Note } from './notes/entities/note.entity';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        dialect: configService.getDatabaseDialect(),
        host: configService.getDatabaseHost(),
        port: configService.getDatabasePort(),
        username: configService.getDatabaseUsername(),
        password: configService.getDatabasePassword(),
        database: configService.getDatabaseName(),
        autoLoadModels: true,
        synchronize: true,
        models: [User, Role, Note, UserRoles],
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    RolesModule,
    UsersModule,
    AuthModule,
    NotesModule,
  ],
})
export class AppModule {}
