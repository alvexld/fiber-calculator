import { Module } from "@nestjs/common";
import { BristolModule } from "../bristol/bristol.module";
import { MealsModule } from "../meals/meals.module";
import { DashboardResolver } from "./dashboard.resolver";
import { DashboardService } from "./dashboard.service";

@Module({
    imports: [MealsModule, BristolModule],
    providers: [DashboardResolver, DashboardService],
})
export class DashboardModule {}
