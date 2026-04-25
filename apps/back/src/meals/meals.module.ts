import { Module } from "@nestjs/common";
import { MealsResolver } from "./meals.resolver";
import { MealsService } from "./meals.service";

@Module({
    providers: [MealsResolver, MealsService],
})
export class MealsModule {}
