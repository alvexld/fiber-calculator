import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { seedIngredients } from "./seeds/ingredients";
import { seedMeals } from "./seeds/meals";
import { seedBristol } from "./seeds/bristol";

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
    await seedIngredients(prisma);
    await seedMeals(prisma);
    await seedBristol(prisma);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
