import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common'
import { createZodDto } from 'nestjs-zod'
import { SavedMealSchema, UpdateMealSchema } from '@fc/shared'
import { MealsService } from './meals.service'

class SavedMealDto extends createZodDto(SavedMealSchema) {}
class UpdateMealDto extends createZodDto(UpdateMealSchema) {}

@Controller('meals')
export class MealsController {
    constructor(private readonly meals: MealsService) {}

    @Get()
    findAll() {
        return this.meals.findAll()
    }

    @Post()
    create(@Body() body: SavedMealDto) {
        return this.meals.create(body)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: UpdateMealDto) {
        return this.meals.update(id, body)
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.meals.remove(id)
    }
}
