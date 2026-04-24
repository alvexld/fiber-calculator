import { DayGroup } from "./components/day-group/day-group";
import type { DayGroup as DayGroupType } from "./utils/group-meals-by-date";

type HistoryUIProps = {
    groups: DayGroupType[];
    onDelete: (id: string) => void;
};

export const HistoryUI = ({ groups, onDelete }: HistoryUIProps) => (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-10">
        <h1 className="text-2xl font-semibold">Historique des repas</h1>

        {groups.length === 0 ? (
            <p className="py-12 text-center text-sm text-gray-500">
                Aucun repas sauvegardé. Composez un menu et sauvegardez-le.
            </p>
        ) : (
            groups.map((group) => <DayGroup key={group.date} group={group} onDelete={onDelete} />)
        )}
    </main>
);
