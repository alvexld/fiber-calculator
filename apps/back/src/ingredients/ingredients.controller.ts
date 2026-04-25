import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from "@nestjs/common";
import { createZodDto } from "nestjs-zod";
import { CreateIngredientSchema } from "@fc/shared";
import { IngredientsService } from "./ingredients.service";

class CreateIngredientDto extends createZodDto(CreateIngredientSchema) {}

@Controller("ingredients")
export class IngredientsController {
    constructor(private readonly ingredients: IngredientsService) {}

    @Get()
    findAll(
        @Query("search") search?: string,
        @Query("orderBy") orderBy?: string,
        @Query("page") page?: string,
        @Query("perPage") perPage?: string,
    ) {
        return this.ingredients.findAll({
            search,
            orderBy: orderBy === "usage" ? "usage" : "name",
            page: page !== undefined ? parseInt(page, 10) : undefined,
            perPage: perPage !== undefined ? parseInt(perPage, 10) : undefined,
        });
    }

    @Post()
    create(@Body() body: CreateIngredientDto) {
        return this.ingredients.create(body);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() body: CreateIngredientDto) {
        return this.ingredients.update(id, body);
    }

    @Delete(":id")
    @HttpCode(204)
    remove(@Param("id") id: string) {
        return this.ingredients.remove(id);
    }
}
