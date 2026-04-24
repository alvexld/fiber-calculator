import { Module } from "@nestjs/common";
import { IngredientsModule } from "./ingredients/ingredients.module";
import { MealsModule } from "./meals/meals.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({ imports: [PrismaModule, MealsModule, IngredientsModule] })
export class AppModule {}
