import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { createSqlitePrismaAdapter } from "./prisma-sqlite-adapter";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super({ adapter: createSqlitePrismaAdapter() });
    }

    async onModuleInit() {
        await this.$connect();
    }
}
