import {
    ActivityCalendar,
    getMonthLabels,
} from "../../../../components/activity-calendar/activity-calendar";
import { buildCalendarData } from "../../utils/build-calendar-data";
import type { SavedMeal } from "../../../../types/meal";

const LEVEL_COLORS: Record<0 | 1 | 2 | 3 | 4, string> = {
    0: "bg-gray-100",
    1: "bg-purple-100",
    2: "bg-purple-200",
    3: "bg-purple-400",
    4: "bg-purple-600",
};

type FiberCalendarProps = {
    meals: SavedMeal[];
};

export const FiberCalendar = ({ meals }: FiberCalendarProps) => {
    const weeks = buildCalendarData(meals);
    const monthLabels = getMonthLabels(weeks);

    return (
        <ActivityCalendar
            weeks={weeks}
            monthLabels={monthLabels}
            levelColors={LEVEL_COLORS}
            legend={{ min: "Moins", max: "Plus", note: "Objectif : 25g/jour" }}
        />
    );
};
