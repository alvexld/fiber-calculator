import { Injectable } from "@nestjs/common";
import type { CreateBristolInput } from "../graphql";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BristolService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(page?: number, perPage?: number): Promise<{ records: unknown[]; total: number }> {
        const paginated = page !== undefined && perPage !== undefined;
        const [records, total] = await Promise.all([
            this.prisma.bristol.findMany({
                orderBy: [{ date: "desc" }, { time: "desc" }],
                ...(paginated && { skip: (page - 1) * perPage, take: perPage }),
            }),
            this.prisma.bristol.count(),
        ]);
        return { records, total };
    }

    create(data: CreateBristolInput) {
        return this.prisma.bristol.create({ data });
    }

    async remove(id: string) {
        await this.prisma.bristol.delete({ where: { id } });
    }
}
