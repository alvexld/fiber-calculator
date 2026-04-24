import type { PrismaClient } from "@prisma/client";
import { INGREDIENTS } from "./ingredients";

const isoDate = (offsetDays: number) => {
    const d = new Date();
    d.setDate(d.getDate() - offsetDays);
    return d.toISOString().split("T")[0]!;
};

type MealDef = {
    id: string;
    date: string;
    name: string;
    ingredients: Array<{ ingredientId: string; qty: number }>;
};

const MEAL_DEFS: MealDef[] = [
    // ── Jour 0 ──────────────────────────────────────────────────────────────
    {
        id: "seed-0-breakfast",
        date: isoDate(0),
        name: "Petit-déjeuner",
        ingredients: [
            { ingredientId: "oats-100g", qty: 0.8 },
            { ingredientId: "banana-piece", qty: 1 },
            { ingredientId: "chia-seeds-tbsp", qty: 1 },
            { ingredientId: "myrtille-100g", qty: 1 },
        ],
    },
    {
        id: "seed-0-lunch",
        date: isoDate(0),
        name: "Déjeuner",
        ingredients: [
            { ingredientId: "brown-rice-100g", qty: 1.5 },
            { ingredientId: "chickpeas-100g", qty: 1 },
            { ingredientId: "spinach-raw-100g", qty: 0.8 },
            { ingredientId: "tomate-medium", qty: 1 },
        ],
    },
    {
        id: "seed-0-dinner",
        date: isoDate(0),
        name: "Dîner",
        ingredients: [
            { ingredientId: "sweet-potato-medium", qty: 1 },
            { ingredientId: "kidney-beans-100g", qty: 1 },
            { ingredientId: "broccoli-100g", qty: 1 },
        ],
    },
    // ── Jour 1 ──────────────────────────────────────────────────────────────
    {
        id: "seed-1-breakfast",
        date: isoDate(1),
        name: "Petit-déjeuner",
        ingredients: [
            { ingredientId: "whole-wheat-bread-slice", qty: 2 },
            { ingredientId: "apple-piece", qty: 1 },
            { ingredientId: "almonds-30g", qty: 1 },
        ],
    },
    {
        id: "seed-1-lunch",
        date: isoDate(1),
        name: "Déjeuner",
        ingredients: [
            { ingredientId: "lentils-100g", qty: 1.5 },
            { ingredientId: "carrot-medium", qty: 2 },
            { ingredientId: "salade-verte-100g", qty: 0.5 },
        ],
    },
    {
        id: "seed-1-dinner",
        date: isoDate(1),
        name: "Dîner",
        ingredients: [
            { ingredientId: "pasta-whole-100g", qty: 1.8 },
            { ingredientId: "tomate-large", qty: 1 },
            { ingredientId: "spinach-raw-100g", qty: 0.6 },
        ],
    },
    // ── Jour 2 ──────────────────────────────────────────────────────────────
    {
        id: "seed-2-breakfast",
        date: isoDate(2),
        name: "Petit-déjeuner",
        ingredients: [
            { ingredientId: "oats-100g", qty: 0.6 },
            { ingredientId: "framboise-100g", qty: 1 },
            { ingredientId: "flaxseeds-tbsp", qty: 1 },
        ],
    },
    {
        id: "seed-2-lunch",
        date: isoDate(2),
        name: "Déjeuner",
        ingredients: [
            { ingredientId: "quinoa-100g", qty: 1.5 },
            { ingredientId: "haricots-verts-100g", qty: 1 },
            { ingredientId: "avocado-half", qty: 1 },
            { ingredientId: "tomate-cerise-100g", qty: 0.8 },
        ],
    },
    {
        id: "seed-2-dinner",
        date: isoDate(2),
        name: "Dîner",
        ingredients: [
            { ingredientId: "potato-medium", qty: 2 },
            { ingredientId: "haricots-blancs-100g", qty: 1 },
            { ingredientId: "leek-medium", qty: 1 },
        ],
    },
    // ── Jour 3 ──────────────────────────────────────────────────────────────
    {
        id: "seed-3-breakfast",
        date: isoDate(3),
        name: "Petit-déjeuner",
        ingredients: [
            { ingredientId: "whole-wheat-bread-slice", qty: 2 },
            { ingredientId: "pear-medium", qty: 1 },
            { ingredientId: "son-avoine-tbsp", qty: 2 },
        ],
    },
    {
        id: "seed-3-lunch",
        date: isoDate(3),
        name: "Déjeuner",
        ingredients: [
            { ingredientId: "bulgur-100g", qty: 1.5 },
            { ingredientId: "pois-casses-100g", qty: 1 },
            { ingredientId: "carrot-large", qty: 1 },
        ],
    },
    {
        id: "seed-3-dinner",
        date: isoDate(3),
        name: "Dîner",
        ingredients: [
            { ingredientId: "sweet-potato-large", qty: 1 },
            { ingredientId: "petits-pois-100g", qty: 0.8 },
            { ingredientId: "broccoli-100g", qty: 1.2 },
        ],
    },
    // ── Jour 4 ──────────────────────────────────────────────────────────────
    {
        id: "seed-4-breakfast",
        date: isoDate(4),
        name: "Petit-déjeuner",
        ingredients: [
            { ingredientId: "oats-100g", qty: 0.8 },
            { ingredientId: "kiwi", qty: 2 },
            { ingredientId: "chia-seeds-tbsp", qty: 1 },
        ],
    },
    {
        id: "seed-4-lunch",
        date: isoDate(4),
        name: "Déjeuner",
        ingredients: [
            { ingredientId: "brown-rice-100g", qty: 1.5 },
            { ingredientId: "edamame-100g", qty: 1 },
            { ingredientId: "chou-bruxelles-100g", qty: 1 },
        ],
    },
    {
        id: "seed-4-dinner",
        date: isoDate(4),
        name: "Dîner",
        ingredients: [
            { ingredientId: "pasta-whole-100g", qty: 2 },
            { ingredientId: "lentils-red-100g", qty: 0.8 },
            { ingredientId: "poivron-rouge-moyen", qty: 1 },
        ],
    },
    // ── Jour 5 ──────────────────────────────────────────────────────────────
    {
        id: "seed-5-breakfast",
        date: isoDate(5),
        name: "Petit-déjeuner",
        ingredients: [
            { ingredientId: "pain-cereales-tranche", qty: 2 },
            { ingredientId: "orange-medium", qty: 1 },
            { ingredientId: "noix-30g", qty: 1 },
        ],
    },
    {
        id: "seed-5-lunch",
        date: isoDate(5),
        name: "Déjeuner",
        ingredients: [
            { ingredientId: "chickpeas-100g", qty: 1.5 },
            { ingredientId: "roquette-100g", qty: 0.8 },
            { ingredientId: "tomate-medium", qty: 2 },
            { ingredientId: "avocado-half", qty: 1 },
        ],
    },
    {
        id: "seed-5-dinner",
        date: isoDate(5),
        name: "Dîner",
        ingredients: [
            { ingredientId: "sarrasin-100g", qty: 1.5 },
            { ingredientId: "haricots-verts-100g", qty: 1.2 },
            { ingredientId: "champignon-100g", qty: 0.8 },
        ],
    },
    // ── Jour 6 ──────────────────────────────────────────────────────────────
    {
        id: "seed-6-breakfast",
        date: isoDate(6),
        name: "Petit-déjeuner",
        ingredients: [
            { ingredientId: "oats-100g", qty: 1 },
            { ingredientId: "fraise-100g", qty: 1 },
            { ingredientId: "almonds-30g", qty: 1 },
            { ingredientId: "flaxseeds-tbsp", qty: 1 },
        ],
    },
    {
        id: "seed-6-lunch",
        date: isoDate(6),
        name: "Déjeuner",
        ingredients: [
            { ingredientId: "lentils-beluga-100g", qty: 1.5 },
            { ingredientId: "sweet-potato-small", qty: 1 },
            { ingredientId: "spinach-raw-100g", qty: 1 },
        ],
    },
    {
        id: "seed-6-dinner",
        date: isoDate(6),
        name: "Dîner",
        ingredients: [
            { ingredientId: "brown-rice-100g", qty: 1.5 },
            { ingredientId: "black-beans-100g", qty: 1 },
            { ingredientId: "poivron-vert-moyen", qty: 1 },
            { ingredientId: "tomate-medium", qty: 1 },
        ],
    },
    // ── Jour 7 ──────────────────────────────────────────────────────────────
    {
        id: "seed-7-breakfast",
        date: isoDate(7),
        name: "Petit-déjeuner",
        ingredients: [
            { ingredientId: "whole-wheat-bread-slice", qty: 3 },
            { ingredientId: "banana-large", qty: 1 },
            { ingredientId: "son-ble-tbsp", qty: 1 },
        ],
    },
    {
        id: "seed-7-lunch",
        date: isoDate(7),
        name: "Déjeuner",
        ingredients: [
            { ingredientId: "quinoa-100g", qty: 1.5 },
            { ingredientId: "feves-100g", qty: 1 },
            { ingredientId: "chou-kale-100g", qty: 0.8 },
        ],
    },
    {
        id: "seed-7-dinner",
        date: isoDate(7),
        name: "Dîner",
        ingredients: [
            { ingredientId: "pasta-whole-100g", qty: 1.8 },
            { ingredientId: "haricots-blancs-100g", qty: 0.8 },
            { ingredientId: "aubergine-small", qty: 1 },
        ],
    },
    // ── Jour 8 ──────────────────────────────────────────────────────────────
    {
        id: "seed-8-breakfast",
        date: isoDate(8),
        name: "Petit-déjeuner",
        ingredients: [
            { ingredientId: "oats-100g", qty: 0.7 },
            { ingredientId: "pear-large", qty: 1 },
            { ingredientId: "chia-seeds-tbsp", qty: 2 },
        ],
    },
    {
        id: "seed-8-lunch",
        date: isoDate(8),
        name: "Déjeuner",
        ingredients: [
            { ingredientId: "bulgur-100g", qty: 1.5 },
            { ingredientId: "kidney-beans-100g", qty: 1 },
            { ingredientId: "betterave-100g", qty: 0.8 },
            { ingredientId: "salade-verte-100g", qty: 0.5 },
        ],
    },
    {
        id: "seed-8-dinner",
        date: isoDate(8),
        name: "Dîner",
        ingredients: [
            { ingredientId: "sweet-potato-medium", qty: 1 },
            { ingredientId: "petits-pois-100g", qty: 1 },
            { ingredientId: "carrot-medium", qty: 2 },
        ],
    },
    // ── Jour 9 ──────────────────────────────────────────────────────────────
    {
        id: "seed-9-breakfast",
        date: isoDate(9),
        name: "Petit-déjeuner",
        ingredients: [
            { ingredientId: "pain-seigle-tranche", qty: 2 },
            { ingredientId: "apple-large", qty: 1 },
            { ingredientId: "noisettes-30g", qty: 1 },
        ],
    },
    {
        id: "seed-9-lunch",
        date: isoDate(9),
        name: "Déjeuner",
        ingredients: [
            { ingredientId: "lentils-100g", qty: 1.5 },
            { ingredientId: "fenouil", qty: 1 },
            { ingredientId: "tomate-cerise-100g", qty: 1 },
        ],
    },
    {
        id: "seed-9-dinner",
        date: isoDate(9),
        name: "Dîner",
        ingredients: [
            { ingredientId: "brown-rice-100g", qty: 1.5 },
            { ingredientId: "chickpeas-100g", qty: 1 },
            { ingredientId: "chou-fleur-100g", qty: 1 },
        ],
    },
    // ── Jour 10 ─────────────────────────────────────────────────────────────
    {
        id: "seed-10-breakfast",
        date: isoDate(10),
        name: "Petit-déjeuner",
        ingredients: [
            { ingredientId: "oats-100g", qty: 0.8 },
            { ingredientId: "myrtille-100g", qty: 1 },
            { ingredientId: "psyllium-tsp", qty: 1 },
            { ingredientId: "banana-small", qty: 1 },
        ],
    },
    {
        id: "seed-10-lunch",
        date: isoDate(10),
        name: "Déjeuner",
        ingredients: [
            { ingredientId: "sarrasin-100g", qty: 1.5 },
            { ingredientId: "edamame-100g", qty: 1 },
            { ingredientId: "poivron-rouge-moyen", qty: 1 },
            { ingredientId: "roquette-100g", qty: 0.5 },
        ],
    },
    {
        id: "seed-10-dinner",
        date: isoDate(10),
        name: "Dîner",
        ingredients: [
            { ingredientId: "potato-large", qty: 1 },
            { ingredientId: "haricots-verts-100g", qty: 1.2 },
            { ingredientId: "broccoli-100g", qty: 0.8 },
        ],
    },
    // ── Jour 11 ─────────────────────────────────────────────────────────────
    {
        id: "seed-11-breakfast",
        date: isoDate(11),
        name: "Petit-déjeuner",
        ingredients: [
            { ingredientId: "whole-wheat-bread-slice", qty: 2 },
            { ingredientId: "orange-large", qty: 1 },
            { ingredientId: "almonds-30g", qty: 1 },
        ],
    },
    {
        id: "seed-11-lunch",
        date: isoDate(11),
        name: "Déjeuner",
        ingredients: [
            { ingredientId: "quinoa-100g", qty: 1.5 },
            { ingredientId: "pois-casses-100g", qty: 1 },
            { ingredientId: "carrot-medium", qty: 1 },
            { ingredientId: "spinach-raw-100g", qty: 0.5 },
        ],
    },
    {
        id: "seed-11-dinner",
        date: isoDate(11),
        name: "Dîner",
        ingredients: [
            { ingredientId: "pasta-whole-100g", qty: 2 },
            { ingredientId: "lentils-red-100g", qty: 1 },
            { ingredientId: "champignon-100g", qty: 1 },
        ],
    },
    // ── Jour 12 ─────────────────────────────────────────────────────────────
    {
        id: "seed-12-breakfast",
        date: isoDate(12),
        name: "Petit-déjeuner",
        ingredients: [
            { ingredientId: "oats-100g", qty: 0.8 },
            { ingredientId: "framboise-100g", qty: 1 },
            { ingredientId: "chia-seeds-tbsp", qty: 1 },
        ],
    },
    {
        id: "seed-12-lunch",
        date: isoDate(12),
        name: "Déjeuner",
        ingredients: [
            { ingredientId: "brown-rice-100g", qty: 1.5 },
            { ingredientId: "soja-100g", qty: 1 },
            { ingredientId: "mais-100g", qty: 0.8 },
            { ingredientId: "tomate-medium", qty: 1 },
        ],
    },
    {
        id: "seed-12-dinner",
        date: isoDate(12),
        name: "Dîner",
        ingredients: [
            { ingredientId: "sweet-potato-medium", qty: 1 },
            { ingredientId: "chickpeas-100g", qty: 1 },
            { ingredientId: "haricots-verts-100g", qty: 0.8 },
        ],
    },
    // ── Jour 13 ─────────────────────────────────────────────────────────────
    {
        id: "seed-13-breakfast",
        date: isoDate(13),
        name: "Petit-déjeuner",
        ingredients: [
            { ingredientId: "pain-cereales-tranche", qty: 2 },
            { ingredientId: "pear-medium", qty: 1 },
            { ingredientId: "noix-30g", qty: 1 },
            { ingredientId: "flaxseeds-tbsp", qty: 1 },
        ],
    },
    {
        id: "seed-13-lunch",
        date: isoDate(13),
        name: "Déjeuner",
        ingredients: [
            { ingredientId: "bulgur-100g", qty: 1.5 },
            { ingredientId: "lentils-beluga-100g", qty: 1 },
            { ingredientId: "chou-blanc-100g", qty: 0.8 },
        ],
    },
    {
        id: "seed-13-dinner",
        date: isoDate(13),
        name: "Dîner",
        ingredients: [
            { ingredientId: "brown-rice-100g", qty: 1.5 },
            { ingredientId: "black-beans-100g", qty: 1 },
            { ingredientId: "aubergine-large", qty: 1 },
        ],
    },
];

export const seedMeals = async (prisma: PrismaClient) => {
    const ingredientMap = new Map(INGREDIENTS.map((i) => [i.id, i]));
    let count = 0;

    for (const def of MEAL_DEFS) {
        const items = def.ingredients.flatMap(({ ingredientId, qty }, idx) => {
            const ing = ingredientMap.get(ingredientId);
            if (!ing) return [];
            return [
                {
                    id: `${def.id}-${idx}`,
                    ingredientId: ing.id,
                    name: ing.name,
                    unit: ing.unit,
                    quantity: qty,
                    fiberPerUnit: ing.fiberPerUnit,
                    fiberGrams: qty * ing.fiberPerUnit,
                },
            ];
        });

        const totalFiberGrams = items.reduce((sum, i) => sum + i.fiberGrams, 0);

        await prisma.meal.upsert({
            where: { id: def.id },
            update: { date: def.date, name: def.name, totalFiberGrams },
            create: { id: def.id, date: def.date, name: def.name, totalFiberGrams },
        });

        for (const item of items) {
            await prisma.mealIngredient.upsert({
                where: { id: item.id },
                update: item,
                create: { ...item, mealId: def.id },
            });
        }

        count++;
    }

    console.log(`✓ ${count} repas seedés`);
};
