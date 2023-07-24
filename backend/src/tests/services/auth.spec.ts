import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../../auth/auth.service";
import { UserService } from "../../user/user.service";
import { User } from "../../user/entities/user.entity";
import { RoleService } from "../../role/role.service";
import { Role } from "../../role/entities/role.entity";

describe("Тестирование сервиса NoteService", () => {
  let service: AuthService;
  let tokenService: JwtService;
  let testEntity;

  beforeEach(async () => {
    testEntity = {
        id: 1,
        email: 'tast@mail.ru',
        login: 'test',
        password: '1234',
        activation_code: '',
        roles: [{
          id: 1,
          value: 'ADMIN',
          description: 'ADMIN'
        }]
    };

    tokenService = new JwtService({
      secret: "SECRET",
      signOptions: {
          expiresIn: "24h",
      },
  });

    service = new AuthService(new UserService(User, new RoleService(Role)), tokenService);
  });
  it("Метод генерации токена", async () => {
    const generatedToken = await service.generateToken(testEntity);
    const decodedPayload = tokenService.verify(generatedToken.token);
    
    expect(generatedToken).toBeInstanceOf(Object);
    expect(decodedPayload.email).toBe(testEntity.email);
    expect(decodedPayload.id).toBe(testEntity.id);
    expect(decodedPayload.roles).toEqual(testEntity.roles);
  });
});
