import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

export function createSqlitePrismaAdapter() {
    const url = process.env.DATABASE_URL;
    if (url == null || url === "") {
        throw new Error("DATABASE_URL is not set");
    }
    return new PrismaBetterSqlite3({ url });
}
