import { Query, Resolver } from "@nestjs/graphql";
import { DashboardService } from "./dashboard.service";

@Resolver()
export class DashboardResolver {
    constructor(private readonly dashboardService: DashboardService) {}

    @Query("dashboard")
    getDashboard() {
        return this.dashboardService.getDashboard();
    }
}
