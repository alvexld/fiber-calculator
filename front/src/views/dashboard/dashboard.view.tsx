import type { SavedMeal } from "../../types/meal";
import { buildChartData } from "./utils/build-chart-data";
import { DashboardUI } from "./dashboard.ui";

type DashboardViewProps = {
    meals: SavedMeal[];
};

export const DashboardView = ({ meals }: DashboardViewProps) => {
    const chartData = buildChartData(meals);
    const daysTracked = chartData.length;
    const averageDailyFiber =
        daysTracked === 0 ? 0 : chartData.reduce((sum, d) => sum + d.fibers, 0) / daysTracked;

    return (
        <DashboardUI
            meals={meals}
            chartData={chartData}
            averageDailyFiber={averageDailyFiber}
            totalMeals={meals.length}
            daysTracked={daysTracked}
        />
    );
};
