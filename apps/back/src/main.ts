import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({ origin: process.env.CORS_ORIGIN ?? "http://localhost:5173" });
    app.useGlobalPipes(new ZodValidationPipe());
    await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
