import { useState } from "react";
import type { CreateBristol } from "@fc/shared";
import { useBristol } from "../../hooks/use-bristol";
import { BristolUI } from "./bristol.ui";

const nowDate = () => new Date().toISOString().slice(0, 10);
const nowTime = () => new Date().toTimeString().slice(0, 5);

export const BristolView = () => {
    const { bristols, createBristol, deleteBristol } = useBristol();
    const [date, setDate] = useState(nowDate);
    const [time, setTime] = useState(nowTime);
    const [value, setValue] = useState<number | null>(null);

    const handleSubmit = () => {
        if (!value) return;
        const entry: CreateBristol = { date, time, value };
        createBristol(entry, {
            onSuccess: () => setValue(null),
        });
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
