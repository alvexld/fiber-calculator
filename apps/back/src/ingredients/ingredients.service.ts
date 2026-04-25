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

  findAll({
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
    return this.prisma.ingredient.findMany({
      where: search
        ? { nameSearch: { contains: normalizeForSearch(search) } }
        : undefined,
      orderBy:
        orderBy === "usage"
          ? { mealIngredients: { _count: "desc" } }
          : { name: "asc" },
      ...(perPage !== undefined && {
        skip: (page - 1) * perPage,
        take: perPage,
      }),
    });
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
