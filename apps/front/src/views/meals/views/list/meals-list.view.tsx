import { useNavigate } from "@tanstack/react-router";
import { useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "@heroui/react/toast";
import { Button } from "@heroui/react/button";
import { Link } from "@tanstack/react-router";
import { useMealsQuery, useDeleteMealMutation } from "../../../../gql/generated";
import { groupMealsByDate } from "./utils/group-meals-by-date";
import { DayGroup } from "./components/day-group/day-group";

const PAGE_SIZE = 15;

export const MealsListView = () => {
    const queryClient = useQueryClient();
    const invalidate = () => queryClient.invalidateQueries({ queryKey: useMealsQuery.getKey() });

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: useMealsQuery.getKey(),
        queryFn: ({ pageParam }) =>
            useMealsQuery.fetcher({ input: { page: pageParam as number, perPage: PAGE_SIZE } })(),
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            const fetched = allPages.reduce((sum, p) => sum + p.meals.data.length, 0);
            return fetched < lastPage.meals.total ? allPages.length + 1 : undefined;
        },
    });

    const meals = data?.pages.flatMap((p) => p.meals.data) ?? [];
    const groups = groupMealsByDate(meals);

    const { mutate: deleteMealMutate } = useDeleteMealMutation({
        onSuccess: () => {
            invalidate();
            toast.success("Supprimé");
        },
        onError: () => toast.danger("Erreur"),
    });

    const navigate = useNavigate();
    const handleEdit = (id: string) => void navigate({ to: "/meals/$id", params: { id } });
    const handleDelete = (id: string) => deleteMealMutate({ input: { id } });

    return (
        <main className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-4 py-10">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Repas</h1>
                <Link to="/meals/new">
                    <Button>Nouveau repas</Button>
                </Link>
            </div>

            {groups.length === 0 ? (
                <p className="py-12 text-center text-sm text-muted">
                    Aucun repas sauvegardé.{" "}
                    <Link to="/meals/new" className="text-accent hover:underline">
                        Composez votre premier menu.
                    </Link>
                </p>
            ) : (
                <>
                    {groups.map((group) => (
                        <DayGroup
                            key={group.date}
                            group={group}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))}

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
        </main>
    );
};
