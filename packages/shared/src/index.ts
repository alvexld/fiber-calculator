import { z } from "zod";

// ─── Ingredient ──────────────────────────────────────────────────────────────

export const UnitSchema = z.enum(["PIECE", "HUNDRED_G"]);
export type Unit = z.infer<typeof UnitSchema>;

export const IngredientSchema = z.object({
    id: z.string(),
    name: z.string().min(1),
    unit: UnitSchema,
    unitDisplay: z.string().nullish(),
    fiberPerUnit: z.number().positive(),
    defaultQuantity: z.number().positive().default(1),
});

export const CreateIngredientSchema = IngredientSchema.omit({ id: true });

export type Ingredient = z.infer<typeof IngredientSchema>;
export type CreateIngredient = z.infer<typeof CreateIngredientSchema>;

// ─── Meal ingredient ─────────────────────────────────────────────────────────

/** What the client sends when saving a meal ingredient. */
export const MealIngredientInputSchema = z.object({
    id: z.string(),
    ingredientId: z.string(),
    name: z.string(),
    quantity: z.number().positive(),
});

/** What the server returns — includes fields computed from the Ingredient relation. */
export const MenuIngredientSchema = MealIngredientInputSchema.extend({
    unit: z.string(),
    fiberPerUnit: z.number().nonnegative(),
    fiberGrams: z.number().nonnegative(),
});

export type MealIngredientInput = z.infer<typeof MealIngredientInputSchema>;
export type MenuIngredient = z.infer<typeof MenuIngredientSchema>;

// ─── Meal ────────────────────────────────────────────────────────────────────

/** Request schema for creating a meal. */
export const CreateMealSchema = z.object({
    id: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    time: z
        .string()
        .regex(/^\d{2}:\d{2}$/)
        .optional(),
    name: z.string().min(1),
    ingredients: z.array(MealIngredientInputSchema),
});

/** Response schema — extends the create schema with computed server fields. */
export const SavedMealSchema = CreateMealSchema.extend({
    ingredients: z.array(MenuIngredientSchema),
    totalFiberGrams: z.number().nonnegative(),
});

/** Request schema for updating a meal (no id or date). */
export const UpdateMealSchema = CreateMealSchema.omit({ id: true, date: true });

export type CreateMeal = z.infer<typeof CreateMealSchema>;
export type SavedMeal = z.infer<typeof SavedMealSchema>;
export type UpdateMeal = z.infer<typeof UpdateMealSchema>;

// ─── Bristol ─────────────────────────────────────────────────────────────────

export const BristolSchema = z.object({
    id: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    time: z.string().regex(/^\d{2}:\d{2}$/),
    value: z.number().int().min(1).max(7),
});

export const CreateBristolSchema = BristolSchema.omit({ id: true });

export type Bristol = z.infer<typeof BristolSchema>;
export type CreateBristol = z.infer<typeof CreateBristolSchema>;
