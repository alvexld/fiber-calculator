import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import type { CreateMeal, UpdateMeal } from "@fc/shared";
import { MealsService } from "./meals.service";

@Resolver()
export class MealsResolver {
    constructor(private readonly mealsService: MealsService) {}

    @Query("meals")
    findAll(@Args("input") input?: { page?: number; perPage?: number }) {
        return this.mealsService.findAll(input?.page, input?.perPage);
    }

    @Query("meal")
    findOne(@Args("id") id: string) {
        return this.mealsService.findOne(id);
    }

    @Mutation("createMeal")
    create(@Args("input") input: CreateMeal) {
        return this.mealsService.create(input);
    }

    @Mutation("updateMeal")
    update(@Args("input") { id, ...data }: UpdateMeal & { id: string }) {
        return this.mealsService.update(id, data);
    }

    @Mutation("deleteMeal")
    async remove(@Args("input") { id }: { id: string }): Promise<boolean> {
        await this.mealsService.remove(id);
        return true;
    }
}
