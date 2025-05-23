import { Test } from "@nestjs/testing";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("UserService", () => {
    let service: UserService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        save: jest.fn(),
                        remove: jest.fn(),
                        findOne: jest.fn(),
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

        service = module.get<UserService>(UserService);
    });

    it("Should be defined", () => {
        expect(service).toBeDefined();
    });
});
