import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Unit } from "@prisma/client";

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const normalizeForSearch = (str: string) =>
    str
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .toLowerCase();

// Fiber values sourced from Ciqual (ANSES) and USDA FoodData Central.
// Piece weights are typical edible portions (peel included for fruits where applicable).
const INGREDIENTS = [
    // ─── FRUITS ───────────────────────────────────────────────────────────────
    { id: "abricot", name: "Abricot", unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 1.0 },
    {
        id: "ananas-100g",
        name: "Ananas",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 1.4,
    },
    {
        id: "avocado-half",
        name: "Avocat (demi)",
        unit: Unit.PIECE,
        unitDisplay: "demi",
        fiberPerUnit: 5.0,
    },
    {
        id: "banana-small",
        name: "Banane petite",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 2.6,
    },
    {
        id: "banana-piece",
        name: "Banane moyenne",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 3.4,
    },
    {
        id: "banana-large",
        name: "Banane grosse",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 4.2,
    },
    {
        id: "cerise-100g",
        name: "Cerises",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 1.6,
    },
    { id: "citron", name: "Citron", unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 1.5 },
    {
        id: "figue-fraiche",
        name: "Figue fraîche",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 1.5,
    },
    {
        id: "figue-sechee",
        name: "Figue séchée",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 1.5,
    },
    {
        id: "fraise-100g",
        name: "Fraises",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 2.0,
    },
    {
        id: "framboise-100g",
        name: "Framboises",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 6.5,
    },
    { id: "grenade", name: "Grenade", unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 4.0 },
    { id: "kiwi", name: "Kiwi", unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 2.2 },
    { id: "mandarine", name: "Mandarine", unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 1.4 },
    { id: "mangue", name: "Mangue", unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 3.2 },
    {
        id: "melon-tranche",
        name: "Melon (tranche)",
        unit: Unit.PIECE,
        unitDisplay: "tranche",
        fiberPerUnit: 1.8,
    },
    { id: "mure-100g", name: "Mûres", unit: Unit.HUNDRED_G, unitDisplay: null, fiberPerUnit: 5.3 },
    {
        id: "myrtille-100g",
        name: "Myrtilles",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 2.4,
    },
    {
        id: "orange-small",
        name: "Orange petite",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 2.9,
    },
    {
        id: "orange-medium",
        name: "Orange moyenne",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 3.9,
    },
    {
        id: "orange-large",
        name: "Orange grosse",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 4.8,
    },
    {
        id: "pamplemousse-half",
        name: "Pamplemousse (demi)",
        unit: Unit.PIECE,
        unitDisplay: "demi",
        fiberPerUnit: 3.2,
    },
    {
        id: "peche-small",
        name: "Pêche petite",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 1.5,
    },
    {
        id: "peche-large",
        name: "Pêche grosse",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 2.7,
    },
    {
        id: "pear-piece",
        name: "Poire petite",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 4.0,
    },
    {
        id: "pear-medium",
        name: "Poire moyenne",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 5.6,
    },
    {
        id: "pear-large",
        name: "Poire grosse",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 7.4,
    },
    {
        id: "apple-small",
        name: "Pomme petite",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 3.1,
    },
    {
        id: "apple-piece",
        name: "Pomme moyenne",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 4.3,
    },
    {
        id: "apple-large",
        name: "Pomme grosse",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 5.8,
    },
    { id: "prune", name: "Prune", unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 0.7 },
    {
        id: "pruneau-sec",
        name: "Pruneau séché",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 0.7,
    },
    {
        id: "raisin-100g",
        name: "Raisins frais",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 0.9,
    },

    // ─── LÉGUMES ──────────────────────────────────────────────────────────────
    {
        id: "artichaut",
        name: "Artichaut (cœur cuit)",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 5.5,
    },
    {
        id: "asperge-100g",
        name: "Asperges",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 2.1,
    },
    {
        id: "aubergine-small",
        name: "Aubergine petite",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 5.0,
    },
    {
        id: "aubergine-large",
        name: "Aubergine grosse",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 10.0,
    },
    {
        id: "betterave-100g",
        name: "Betterave cuite",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 2.0,
    },
    {
        id: "broccoli-100g",
        name: "Brocoli",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 2.6,
    },
    {
        id: "carrot-small",
        name: "Carotte petite",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 1.4,
    },
    {
        id: "carrot-medium",
        name: "Carotte moyenne",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 2.2,
    },
    {
        id: "carrot-large",
        name: "Carotte grosse",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 3.4,
    },
    {
        id: "celeri-branche",
        name: "Céleri branche",
        unit: Unit.PIECE,
        unitDisplay: "branche",
        fiberPerUnit: 0.6,
    },
    {
        id: "celeri-rave-100g",
        name: "Céleri-rave",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 1.8,
    },
    {
        id: "champignon-100g",
        name: "Champignons de Paris",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 1.0,
    },
    {
        id: "chou-blanc-100g",
        name: "Chou blanc",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 2.5,
    },
    {
        id: "chou-bruxelles-100g",
        name: "Choux de Bruxelles",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 3.8,
    },
    {
        id: "chou-fleur-100g",
        name: "Chou-fleur",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 2.0,
    },
    {
        id: "chou-kale-100g",
        name: "Chou kale",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 3.6,
    },
    {
        id: "concombre",
        name: "Concombre (petit)",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 1.0,
    },
    {
        id: "courgette-small",
        name: "Courgette petite",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 2.0,
    },
    {
        id: "courgette-large",
        name: "Courgette grosse",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 3.5,
    },
    {
        id: "spinach-raw-100g",
        name: "Épinards",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 2.2,
    },
    {
        id: "fenouil",
        name: "Fenouil (bulbe)",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 6.2,
    },
    {
        id: "haricots-verts-100g",
        name: "Haricots verts",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 3.4,
    },
    {
        id: "mais-100g",
        name: "Maïs cuit",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 2.4,
    },
    {
        id: "navet-moyen",
        name: "Navet moyen",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 2.7,
    },
    {
        id: "onion-small",
        name: "Oignon petit",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 1.2,
    },
    {
        id: "onion-medium",
        name: "Oignon moyen",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 1.9,
    },
    {
        id: "onion-large",
        name: "Oignon gros",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 3.0,
    },
    {
        id: "oignon-rouge-moyen",
        name: "Oignon rouge moyen",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 2.6,
    },
    {
        id: "panais-100g",
        name: "Panais",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 4.9,
    },
    {
        id: "sweet-potato-small",
        name: "Patate douce petite",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 3.0,
    },
    {
        id: "sweet-potato-medium",
        name: "Patate douce moyenne",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 5.3,
    },
    {
        id: "sweet-potato-large",
        name: "Patate douce grosse",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 7.5,
    },
    {
        id: "petits-pois-100g",
        name: "Petits pois cuits",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 5.7,
    },
    {
        id: "leek-small",
        name: "Poireau petit",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 1.4,
    },
    {
        id: "leek-medium",
        name: "Poireau moyen",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 2.3,
    },
    {
        id: "leek-large",
        name: "Poireau gros",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 3.6,
    },
    {
        id: "poivron-rouge-moyen",
        name: "Poivron rouge moyen",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 3.2,
    },
    {
        id: "poivron-vert-moyen",
        name: "Poivron vert moyen",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 2.6,
    },
    {
        id: "potato-small",
        name: "Pomme de terre petite",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 1.8,
    },
    {
        id: "potato-medium",
        name: "Pomme de terre moyenne",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 2.7,
    },
    {
        id: "potato-large",
        name: "Pomme de terre grosse",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 4.5,
    },
    {
        id: "roquette-100g",
        name: "Roquette",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 1.6,
    },
    {
        id: "salade-verte-100g",
        name: "Salade verte",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 1.3,
    },
    {
        id: "tomate-cerise-100g",
        name: "Tomates cerises",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 1.2,
    },
    {
        id: "tomate-small",
        name: "Tomate petite",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 1.0,
    },
    {
        id: "tomate-medium",
        name: "Tomate moyenne",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 1.5,
    },
    {
        id: "tomate-large",
        name: "Tomate grosse",
        unit: Unit.PIECE,
        unitDisplay: null,
        fiberPerUnit: 2.4,
    },
    {
        id: "topinambour-100g",
        name: "Topinambour",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 1.6,
    },

    // ─── FÉCULENTS (pour 100 g cuit) ─────────────────────────────────────────
    {
        id: "bulgur-100g",
        name: "Boulgour cuit",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 4.5,
    },
    {
        id: "epeautre-100g",
        name: "Épeautre cuit",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 3.8,
    },
    {
        id: "oats-100g",
        name: "Flocons d'avoine",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 10.1,
    },
    {
        id: "millet-100g",
        name: "Millet cuit",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 1.3,
    },
    {
        id: "orge-perle-100g",
        name: "Orge perlé cuit",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 3.8,
    },
    {
        id: "pasta-white-100g",
        name: "Pâtes blanches cuites",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 1.8,
    },
    {
        id: "pasta-whole-100g",
        name: "Pâtes complètes cuites",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 3.5,
    },
    {
        id: "quinoa-100g",
        name: "Quinoa cuit",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 2.8,
    },
    {
        id: "white-rice-100g",
        name: "Riz blanc cuit",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 0.4,
    },
    {
        id: "brown-rice-100g",
        name: "Riz complet cuit",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 1.8,
    },
    {
        id: "wild-rice-100g",
        name: "Riz sauvage cuit",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 1.8,
    },
    {
        id: "sarrasin-100g",
        name: "Sarrasin cuit",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 2.7,
    },
    {
        id: "semoule-100g",
        name: "Semoule de blé cuite",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 1.4,
    },

    // ─── PAIN ─────────────────────────────────────────────────────────────────
    {
        id: "pain-blanc-tranche",
        name: "Pain blanc",
        unit: Unit.PIECE,
        unitDisplay: "tranche",
        fiberPerUnit: 0.8,
    },
    {
        id: "whole-wheat-bread-slice",
        name: "Pain complet",
        unit: Unit.PIECE,
        unitDisplay: "tranche",
        fiberPerUnit: 1.9,
    },
    {
        id: "pain-seigle-tranche",
        name: "Pain de seigle",
        unit: Unit.PIECE,
        unitDisplay: "tranche",
        fiberPerUnit: 1.9,
    },
    {
        id: "pain-cereales-tranche",
        name: "Pain aux céréales",
        unit: Unit.PIECE,
        unitDisplay: "tranche",
        fiberPerUnit: 1.3,
    },

    // ─── LÉGUMINEUSES (pour 100 g cuit) ──────────────────────────────────────
    {
        id: "edamame-100g",
        name: "Edamame cuit",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 5.2,
    },
    {
        id: "feves-100g",
        name: "Fèves cuites",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 5.4,
    },
    {
        id: "haricots-blancs-100g",
        name: "Haricots blancs cuits",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 6.3,
    },
    {
        id: "black-beans-100g",
        name: "Haricots noirs cuits",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 8.7,
    },
    {
        id: "kidney-beans-100g",
        name: "Haricots rouges cuits",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 6.4,
    },
    {
        id: "lentils-beluga-100g",
        name: "Lentilles beluga cuites",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 7.5,
    },
    {
        id: "lentils-100g",
        name: "Lentilles vertes cuites",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 7.9,
    },
    {
        id: "lentils-red-100g",
        name: "Lentilles rouges cuites",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 5.5,
    },
    {
        id: "pois-casses-100g",
        name: "Pois cassés cuits",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 8.3,
    },
    {
        id: "chickpeas-100g",
        name: "Pois chiches cuits",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 7.6,
    },
    {
        id: "soja-100g",
        name: "Soja cuit",
        unit: Unit.HUNDRED_G,
        unitDisplay: null,
        fiberPerUnit: 6.0,
    },

    // ─── GRAINES & OLÉAGINEUX ─────────────────────────────────────────────────
    {
        id: "almonds-30g",
        name: "Amandes",
        unit: Unit.PIECE,
        unitDisplay: "poignée (30g)",
        fiberPerUnit: 3.5,
    },
    {
        id: "noisettes-30g",
        name: "Noisettes",
        unit: Unit.PIECE,
        unitDisplay: "poignée (30g)",
        fiberPerUnit: 2.7,
    },
    {
        id: "noix-30g",
        name: "Noix",
        unit: Unit.PIECE,
        unitDisplay: "poignée (30g)",
        fiberPerUnit: 2.0,
    },
    {
        id: "noix-cajou-30g",
        name: "Noix de cajou",
        unit: Unit.PIECE,
        unitDisplay: "poignée (30g)",
        fiberPerUnit: 0.9,
    },
    {
        id: "pistaches-30g",
        name: "Pistaches",
        unit: Unit.PIECE,
        unitDisplay: "poignée (30g)",
        fiberPerUnit: 3.0,
    },
    {
        id: "graines-chanvre-tbsp",
        name: "Graines de chanvre",
        unit: Unit.PIECE,
        unitDisplay: "c. à soupe",
        fiberPerUnit: 1.2,
    },
    {
        id: "chia-seeds-tbsp",
        name: "Graines de chia",
        unit: Unit.PIECE,
        unitDisplay: "c. à soupe",
        fiberPerUnit: 4.0,
    },
    {
        id: "graines-courge-30g",
        name: "Graines de courge",
        unit: Unit.PIECE,
        unitDisplay: "poignée (30g)",
        fiberPerUnit: 1.8,
    },
    {
        id: "flaxseeds-tbsp",
        name: "Graines de lin moulues",
        unit: Unit.PIECE,
        unitDisplay: "c. à soupe",
        fiberPerUnit: 1.9,
    },
    {
        id: "graines-pavot-tbsp",
        name: "Graines de pavot",
        unit: Unit.PIECE,
        unitDisplay: "c. à soupe",
        fiberPerUnit: 1.5,
    },
    {
        id: "graines-sesame-tbsp",
        name: "Graines de sésame",
        unit: Unit.PIECE,
        unitDisplay: "c. à soupe",
        fiberPerUnit: 0.9,
    },
    {
        id: "graines-tournesol-30g",
        name: "Graines de tournesol",
        unit: Unit.PIECE,
        unitDisplay: "poignée (30g)",
        fiberPerUnit: 2.7,
    },

    // ─── COMPLÉMENTS FIBRE ────────────────────────────────────────────────────
    { id: "garlic-clove", name: "Ail", unit: Unit.PIECE, unitDisplay: "gousse", fiberPerUnit: 0.1 },
    {
        id: "son-avoine-tbsp",
        name: "Son d'avoine",
        unit: Unit.PIECE,
        unitDisplay: "c. à soupe",
        fiberPerUnit: 1.8,
    },
    {
        id: "son-ble-tbsp",
        name: "Son de blé",
        unit: Unit.PIECE,
        unitDisplay: "c. à soupe",
        fiberPerUnit: 3.3,
    },
    {
        id: "wheat-germ-tbsp",
        name: "Germes de blé",
        unit: Unit.PIECE,
        unitDisplay: "c. à soupe",
        fiberPerUnit: 1.3,
    },
    {
        id: "brewer-yeast-tbsp",
        name: "Levure de bière",
        unit: Unit.PIECE,
        unitDisplay: "c. à soupe",
        fiberPerUnit: 0.5,
    },
    {
        id: "psyllium-tsp",
        name: "Psyllium",
        unit: Unit.PIECE,
        unitDisplay: "c. à café",
        fiberPerUnit: 3.5,
    },
];

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
            { ingredientId: "poireau moyen", qty: 1 },
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

async function seedMeals() {
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
}

async function main() {
    for (const ingredient of INGREDIENTS) {
        const data = { ...ingredient, nameSearch: normalizeForSearch(ingredient.name) };
        await prisma.ingredient.upsert({
            where: { id: ingredient.id },
            update: data,
            create: data,
        });
    }
    console.log(`✓ ${INGREDIENTS.length} ingrédients seedés`);

    await seedMeals();
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
