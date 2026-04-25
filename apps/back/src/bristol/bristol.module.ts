import { Module } from "@nestjs/common";
import { BristolResolver } from "./bristol.resolver";
import { BristolService } from "./bristol.service";

@Module({
    providers: [BristolResolver, BristolService],
})
export class BristolModule {}
