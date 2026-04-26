import { Injectable } from "@nestjs/common";
import type { Prisma } from "@prisma/client";
import type { CreateMealInput, Meal, MealIngredientInput, UpdateMealInput } from "../graphql";
import { PrismaService } from "../prisma/prisma.service";

type MealWithIngredients = Prisma.MealGetPayload<{
    include: { ingredients: { include: { ingredient: true } } };
}>;

const INCLUDE = {
    ingredients: { include: { ingredient: true } },
} satisfies Prisma.MealInclude;

const formatUnit = (ingredient: { unit: string; unitDisplay: string | null }): string =>
    ingredient.unit === "HUNDRED_G" ? "100g" : (ingredient.unitDisplay ?? "pièce");

const toMeal = (meal: MealWithIngredients): Meal => {
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

    async findAll(page?: number, perPage?: number): Promise<{ records: Meal[]; total: number }> {
        const paginated = page !== undefined && perPage !== undefined;
        const [meals, total] = await Promise.all([
            this.prisma.meal.findMany({
                include: INCLUDE,
                orderBy: { date: "desc" },
                ...(paginated && { skip: (page - 1) * perPage, take: perPage }),
            }),
            this.prisma.meal.count(),
        ]);
        return { records: meals.map(toMeal), total };
    }

    async findOne(id: string): Promise<Meal> {
        const meal = await this.prisma.meal.findUniqueOrThrow({
            where: { id },
            include: INCLUDE,
        });
        return toMeal(meal);
    }

    async create(data: CreateMealInput): Promise<Meal> {
        const meal = await this.prisma.meal.create({
            data: {
                id: data.id,
                date: data.date,
                name: data.name,
                ingredients: { create: data.ingredients.map(toIngredientCreate) },
            },
            include: INCLUDE,
        });
        return toMeal(meal);
    }

    async update(id: string, data: Omit<UpdateMealInput, "id">): Promise<Meal> {
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
        return toMeal(meal);
    }

    async remove(id: string): Promise<void> {
        await this.prisma.meal.delete({ where: { id } });
    }
}
