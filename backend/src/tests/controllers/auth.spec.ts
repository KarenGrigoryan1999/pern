import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../auth/auth.service";
import { UserService } from "../user/user.service";
import { User } from "../user/entities/user.entity";
import { RoleService } from "../role/role.service";
import { Role } from "../role/entities/role.entity";

describe("Тестирование контроллера NoteController", () => {
  let service: AuthService;
  let testEntity;

  beforeEach(async () => {
    testEntity = {
        email: 'tast@mail.ru',
        login: 'test',
        password: '1234',
        activation_code: ''
    };

    service = new AuthService(new UserService(User, new RoleService(Role)), new JwtService({
        secret: "SECRET",
        signOptions: {
            expiresIn: "24h",
        },
    }));
  });
  it("Метод генерации токена", async () => {
    expect(await service.generateToken(testEntity)).toBeInstanceOf(Object);
    expect((await service.generateToken(testEntity)).token).not.toBeFalsy();
  });
});
