import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Role } from "./role.entity";
import { User } from "../../user/entities/user.entity";

interface RolesCreationAttrs {
    value: string;
    description: string
}

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles, RolesCreationAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER })
    roleId: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: string;
}
