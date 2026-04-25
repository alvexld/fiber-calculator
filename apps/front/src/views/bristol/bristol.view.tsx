import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "@heroui/react/toast";
import { Trash2 } from "lucide-react";
import { Button } from "@heroui/react/button";
import { Card } from "@heroui/react/card";
import { Tooltip } from "@heroui/react/tooltip";
import { ListBox } from "@heroui/react/list-box";
import { Header } from "@heroui/react/header";
import { Separator } from "@heroui/react/separator";
import { Label } from "@heroui/react";
import {
    useBristolsQuery,
    useCreateBristolMutation,
    useDeleteBristolMutation,
} from "../../gql/generated";
import type { Bristol } from "@fc/shared";
import { BristolForm } from "./components/bristol-form/bristol-form";

const PAGE_SIZE = 30;

const BRISTOL_LABELS: Record<number, string> = {
    1: "Boules dures",
    2: "Boudin bosselé",
    3: "Boudin fissuré",
    4: "Boudin lisse",
    5: "Fragments mous",
    6: "Boue",
    7: "Liquide",
};

const VALUE_COLORS: Record<number, string> = {
    1: "bg-amber-700 text-white",
    2: "bg-amber-500 text-white",
    3: "bg-green-500 text-white",
    4: "bg-green-600 text-white",
    5: "bg-yellow-500 text-white",
    6: "bg-orange-500 text-white",
    7: "bg-red-500 text-white",
};

const formatTime = (time: string) => time.slice(0, 5);

const formatDateHeader = (dateStr: string): string => {
    const d = new Date(dateStr + "T00:00:00");
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (d.toDateString() === today.toDateString()) return "Aujourd'hui";
    if (d.toDateString() === yesterday.toDateString()) return "Hier";

    return d.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });
};

const groupByDate = (items: Bristol[]): [string, Bristol[]][] => {
    const groups: Record<string, Bristol[]> = {};
    for (const item of items) {
        (groups[item.date] ??= []).push(item);
    }
    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
};

export const BristolView = () => {
    const queryClient = useQueryClient();
    const invalidate = () => queryClient.invalidateQueries({ queryKey: useBristolsQuery.getKey() });

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: useBristolsQuery.getKey(),
        queryFn: ({ pageParam }) =>
            useBristolsQuery.fetcher({
                input: { page: pageParam as number, perPage: PAGE_SIZE },
            })(),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const fetched = allPages.reduce((sum, p) => sum + p.bristols.data.length, 0);
            return fetched < lastPage.bristols.total ? allPages.length + 1 : undefined;
        },
    });

    const bristols = data?.pages.flatMap((p) => p.bristols.data) ?? [];
    const total = data?.pages[0]?.bristols.total ?? 0;
    const grouped = groupByDate(bristols);

    const { mutate: createBristolMutate } = useCreateBristolMutation({
        onSuccess: () => {
            invalidate();
            toast.success("Bristol enregistré");
        },
        onError: () => toast.danger("Erreur"),
    });

    const { mutate: deleteBristolMutate } = useDeleteBristolMutation({
        onSuccess: () => {
            invalidate();
            toast.success("Supprimé");
        },
        onError: () => toast.danger("Erreur"),
    });

    return (
        <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10 lg:flex-row lg:items-start lg:gap-8">
            <BristolForm onSubmit={(values) => createBristolMutate({ input: values })} />

            <div className="flex flex-1 flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-foreground">Historique</h2>
                    <span className="text-xs text-muted">
                        {total} entrée{total !== 1 ? "s" : ""}
                    </span>
                </div>

                {bristols.length === 0 ? (
                    <Card>
                        <Card.Content>
                            <p className="py-6 text-center text-sm text-muted">
                                Aucune entrée. Commencez par enregistrer votre première selle.
                            </p>
                        </Card.Content>
                    </Card>
                ) : (
                    <>
                        <Card>
                            <Card.Content className="p-0">
                                <ListBox
                                    aria-label="Historique des entrées Bristol"
                                    selectionMode="none"
                                    className="max-h-[600px] overflow-y-auto"
                                >
                                    {grouped.map(([dateKey, entries], groupIndex) => (
                                        <>
                                            {groupIndex > 0 && <Separator key={`sep-${dateKey}`} />}
                                            <ListBox.Section key={dateKey}>
                                                <Header>{formatDateHeader(dateKey)}</Header>
                                                {entries
                                                    .slice()
                                                    .sort((a, b) => b.time.localeCompare(a.time))
                                                    .map((b) => (
                                                        <ListBox.Item
                                                            key={b.id}
                                                            id={b.id}
                                                            textValue={BRISTOL_LABELS[b.value]}
                                                        >
                                                            <span
                                                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${VALUE_COLORS[b.value]}`}
                                                            >
                                                                {b.value}
                                                            </span>
                                                            <Label>{BRISTOL_LABELS[b.value]}</Label>
                                                            <span className="ml-auto text-xs tabular-nums text-muted">
                                                                {formatTime(b.time)}
                                                            </span>
                                                            <Tooltip>
                                                                <Tooltip.Trigger>
                                                                    <Button
                                                                        isIconOnly
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        aria-label="Supprimer"
                                                                        onPress={() =>
                                                                            deleteBristolMutate({
                                                                                input: { id: b.id },
                                                                            })
                                                                        }
                                                                        className="opacity-0 transition-opacity group-hover:opacity-100"
                                                                    >
                                                                        <Trash2 className="h-4 w-4 text-muted" />
                                                                    </Button>
                                                                </Tooltip.Trigger>
                                                                <Tooltip.Content>
                                                                    Supprimer
                                                                </Tooltip.Content>
                                                            </Tooltip>
                                                        </ListBox.Item>
                                                    ))}
                                            </ListBox.Section>
                                        </>
                                    ))}
                                </ListBox>
                            </Card.Content>
                        </Card>

                        {hasNextPage && (
                            <div className="flex justify-center">
                                <Button
                                    variant="secondary"
                                    isDisabled={isFetchingNextPage}
                                    onPress={() => void fetchNextPage()}
                                >
                                    {isFetchingNextPage ? "Chargement…" : "Afficher plus"}
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </main>
    );
};
