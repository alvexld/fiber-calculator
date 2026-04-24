import type { PrismaClient } from "@prisma/client";

const isoDate = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() - offsetDays);
    return d.toISOString().split("T")[0]!;
};

type BristolEntry = { id: string; date: string; time: string; value: number };

// Realistic 4-week history: mostly ideal (3-4), with natural variation.
const BRISTOL_ENTRIES: BristolEntry[] = [
    { id: "seed-b-0a", date: isoDate(0), time: "08:15", value: 4 },
    { id: "seed-b-1a", date: isoDate(1), time: "07:45", value: 3 },
    { id: "seed-b-1b", date: isoDate(1), time: "19:30", value: 4 },
    { id: "seed-b-2a", date: isoDate(2), time: "08:00", value: 4 },
    { id: "seed-b-3a", date: isoDate(3), time: "09:00", value: 3 },
    { id: "seed-b-3b", date: isoDate(3), time: "20:00", value: 3 },
    // day 4: no entry (rest day)
    { id: "seed-b-5a", date: isoDate(5), time: "08:30", value: 5 },
    { id: "seed-b-6a", date: isoDate(6), time: "07:30", value: 3 },
    { id: "seed-b-6b", date: isoDate(6), time: "18:45", value: 4 },
    { id: "seed-b-7a", date: isoDate(7), time: "08:00", value: 2 },
    { id: "seed-b-8a", date: isoDate(8), time: "08:15", value: 3 },
    { id: "seed-b-8b", date: isoDate(8), time: "20:30", value: 3 },
    { id: "seed-b-9a", date: isoDate(9), time: "09:15", value: 4 },
    // day 10: no entry
    { id: "seed-b-11a", date: isoDate(11), time: "08:00", value: 5 },
    { id: "seed-b-11b", date: isoDate(11), time: "19:00", value: 4 },
    { id: "seed-b-12a", date: isoDate(12), time: "07:45", value: 4 },
    { id: "seed-b-13a", date: isoDate(13), time: "08:30", value: 3 },
    { id: "seed-b-14a", date: isoDate(14), time: "09:00", value: 6 },
    { id: "seed-b-15a", date: isoDate(15), time: "07:30", value: 3 },
    { id: "seed-b-15b", date: isoDate(15), time: "19:15", value: 4 },
    { id: "seed-b-16a", date: isoDate(16), time: "08:00", value: 4 },
    // day 17: no entry
    { id: "seed-b-18a", date: isoDate(18), time: "08:45", value: 3 },
    { id: "seed-b-19a", date: isoDate(19), time: "07:30", value: 2 },
    { id: "seed-b-19b", date: isoDate(19), time: "20:00", value: 3 },
    { id: "seed-b-20a", date: isoDate(20), time: "08:00", value: 4 },
    { id: "seed-b-21a", date: isoDate(21), time: "09:30", value: 1 },
    { id: "seed-b-22a", date: isoDate(22), time: "07:45", value: 3 },
    { id: "seed-b-22b", date: isoDate(22), time: "19:30", value: 4 },
    { id: "seed-b-23a", date: isoDate(23), time: "08:15", value: 4 },
    // day 24: no entry
    { id: "seed-b-25a", date: isoDate(25), time: "08:00", value: 3 },
    { id: "seed-b-26a", date: isoDate(26), time: "07:30", value: 4 },
    { id: "seed-b-26b", date: isoDate(26), time: "18:30", value: 5 },
    { id: "seed-b-27a", date: isoDate(27), time: "09:00", value: 3 },
];

export const seedBristol = async (prisma: PrismaClient) => {
    for (const entry of BRISTOL_ENTRIES) {
        await prisma.bristol.upsert({
            where: { id: entry.id },
            update: { date: entry.date, time: entry.time, value: entry.value },
            create: entry,
        });
    }
    console.log(`✓ ${BRISTOL_ENTRIES.length} Bristol seedés`);
};
