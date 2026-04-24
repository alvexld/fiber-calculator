import { Body, Controller, Delete, Get, HttpCode, Param, Post } from "@nestjs/common";
import { createZodDto } from "nestjs-zod";
import { CreateBristolSchema } from "@fc/shared";
import { BristolService } from "./bristol.service";

class CreateBristolDto extends createZodDto(CreateBristolSchema) {}

@Controller("bristol")
export class BristolController {
    constructor(private readonly bristol: BristolService) {}

    @Get()
    findAll() {
        return this.bristol.findAll();
    }

    @Post()
    create(@Body() body: CreateBristolDto) {
        return this.bristol.create(body);
    }

    @Delete(":id")
    @HttpCode(204)
    remove(@Param("id") id: string) {
        return this.bristol.remove(id);
    }
}
