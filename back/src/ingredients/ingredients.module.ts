import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { IngredientsController } from './ingredients.controller'
import { IngredientsService } from './ingredients.service'

@Module({
    controllers: [IngredientsController],
    providers: [IngredientsService, PrismaService],
})
export class IngredientsModule {}
