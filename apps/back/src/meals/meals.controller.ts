import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { createZodDto } from "nestjs-zod";
import { CreateMealSchema, UpdateMealSchema } from "@fc/shared";
import { MealsService } from "./meals.service";

class CreateMealDto extends createZodDto(CreateMealSchema) {}
class UpdateMealDto extends createZodDto(UpdateMealSchema) {}

@Controller("meals")
export class MealsController {
    constructor(private readonly meals: MealsService) {}

    @Get()
    findAll() {
        return this.meals.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.meals.findOne(id);
    }

    @Post()
    create(@Body() body: CreateMealDto) {
        return this.meals.create(body);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() body: UpdateMealDto) {
        return this.meals.update(id, body);
    }

    @Delete(":id")
    @HttpCode(204)
    remove(@Param("id") id: string) {
        return this.meals.remove(id);
    }
}
