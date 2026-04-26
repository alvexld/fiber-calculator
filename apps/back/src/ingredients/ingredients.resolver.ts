import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import type { CreateIngredientInput, UpdateIngredientInput } from "../graphql";
import { IngredientsService } from "./ingredients.service";

@Resolver()
export class IngredientsResolver {
    constructor(private readonly ingredientsService: IngredientsService) {}

    @Query("ingredients")
    findAll(
        @Args("search") search?: string,
        @Args("orderBy") orderBy?: string,
        @Args("page") page?: number,
        @Args("perPage") perPage?: number,
    ) {
        return this.ingredientsService.findAll({
            search,
            orderBy: orderBy as "name" | "usage" | undefined,
            page,
            perPage,
        });
    }

    @Mutation("createIngredient")
    create(@Args("input") input: CreateIngredientInput) {
        return this.ingredientsService.create(input);
    }

    @Mutation("updateIngredient")
    update(@Args("input") { id, ...data }: UpdateIngredientInput) {
        return this.ingredientsService.update(id, data);
    }

    @Mutation("deleteIngredient")
    async remove(@Args("input") { id }: { id: string }): Promise<boolean> {
        await this.ingredientsService.remove(id);
        return true;
    }
}
