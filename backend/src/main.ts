import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { SetUpSwagger } from "./utils/Swagger";

(async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true,
        rawBody: true,
        bodyParser: true,
    });

    app.enableCors({
        origin: "*",
        methods: "*",
        credentials: true,
        allowedHeaders: "*",
    });

    SetUpSwagger(app);
    await app.listen(Number(process.env.PORT));
})();
