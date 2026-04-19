import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common'
import { createZodDto } from 'nestjs-zod'
import { CreateIngredientSchema } from '@fc/shared'
import { IngredientsService } from './ingredients.service'

class CreateIngredientDto extends createZodDto(CreateIngredientSchema) {}

@Controller('ingredients')
export class IngredientsController {
    constructor(private readonly ingredients: IngredientsService) {}

    @Get()
    findAll() {
        return this.ingredients.findAll()
    }

    @Post()
    create(@Body() body: CreateIngredientDto) {
        return this.ingredients.create(body)
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: CreateIngredientDto) {
        return this.ingredients.update(id, body)
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.ingredients.remove(id)
    }
}
