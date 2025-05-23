import { Test } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { ConfigService } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { UserService } from "../user/user.service";
import { MailerService } from "../mailer/mailer.service";

describe("AuthController", () => {
    let controller: AuthController;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                AuthService,
                {
                    provide: UserService,
                    useValue: {
                        createUser: jest.fn(),
                        findOneByEmail: jest.fn(),
                    },
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn(() => "mock-jwt-token"),
                    },
                },
                {
                    provide: MailerService,
                    useValue: {
                        sendMail: jest.fn(),
                    },
                },
                {
                    provide: ConfigService,
                    useValue: {
                        get: (key: string) =>
                            ({
                                JWT_SECRET: process.env.JWT_SECRET,
                                JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
                            })[key],
                    },
                },
            ],
        }).compile();

        controller = module.get<AuthController>(AuthController);
    });

    it("Should be defined", () => {
        expect(controller).toBeDefined();
    });
});
