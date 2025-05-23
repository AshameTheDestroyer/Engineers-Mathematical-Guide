import { Test } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { MailerService } from "./mailer.service";
import { MailerController } from "./mailer.controller";

describe("MailerController", () => {
    let controller: MailerController;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    isGlobal: true,
                }),
            ],
            controllers: [MailerController],
            providers: [MailerService],
        }).compile();

        controller = module.get<MailerController>(MailerController);
    });

    it("Should be defined", () => {
        expect(controller).toBeDefined();
    });
});
