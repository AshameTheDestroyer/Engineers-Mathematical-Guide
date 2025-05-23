import { Test } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { MailerService } from "./mailer.service";

describe("MailerService", () => {
    let service: MailerService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                }),
            ],
            providers: [MailerService],
        }).compile();

        service = module.get<MailerService>(MailerService);
    });

    it("Should be defined", () => {
        expect(service).toBeDefined();
    });
});
