export type Ingredient = {
    id: string;
    name: string;
    unit: string;
    fiberPerUnit: number; // grams of fiber per 1 unit
};

export const INGREDIENTS: Ingredient[] = [
    { id: "garlic-clove", name: "Ail (1 gousse)", unit: "gousse", fiberPerUnit: 0.1 },
    { id: "almonds-30g", name: "Amandes", unit: "poignée (30g)", fiberPerUnit: 3.5 },
    { id: "avocado-half", name: "Avocat", unit: "demi", fiberPerUnit: 5.0 },
    { id: "banana-piece", name: "Banane", unit: "pièce", fiberPerUnit: 3.1 },
    { id: "broccoli-100g", name: "Brocoli", unit: "100g", fiberPerUnit: 2.6 },
    { id: "carrot-small", name: "Carotte petite", unit: "pièce", fiberPerUnit: 1.4 },
    { id: "carrot-medium", name: "Carotte moyenne", unit: "pièce", fiberPerUnit: 2.2 },
    { id: "carrot-large", name: "Carotte grosse", unit: "pièce", fiberPerUnit: 3.4 },
    { id: "spinach-raw-100g", name: "Épinards crus", unit: "100g", fiberPerUnit: 2.2 },
    { id: "oats-100g", name: "Flocons d'avoine", unit: "100g", fiberPerUnit: 10.1 },
    { id: "wheat-germ-tbsp", name: "Germes de blé", unit: "c. à soupe", fiberPerUnit: 1.3 },
    { id: "chia-seeds-tbsp", name: "Graines de chia", unit: "c. à soupe", fiberPerUnit: 4.0 },
    { id: "flaxseeds-tbsp", name: "Graines de lin moulues", unit: "c. à soupe", fiberPerUnit: 1.9 },
    { id: "black-beans-100g", name: "Haricots noirs", unit: "100g", fiberPerUnit: 8.7 },
    { id: "kidney-beans-100g", name: "Haricots rouges", unit: "100g", fiberPerUnit: 6.4 },
    { id: "lentils-100g", name: "Lentilles", unit: "100g", fiberPerUnit: 7.9 },
    { id: "brewer-yeast-tbsp", name: "Levure de bière", unit: "c. à soupe", fiberPerUnit: 0.5 },
    { id: "onion-small", name: "Oignon petit", unit: "pièce", fiberPerUnit: 1.2 },
    { id: "onion-medium", name: "Oignon moyen", unit: "pièce", fiberPerUnit: 1.9 },
    { id: "onion-large", name: "Oignon gros", unit: "pièce", fiberPerUnit: 3.0 },
    { id: "whole-wheat-bread-slice", name: "Pain complet", unit: "tranche", fiberPerUnit: 1.9 },
    { id: "sweet-potato-small", name: "Patate douce petite", unit: "pièce", fiberPerUnit: 3.0 },
    { id: "sweet-potato-medium", name: "Patate douce moyenne", unit: "pièce", fiberPerUnit: 5.3 },
    { id: "sweet-potato-large", name: "Patate douce grosse", unit: "pièce", fiberPerUnit: 7.5 },
    { id: "pear-piece", name: "Poire", unit: "pièce", fiberPerUnit: 5.5 },
    { id: "leek-small", name: "Poireau petit", unit: "pièce", fiberPerUnit: 1.4 },
    { id: "leek-medium", name: "Poireau moyen", unit: "pièce", fiberPerUnit: 2.3 },
    { id: "leek-large", name: "Poireau gros", unit: "pièce", fiberPerUnit: 3.6 },
    { id: "chickpeas-100g", name: "Pois chiches", unit: "100g", fiberPerUnit: 7.6 },
    { id: "apple-piece", name: "Pomme", unit: "pièce", fiberPerUnit: 4.4 },
    { id: "white-rice-100g", name: "Riz blanc (cuit)", unit: "100g", fiberPerUnit: 0.4 },
    { id: "brown-rice-100g", name: "Riz complet (cuit)", unit: "100g", fiberPerUnit: 1.8 },
];
