import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import type { CreateIngredient } from "@fc/shared";
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
    create(@Args("input") input: CreateIngredient) {
        return this.ingredientsService.create(input);
    }

    @Mutation("updateIngredient")
    update(@Args("input") { id, ...data }: CreateIngredient & { id: string }) {
        return this.ingredientsService.update(id, data);
    }

    @Mutation("deleteIngredient")
    async remove(@Args("input") { id }: { id: string }): Promise<boolean> {
        await this.ingredientsService.remove(id);
        return true;
    }
}
