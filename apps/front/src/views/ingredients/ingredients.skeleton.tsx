import { Skeleton } from "@heroui/react/skeleton";
import { Card } from "@heroui/react/card";

export const IngredientsSkeleton = () => (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-10">
        <div>
            <Skeleton className="h-7 w-48 rounded" />
            <Skeleton className="mt-1 h-4 w-80 rounded" />
        </div>

        <Card>
            <Card.Header>
                <Skeleton className="h-5 w-40 rounded" />
            </Card.Header>
            <Card.Content>
                <div className="grid grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-10 rounded" />
                    ))}
                    <div className="col-span-2 flex justify-end">
                        <Skeleton className="h-9 w-40 rounded" />
                    </div>
                </div>
            </Card.Content>
        </Card>

        <section>
            <div className="mb-3 flex items-center justify-between gap-4">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-9 w-56 rounded" />
            </div>
            <div className="flex flex-col gap-px">
                {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="h-12 rounded" />
                ))}
            </div>
        </section>
    </main>
);
