import "dotenv/config";
import "reflect-metadata";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { NestFactory } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    app.enableCors({
        origin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
        credentials: true,
    });
    app.use(cookieParser());
    app.useGlobalPipes(new ZodValidationPipe());
    await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
