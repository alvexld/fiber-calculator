import { Injectable } from "@nestjs/common";
import type { CreateBristol } from "@fc/shared";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class BristolService {
    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        return this.prisma.bristol.findMany({ orderBy: [{ date: "desc" }, { time: "desc" }] });
    }

    create(data: CreateBristol) {
        return this.prisma.bristol.create({ data });
    }

    async remove(id: string) {
        await this.prisma.bristol.delete({ where: { id } });
    }
}
