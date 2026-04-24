import type { KnipConfig } from "knip";

export default {
    entry: ["src/main.ts"],
    project: ["src/**/*.ts", "prisma/**/*.ts"],
    ignoreDependencies: ["pg", "@types/pg"],
} satisfies KnipConfig;
