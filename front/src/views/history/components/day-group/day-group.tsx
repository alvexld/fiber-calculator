import { MealCard } from "../meal-card/meal-card";
import type { DayGroup as DayGroupType } from "../../utils/group-meals-by-date";
import type { SavedMeal } from "../../../../types/meal";

type DayGroupProps = {
    group: DayGroupType;
    onDelete: (id: string) => void;
};

const formatDate = (dateStr: string): string =>
    new Date(`${dateStr}T12:00:00`).toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

export const DayGroup = ({ group, onDelete }: DayGroupProps) => (
    <section className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between border-b pb-2">
            <h2 className="text-base font-semibold capitalize">{formatDate(group.date)}</h2>
            <span className="tabular-nums text-sm text-gray-500">
                {group.dailyFiberGrams.toFixed(1)}g de fibres au total
            </span>
        </div>
        {group.meals.map((meal: SavedMeal) => (
            <MealCard key={meal.id} meal={meal} onDelete={onDelete} />
        ))}
    </section>
);
