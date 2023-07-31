import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './entities/role.entity';
import { User } from '../user/entities/user.entity';
import { UserRoles } from './entities/user-roles.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  exports: [RoleService],
})
export class RoleModule {}
