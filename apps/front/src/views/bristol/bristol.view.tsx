import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@heroui/react/toast";
import {
    useBristolsQuery,
    useCreateBristolMutation,
    useDeleteBristolMutation,
    type CreateBristolInput,
} from "../../gql/generated";
import { BristolUI } from "./bristol.ui";

const nowDate = () => new Date().toISOString().slice(0, 10);
const nowTime = () => new Date().toTimeString().slice(0, 5);

export const BristolView = () => {
    const queryClient = useQueryClient();
    const invalidate = () => queryClient.invalidateQueries({ queryKey: useBristolsQuery.getKey() });

    const { data } = useBristolsQuery();
    const bristols = data?.bristols ?? [];

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

    const [date, setDate] = useState(nowDate);
    const [time, setTime] = useState(nowTime);
    const [value, setValue] = useState<number | null>(null);

    const handleSubmit = () => {
        if (!value) return;
        const input: CreateBristolInput = { date, time, value };
        createBristolMutate({ input }, { onSuccess: () => setValue(null) });
    };

    return (
        <BristolUI
            bristols={bristols}
            date={date}
            time={time}
            value={value}
            onDateChange={setDate}
            onTimeChange={setTime}
            onValueChange={setValue}
            onSubmit={handleSubmit}
            onDelete={(id) => deleteBristolMutate({ input: { id } })}
        />
    );
};
