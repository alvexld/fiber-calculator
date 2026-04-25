import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import type { CreateBristol } from "@fc/shared";
import { BristolService } from "./bristol.service";

@Resolver()
export class BristolResolver {
    constructor(private readonly bristolService: BristolService) {}

    @Query("bristols")
    findAll(@Args("input") input?: { page?: number; perPage?: number }) {
        return this.bristolService.findAll(input?.page, input?.perPage);
    }

    @Mutation("createBristol")
    create(@Args("input") input: CreateBristol) {
        return this.bristolService.create(input);
    }

    @Mutation("deleteBristol")
    async remove(@Args("input") { id }: { id: string }): Promise<boolean> {
        await this.bristolService.remove(id);
        return true;
    }
}
