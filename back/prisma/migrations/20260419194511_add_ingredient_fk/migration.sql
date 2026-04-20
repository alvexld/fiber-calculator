-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MealIngredient" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mealId" TEXT NOT NULL,
    "ingredientId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "fiberPerUnit" REAL NOT NULL,
    "fiberGrams" REAL NOT NULL,
    CONSTRAINT "MealIngredient_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "MealIngredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_MealIngredient" ("fiberGrams", "fiberPerUnit", "id", "ingredientId", "mealId", "name", "quantity", "unit") SELECT "fiberGrams", "fiberPerUnit", "id", "ingredientId", "mealId", "name", "quantity", "unit" FROM "MealIngredient";
DROP TABLE "MealIngredient";
ALTER TABLE "new_MealIngredient" RENAME TO "MealIngredient";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
