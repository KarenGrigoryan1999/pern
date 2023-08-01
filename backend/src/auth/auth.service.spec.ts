import { Test, TestingModule, JwtService } from '@nestjs/testing';
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { User } from "../user/entities/user.entity";
import { RoleModule } from 'src/role/role.module';

describe("Тестирование сервиса AuthService", () => {
  let service: AuthService;
  let tokenService;
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

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'User',
          useValue: User,
        },
        JwtModule.register({
          secret: "SECRET",
          signOptions: {
              expiresIn: "24h",
          },
      }),
      ],
      imports: [RoleModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it("Метод генерации токена. Ожидается что результат генерации токена методом будет соответствовать верному результату", async () => {
    const generatedToken = await service.generateToken(testEntity);
    const decodedPayload = tokenService.verify(generatedToken.token);
    
    expect(generatedToken).toBeInstanceOf(Object);
    expect(decodedPayload.email).toBe(testEntity.email);
    expect(decodedPayload.id).toBe(testEntity.id);
    expect(decodedPayload.roles).toEqual(testEntity.roles);
  });
});
