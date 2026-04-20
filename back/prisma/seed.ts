import { PrismaClient, Unit } from '@prisma/client'

const prisma = new PrismaClient()

const INGREDIENTS = [
    { id: 'garlic-clove', name: 'Ail (1 gousse)', unit: Unit.PIECE, unitDisplay: 'gousse', fiberPerUnit: 0.1 },
    { id: 'almonds-30g', name: 'Amandes', unit: Unit.PIECE, unitDisplay: 'poignée (30g)', fiberPerUnit: 3.5 },
    { id: 'avocado-half', name: 'Avocat', unit: Unit.PIECE, unitDisplay: 'demi', fiberPerUnit: 5.0 },
    { id: 'banana-piece', name: 'Banane', unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 3.1 },
    { id: 'broccoli-100g', name: 'Brocoli', unit: Unit.HUNDRED_G, unitDisplay: null, fiberPerUnit: 2.6 },
    { id: 'carrot-small', name: 'Carotte petite', unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 1.4 },
    { id: 'carrot-medium', name: 'Carotte moyenne', unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 2.2 },
    { id: 'carrot-large', name: 'Carotte grosse', unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 3.4 },
    { id: 'spinach-raw-100g', name: 'Épinards crus', unit: Unit.HUNDRED_G, unitDisplay: null, fiberPerUnit: 2.2 },
    { id: 'oats-100g', name: "Flocons d'avoine", unit: Unit.HUNDRED_G, unitDisplay: null, fiberPerUnit: 10.1 },
    { id: 'wheat-germ-tbsp', name: 'Germes de blé', unit: Unit.PIECE, unitDisplay: 'c. à soupe', fiberPerUnit: 1.3 },
    { id: 'chia-seeds-tbsp', name: 'Graines de chia', unit: Unit.PIECE, unitDisplay: 'c. à soupe', fiberPerUnit: 4.0 },
    { id: 'flaxseeds-tbsp', name: 'Graines de lin moulues', unit: Unit.PIECE, unitDisplay: 'c. à soupe', fiberPerUnit: 1.9 },
    { id: 'black-beans-100g', name: 'Haricots noirs', unit: Unit.HUNDRED_G, unitDisplay: null, fiberPerUnit: 8.7 },
    { id: 'kidney-beans-100g', name: 'Haricots rouges', unit: Unit.HUNDRED_G, unitDisplay: null, fiberPerUnit: 6.4 },
    { id: 'lentils-100g', name: 'Lentilles', unit: Unit.HUNDRED_G, unitDisplay: null, fiberPerUnit: 7.9 },
    { id: 'brewer-yeast-tbsp', name: 'Levure de bière', unit: Unit.PIECE, unitDisplay: 'c. à soupe', fiberPerUnit: 0.5 },
    { id: 'onion-small', name: 'Oignon petit', unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 1.2 },
    { id: 'onion-medium', name: 'Oignon moyen', unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 1.9 },
    { id: 'onion-large', name: 'Oignon gros', unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 3.0 },
    { id: 'whole-wheat-bread-slice', name: 'Pain complet', unit: Unit.PIECE, unitDisplay: 'tranche', fiberPerUnit: 1.9 },
    { id: 'sweet-potato-small', name: 'Patate douce petite', unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 3.0 },
    { id: 'sweet-potato-medium', name: 'Patate douce moyenne', unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 5.3 },
    { id: 'sweet-potato-large', name: 'Patate douce grosse', unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 7.5 },
    { id: 'pear-piece', name: 'Poire', unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 5.5 },
    { id: 'leek-small', name: 'Poireau petit', unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 1.4 },
    { id: 'leek-medium', name: 'Poireau moyen', unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 2.3 },
    { id: 'leek-large', name: 'Poireau gros', unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 3.6 },
    { id: 'chickpeas-100g', name: 'Pois chiches', unit: Unit.HUNDRED_G, unitDisplay: null, fiberPerUnit: 7.6 },
    { id: 'apple-piece', name: 'Pomme', unit: Unit.PIECE, unitDisplay: null, fiberPerUnit: 4.4 },
    { id: 'white-rice-100g', name: 'Riz blanc (cuit)', unit: Unit.HUNDRED_G, unitDisplay: null, fiberPerUnit: 0.4 },
    { id: 'brown-rice-100g', name: 'Riz complet (cuit)', unit: Unit.HUNDRED_G, unitDisplay: null, fiberPerUnit: 1.8 },
]

async function main() {
    for (const ingredient of INGREDIENTS) {
        await prisma.ingredient.upsert({
            where: { id: ingredient.id },
            update: ingredient,
            create: ingredient,
        })
    }
    console.log(`✓ ${INGREDIENTS.length} ingrédients seedés`)
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
