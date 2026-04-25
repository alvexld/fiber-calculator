-- Remove denormalized fields from Meal and MealIngredient.
-- These values are now computed from the Ingredient relation.

ALTER TABLE "Meal" DROP COLUMN "totalFiberGrams";

ALTER TABLE "MealIngredient" DROP COLUMN "unit";
ALTER TABLE "MealIngredient" DROP COLUMN "fiberPerUnit";
ALTER TABLE "MealIngredient" DROP COLUMN "fiberGrams";
