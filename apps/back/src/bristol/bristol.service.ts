import { Injectable } from "@nestjs/common";
import type { CreateBristol } from "@fc/shared";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BristolService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(page?: number, perPage?: number): Promise<{ data: unknown[]; total: number }> {
        const paginated = page !== undefined && perPage !== undefined;
        const [data, total] = await Promise.all([
            this.prisma.bristol.findMany({
                orderBy: [{ date: "desc" }, { time: "desc" }],
                ...(paginated && { skip: (page - 1) * perPage, take: perPage }),
            }),
            this.prisma.bristol.count(),
        ]);
        return { data, total };
    }

    create(data: CreateBristol) {
        return this.prisma.bristol.create({ data });
    }

    async remove(id: string) {
        await this.prisma.bristol.delete({ where: { id } });
    }
}
