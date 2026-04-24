import { Module } from "@nestjs/common";
import { BristolController } from "./bristol.controller";
import { BristolService } from "./bristol.service";

@Module({
    controllers: [BristolController],
    providers: [BristolService],
})
export class BristolModule {}
