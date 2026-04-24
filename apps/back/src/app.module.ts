import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { IngredientsModule } from "./ingredients/ingredients.module";
import { MealsModule } from "./meals/meals.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),
        PrismaModule,
        AuthModule,
        MealsModule,
        IngredientsModule,
    ],
    providers: [
        // ThrottlerGuard must come first so rate-limiting is applied before JWT auth
        { provide: APP_GUARD, useClass: ThrottlerGuard },
        { provide: APP_GUARD, useClass: JwtAuthGuard },
    ],
})
export class AppModule {}
