import { Module } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { MealsController } from './meals.controller'
import { MealsService } from './meals.service'

@Module({
    controllers: [MealsController],
    providers: [MealsService, PrismaService],
})
export class MealsModule {}
