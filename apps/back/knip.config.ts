import type { KnipConfig } from "knip";

export default {
    entry: ["src/main.ts"],
    project: ["src/**/*.ts", "prisma/**/*.ts"],
    ignore: ["src/graphql.ts"],
    ignoreDependencies: ["pg", "@types/pg", "@types/bcryptjs", "@as-integrations/express5"],
} satisfies KnipConfig;
