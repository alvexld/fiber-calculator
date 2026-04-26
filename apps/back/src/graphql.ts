/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export type Unit = "PIECE" | "HUNDRED_G";

export interface CreateBristolInput {
    date: string;
    time: string;
    value: number;
}

export interface DeleteBristolInput {
    id: string;
}

export interface BristolsInput {
    page?: Nullable<number>;
    perPage?: Nullable<number>;
}

export interface CreateIngredientInput {
    name: string;
    unit: Unit;
    unitDisplay?: Nullable<string>;
    fiberPerUnit: number;
    defaultQuantity: number;
}

export interface UpdateIngredientInput {
    id: string;
    name: string;
    unit: Unit;
    unitDisplay?: Nullable<string>;
    fiberPerUnit: number;
    defaultQuantity: number;
}

export interface DeleteIngredientInput {
    id: string;
}

export interface MealIngredientInput {
    id: string;
    ingredientId: string;
    name: string;
    quantity: number;
}

export interface CreateMealInput {
    id: string;
    date: string;
    name: string;
    ingredients: MealIngredientInput[];
}

export interface UpdateMealInput {
    id: string;
    name: string;
    ingredients: MealIngredientInput[];
}

export interface DeleteMealInput {
    id: string;
}

export interface MealsInput {
    page?: Nullable<number>;
    perPage?: Nullable<number>;
}

export interface Bristol {
    id: string;
    date: string;
    time: string;
    value: number;
}

export interface PaginatedBristols {
    records: Bristol[];
    total: number;
}

export interface IQuery {
    bristols(input?: Nullable<BristolsInput>): PaginatedBristols | Promise<PaginatedBristols>;
    dashboard(): DashboardData | Promise<DashboardData>;
    ingredients(
        search?: Nullable<string>,
        orderBy?: Nullable<string>,
        page?: Nullable<number>,
        perPage?: Nullable<number>,
    ): PaginatedIngredients | Promise<PaginatedIngredients>;
    meals(input?: Nullable<MealsInput>): PaginatedMeals | Promise<PaginatedMeals>;
    meal(id: string): Meal | Promise<Meal>;
}

export interface IMutation {
    createBristol(input: CreateBristolInput): Bristol | Promise<Bristol>;
    deleteBristol(input: DeleteBristolInput): boolean | Promise<boolean>;
    createIngredient(input: CreateIngredientInput): Ingredient | Promise<Ingredient>;
    updateIngredient(input: UpdateIngredientInput): Ingredient | Promise<Ingredient>;
    deleteIngredient(input: DeleteIngredientInput): boolean | Promise<boolean>;
    createMeal(input: CreateMealInput): Meal | Promise<Meal>;
    updateMeal(input: UpdateMealInput): Meal | Promise<Meal>;
    deleteMeal(input: DeleteMealInput): boolean | Promise<boolean>;
}

export interface DashboardData {
    meals: Meal[];
    bristols: Bristol[];
}

export interface Ingredient {
    id: string;
    name: string;
    unit: Unit;
    unitDisplay?: Nullable<string>;
    fiberPerUnit: number;
    defaultQuantity: number;
}

export interface PaginatedIngredients {
    records: Ingredient[];
    total: number;
}

export interface MealIngredient {
    id: string;
    ingredientId: string;
    name: string;
    quantity: number;
    unit: string;
    fiberPerUnit: number;
    fiberGrams: number;
}

export interface Meal {
    id: string;
    date: string;
    name: string;
    ingredients: MealIngredient[];
    totalFiberGrams: number;
}

export interface PaginatedMeals {
    records: Meal[];
    total: number;
}

type Nullable<T> = T | null;
