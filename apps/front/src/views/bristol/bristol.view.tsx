import { useState } from "react";
import { useBristolsQuery, type CreateBristolInput } from "../../gql/generated";
import { useBristol } from "../../hooks/use-bristol";
import { BristolUI } from "./bristol.ui";

const nowDate = () => new Date().toISOString().slice(0, 10);
const nowTime = () => new Date().toTimeString().slice(0, 5);

export const BristolView = () => {
    const { data } = useBristolsQuery();
    const bristols = data?.bristols ?? [];
    const { createBristol, deleteBristol } = useBristol();
    const [date, setDate] = useState(nowDate);
    const [time, setTime] = useState(nowTime);
    const [value, setValue] = useState<number | null>(null);

    const handleSubmit = () => {
        if (!value) return;
        const input: CreateBristolInput = { date, time, value };
        createBristol(input, { onSuccess: () => setValue(null) });
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
            onDelete={deleteBristol}
        />
    );
};
