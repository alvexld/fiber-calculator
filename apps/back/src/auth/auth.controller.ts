import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UnauthorizedException,
} from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import type { Request, Response } from "express";
import { createZodDto } from "nestjs-zod";
import { z } from "zod";
import { AuthService } from "./auth.service";
import { Public } from "./public.decorator";

const LoginSchema = z.object({
    username: z.string().min(1).max(128),
    password: z.string().min(1).max(256),
});

class LoginDto extends createZodDto(LoginSchema) {}

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post("login")
    @HttpCode(HttpStatus.OK)
    @Throttle({ default: { limit: 5, ttl: 60_000 } })
    async login(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response) {
        const valid = await this.authService.validateCredentials(body.username, body.password);
        if (!valid) throw new UnauthorizedException("Invalid credentials");

        const token = this.authService.generateToken(body.username);
        const isProduction = process.env.NODE_ENV !== "development";

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return { message: "Logged in" };
    }

    @Public()
    @Post("logout")
    @HttpCode(HttpStatus.OK)
    logout(@Res({ passthrough: true }) res: Response) {
        const isProduction = process.env.NODE_ENV !== "development";
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            path: "/",
        });
        return { message: "Logged out" };
    }

    @Get("me")
    me(@Req() req: Request) {
        return { username: (req.user as { username: string }).username };
    }
}
