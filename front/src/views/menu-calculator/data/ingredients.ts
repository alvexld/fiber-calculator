export type Ingredient = {
  id: string
  name: string
  unit: string
  fiberPerUnit: number // grams of fiber per 1 unit
}

export const INGREDIENTS: Ingredient[] = [
  { id: 'garlic-100g', name: 'Ail', unit: '100g', fiberPerUnit: 2.1 },
  { id: 'almonds-30g', name: 'Amandes', unit: 'poignée (30g)', fiberPerUnit: 3.5 },
  { id: 'avocado-half', name: 'Avocat', unit: 'demi', fiberPerUnit: 5.0 },
  { id: 'banana-piece', name: 'Banane', unit: 'pièce', fiberPerUnit: 3.1 },
  { id: 'broccoli-100g', name: 'Brocoli', unit: '100g', fiberPerUnit: 2.6 },
  { id: 'carrot-100g', name: 'Carotte', unit: '100g', fiberPerUnit: 2.8 },
  { id: 'spinach-raw-100g', name: 'Épinards crus', unit: '100g', fiberPerUnit: 2.2 },
  { id: 'oats-100g', name: "Flocons d'avoine", unit: '100g', fiberPerUnit: 10.1 },
  { id: 'wheat-germ-tbsp', name: 'Germes de blé', unit: 'c. à soupe', fiberPerUnit: 1.3 },
  { id: 'chia-seeds-tbsp', name: 'Graines de chia', unit: 'c. à soupe', fiberPerUnit: 4.0 },
  { id: 'flaxseeds-tbsp', name: 'Graines de lin moulues', unit: 'c. à soupe', fiberPerUnit: 1.9 },
  { id: 'black-beans-100g', name: 'Haricots noirs', unit: '100g', fiberPerUnit: 8.7 },
  { id: 'kidney-beans-100g', name: 'Haricots rouges', unit: '100g', fiberPerUnit: 6.4 },
  { id: 'lentils-100g', name: 'Lentilles', unit: '100g', fiberPerUnit: 7.9 },
  { id: 'brewer-yeast-tbsp', name: 'Levure de bière', unit: 'c. à soupe', fiberPerUnit: 0.5 },
  { id: 'onion-100g', name: 'Oignons', unit: '100g', fiberPerUnit: 1.7 },
  { id: 'whole-wheat-bread-slice', name: 'Pain complet', unit: 'tranche', fiberPerUnit: 1.9 },
  { id: 'sweet-potato-100g', name: 'Patate douce', unit: '100g', fiberPerUnit: 3.0 },
  { id: 'pear-piece', name: 'Poire', unit: 'pièce', fiberPerUnit: 5.5 },
  { id: 'leek-100g', name: 'Poireaux', unit: '100g', fiberPerUnit: 1.8 },
  { id: 'chickpeas-100g', name: 'Pois chiches', unit: '100g', fiberPerUnit: 7.6 },
  { id: 'apple-piece', name: 'Pomme', unit: 'pièce', fiberPerUnit: 4.4 },
  { id: 'white-rice-100g', name: 'Riz blanc (cuit)', unit: '100g', fiberPerUnit: 0.4 },
  { id: 'brown-rice-100g', name: 'Riz complet (cuit)', unit: '100g', fiberPerUnit: 1.8 },
]
