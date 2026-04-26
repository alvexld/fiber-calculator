import {
    ActivityCalendar,
    getMonthLabels,
} from "../../../../components/activity-calendar/activity-calendar";
import { buildBristolCalendarData } from "../../utils/build-bristol-calendar-data";
import type { Bristol } from "../../../../gql/generated";

const LEVEL_COLORS: Record<0 | 1 | 2 | 3 | 4, string> = {
    0: "bg-gray-100",
    1: "bg-red-400",
    2: "bg-amber-400",
    3: "bg-lime-400",
    4: "bg-green-500",
};

type BristolCalendarProps = {
    bristols: Bristol[];
};

export const BristolCalendar = ({ bristols }: BristolCalendarProps) => {
    const weeks = buildBristolCalendarData(bristols);
    const monthLabels = getMonthLabels(weeks);

    return (
        <ActivityCalendar
            weeks={weeks}
            monthLabels={monthLabels}
            levelColors={LEVEL_COLORS}
            legend={{ min: "Loin de l'idéal", max: "Idéal (3–4)" }}
        />
    );
};
