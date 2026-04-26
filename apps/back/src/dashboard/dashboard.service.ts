import { Injectable } from "@nestjs/common";
import { BristolService } from "../bristol/bristol.service";
import { MealsService } from "../meals/meals.service";

@Injectable()
export class DashboardService {
    constructor(
        private readonly mealsService: MealsService,
        private readonly bristolService: BristolService,
    ) {}

    async getDashboard() {
        const [meals, bristols] = await Promise.all([
            this.mealsService.findAll(),
            this.bristolService.findAll(),
        ]);
        return { meals: meals.records, bristols: bristols.records };
    }
}
