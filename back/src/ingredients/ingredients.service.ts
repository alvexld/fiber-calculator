import { Injectable } from '@nestjs/common'
import type { CreateIngredient } from '@fc/shared'
import { PrismaService } from '../prisma.service'

const normalizeForSearch = (str: string) =>
    str.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

@Injectable()
export class IngredientsService {
    constructor(private readonly prisma: PrismaService) {}

    findAll(search?: string) {
        return this.prisma.ingredient.findMany({
            where: search
                ? { nameSearch: { contains: normalizeForSearch(search) } }
                : undefined,
            orderBy: { name: 'asc' },
        })
    }

    create(data: CreateIngredient) {
        return this.prisma.ingredient.create({
            data: { ...data, nameSearch: normalizeForSearch(data.name) },
        })
    }

    update(id: string, data: CreateIngredient) {
        return this.prisma.ingredient.update({
            where: { id },
            data: { ...data, nameSearch: normalizeForSearch(data.name) },
        })
    }

    async remove(id: string) {
        await this.prisma.ingredient.delete({ where: { id } })
    }
}
