import { Button } from "@heroui/react/button";
import { Link } from "@tanstack/react-router";
import { DayGroup } from "./components/day-group/day-group";
import type { DayGroup as DayGroupType } from "./utils/group-meals-by-date";

type MealsListUIProps = {
    groups: DayGroupType[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
};

export const MealsListUI = ({ groups, onDelete, onEdit }: MealsListUIProps) => (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-10">
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Repas</h1>
            <Link to="/meals/new">
                <Button>Nouveau repas</Button>
            </Link>
        </div>

        {groups.length === 0 ? (
            <p className="py-12 text-center text-sm text-gray-500">
                Aucun repas sauvegardé.{" "}
                <Link to="/meals/new" className="text-blue-600 hover:underline">
                    Composez votre premier menu.
                </Link>
            </p>
        ) : (
            groups.map((group) => (
                <DayGroup key={group.date} group={group} onDelete={onDelete} onEdit={onEdit} />
            ))
        )}
    </main>
);
