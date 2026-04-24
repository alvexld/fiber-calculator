import type { SavedMeal } from "../../types/meal";
import type { Bristol } from "@fc/shared";
import { buildChartData } from "./utils/build-chart-data";
import { buildBristolChartData } from "../bristol/utils/build-bristol-chart-data";
import { DashboardUI } from "./dashboard.ui";

type DashboardViewProps = {
    meals: SavedMeal[];
    bristols: Bristol[];
};

export const DashboardView = ({ meals, bristols }: DashboardViewProps) => {
    const chartData = buildChartData(meals);
    const daysTracked = chartData.length;
    const averageDailyFiber =
        daysTracked === 0 ? 0 : chartData.reduce((sum, d) => sum + d.fibers, 0) / daysTracked;

    const bristolChartData = buildBristolChartData(bristols);
    const averageBristol =
        bristols.length === 0
            ? 0
            : Math.round((bristols.reduce((s, b) => s + b.value, 0) / bristols.length) * 10) / 10;

    return (
        <DashboardUI
            meals={meals}
            bristols={bristols}
            chartData={chartData}
            averageDailyFiber={averageDailyFiber}
            totalMeals={meals.length}
            daysTracked={daysTracked}
            bristolChartData={bristolChartData}
            averageBristol={averageBristol}
            totalBristols={bristols.length}
        />
    );
};
