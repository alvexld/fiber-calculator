import { Injectable } from '@nestjs/common'
import type { CreateIngredient } from '@fc/shared'
import { PrismaService } from '../prisma.service'

@Injectable()
export class IngredientsService {
    constructor(private readonly prisma: PrismaService) {}

    findAll(search?: string) {
        return this.prisma.ingredient.findMany({
            where: search ? { name: { contains: search } } : undefined,
            orderBy: { name: 'asc' },
        })
    }

    create(data: CreateIngredient) {
        return this.prisma.ingredient.create({ data })
    }

    update(id: string, data: CreateIngredient) {
        return this.prisma.ingredient.update({ where: { id }, data })
    }

    async remove(id: string) {
        await this.prisma.ingredient.delete({ where: { id } })
    }
}
