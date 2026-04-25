import { Injectable } from "@nestjs/common";
import type { CreateIngredient } from "@fc/shared";
import { PrismaService } from "../prisma/prisma.service";

const normalizeForSearch = (str: string) =>
    str
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase();

@Injectable()
export class IngredientsService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll({
        search,
        orderBy = "name",
        page = 1,
        perPage,
    }: {
        search?: string;
        orderBy?: "name" | "usage";
        page?: number;
        perPage?: number;
    }) {
        const where = search ? { nameSearch: { contains: normalizeForSearch(search) } } : undefined;
        const orderByClause =
            orderBy === "usage"
                ? { mealIngredients: { _count: "desc" as const } }
                : { name: "asc" as const };

        const [data, total] = await this.prisma.$transaction([
            this.prisma.ingredient.findMany({
                where,
                orderBy: orderByClause,
                ...(perPage !== undefined && { skip: (page - 1) * perPage, take: perPage }),
            }),
            this.prisma.ingredient.count({ where }),
        ]);

        return { data, total };
    }

    create(data: CreateIngredient) {
        return this.prisma.ingredient.create({
            data: { ...data, nameSearch: normalizeForSearch(data.name) },
        });
    }

    update(id: string, data: CreateIngredient) {
        return this.prisma.ingredient.update({
            where: { id },
            data: { ...data, nameSearch: normalizeForSearch(data.name) },
        });
    }

    async remove(id: string) {
        await this.prisma.ingredient.delete({ where: { id } });
    }
}
