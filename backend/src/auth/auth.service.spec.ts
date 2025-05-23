import { Test } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { ConfigService } from "@nestjs/config";
import { UserService } from "../user/user.service";
import { MailerService } from "../mailer/mailer.service";

describe("AuthService", () => {
    let service: AuthService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
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
                        sign: jest.fn(() => "signed-jwt-token"),
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

        service = module.get<AuthService>(AuthService);
    });

    it("Should be defined", () => {
        expect(service).toBeDefined();
    });
});
