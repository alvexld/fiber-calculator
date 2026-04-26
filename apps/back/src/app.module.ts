import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerModule } from "@nestjs/throttler";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { AuthModule } from "./auth/auth.module";
import { AppThrottlerGuard } from "./auth/throttler.guard";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { BristolModule } from "./bristol/bristol.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { IngredientsModule } from "./ingredients/ingredients.module";
import { MealsModule } from "./meals/meals.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ThrottlerModule.forRoot([{ ttl: 60_000, limit: 100 }]),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            typePaths: ["./**/*.graphql"],
            context: ({ req, res }: { req: unknown; res: unknown }) => ({ req, res }),
            introspection: true,
        }),
        PrismaModule,
        AuthModule,
        MealsModule,
        IngredientsModule,
        BristolModule,
        DashboardModule,
    ],
    providers: [
        { provide: APP_GUARD, useClass: AppThrottlerGuard },
        { provide: APP_GUARD, useClass: JwtAuthGuard },
    ],
})
export class AppModule {}
