import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { timingSafeEqual } from "crypto";

@Injectable()
export class AuthService {
    private readonly username: string;
    private readonly passwordHash: string;

    constructor(
        private readonly jwtService: JwtService,
        configService: ConfigService,
    ) {
        this.username = configService.getOrThrow<string>("AUTH_USERNAME");
        // Hash once at startup for constant-time comparison on each login attempt
        this.passwordHash = bcrypt.hashSync(configService.getOrThrow<string>("AUTH_PASSWORD"), 12);
    }

    async validateCredentials(username: string, password: string): Promise<boolean> {
        const uBuf = Buffer.from(username);
        const expectedBuf = Buffer.from(this.username);
        const usernameMatch =
            uBuf.length === expectedBuf.length && timingSafeEqual(uBuf, expectedBuf);

        // Always run bcrypt compare to prevent timing-based username enumeration
        const passwordMatch = await bcrypt.compare(password, this.passwordHash);

        return usernameMatch && passwordMatch;
    }

    generateToken(username: string): string {
        return this.jwtService.sign({ sub: username, username });
    }
}
