import { Injectable } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import type { CreateMeal, MealIngredientInput, SavedMeal, UpdateMeal } from "@fc/shared";
import { PrismaService } from "../prisma/prisma.service";

type MealWithIngredients = Prisma.MealGetPayload<{
    include: { ingredients: { include: { ingredient: true } } };
}>;

const INCLUDE = {
    ingredients: { include: { ingredient: true } },
} satisfies Prisma.MealInclude;

const formatUnit = (ingredient: { unit: string; unitDisplay: string | null }): string =>
    ingredient.unit === "HUNDRED_G" ? "100g" : (ingredient.unitDisplay ?? "pièce");

const toSavedMeal = (meal: MealWithIngredients): SavedMeal => {
    const ingredients = meal.ingredients.map((mi) => ({
        id: mi.id,
        ingredientId: mi.ingredientId,
        name: mi.name,
        unit: formatUnit(mi.ingredient),
        quantity: mi.quantity,
        fiberPerUnit: mi.ingredient.fiberPerUnit,
        fiberGrams: mi.quantity * mi.ingredient.fiberPerUnit,
    }));

    return {
        id: meal.id,
        date: meal.date,
        name: meal.name,
        ingredients,
        totalFiberGrams: ingredients.reduce((sum, i) => sum + i.fiberGrams, 0),
    };
};

const toIngredientCreate = (i: MealIngredientInput) => ({
    id: i.id,
    ingredientId: i.ingredientId,
    name: i.name,
    quantity: i.quantity,
});

@Injectable()
export class MealsService {
    constructor(private readonly prisma: PrismaService) {}

    async findAll(page?: number, perPage?: number): Promise<{ data: SavedMeal[]; total: number }> {
        const paginated = page !== undefined && perPage !== undefined;
        const [meals, total] = await Promise.all([
            this.prisma.meal.findMany({
                include: INCLUDE,
                orderBy: { date: "desc" },
                ...(paginated && { skip: (page - 1) * perPage, take: perPage }),
            }),
            this.prisma.meal.count(),
        ]);
        return { data: meals.map(toSavedMeal), total };
    }

    async findOne(id: string): Promise<SavedMeal> {
        const meal = await this.prisma.meal.findUniqueOrThrow({
            where: { id },
            include: INCLUDE,
        });
        return toSavedMeal(meal);
    }

    async create(data: CreateMeal): Promise<SavedMeal> {
        const meal = await this.prisma.meal.create({
            data: {
                id: data.id,
                date: data.date,
                name: data.name,
                ingredients: { create: data.ingredients.map(toIngredientCreate) },
            },
            include: INCLUDE,
        });
        return toSavedMeal(meal);
    }

    async update(id: string, data: UpdateMeal): Promise<SavedMeal> {
        const meal = await this.prisma.$transaction(async (tx) => {
            await tx.mealIngredient.deleteMany({ where: { mealId: id } });
            return tx.meal.update({
                where: { id },
                data: {
                    name: data.name,
                    ingredients: { create: data.ingredients.map(toIngredientCreate) },
                },
                include: INCLUDE,
            });
        });
        return toSavedMeal(meal);
    }

    async remove(id: string): Promise<void> {
        await this.prisma.meal.delete({ where: { id } });
    }
}
