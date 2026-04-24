import { Injectable } from "@nestjs/common";
import type { SavedMeal, UpdateMeal } from "@fc/shared";
import { PrismaService } from "../prisma.service";

@Injectable()
export class MealsService {
    constructor(private readonly prisma: PrismaService) {}

    findAll() {
        return this.prisma.meal.findMany({
            include: { ingredients: true },
            orderBy: { date: "desc" },
        });
    }

    create(data: SavedMeal) {
        return this.prisma.meal.create({
            data: {
                id: data.id,
                date: data.date,
                name: data.name,
                totalFiberGrams: data.totalFiberGrams,
                ingredients: {
                    create: data.ingredients.map((i) => ({
                        id: i.id,
                        ingredientId: i.ingredientId,
                        name: i.name,
                        unit: i.unit,
                        quantity: i.quantity,
                        fiberPerUnit: i.fiberPerUnit,
                        fiberGrams: i.fiberGrams,
                    })),
                },
            },
            include: { ingredients: true },
        });
    }

    update(id: string, data: UpdateMeal) {
        return this.prisma.$transaction(async (tx) => {
            await tx.mealIngredient.deleteMany({ where: { mealId: id } });
            return tx.meal.update({
                where: { id },
                data: {
                    name: data.name,
                    totalFiberGrams: data.totalFiberGrams,
                    ingredients: {
                        create: data.ingredients.map((i) => ({
                            id: i.id,
                            ingredientId: i.ingredientId,
                            name: i.name,
                            unit: i.unit,
                            quantity: i.quantity,
                            fiberPerUnit: i.fiberPerUnit,
                            fiberGrams: i.fiberGrams,
                        })),
                    },
                },
                include: { ingredients: true },
            });
        });
    }

    async remove(id: string) {
        await this.prisma.meal.delete({ where: { id } });
    }
}
