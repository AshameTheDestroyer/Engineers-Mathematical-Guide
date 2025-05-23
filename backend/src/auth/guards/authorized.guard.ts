import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { AuthenticationRequest } from "src/types/AuthenticationRequest";
import { ObjectId } from "typeorm";

export type jwtPayload = { userId: string; username: string };

@Injectable()
export class AuthorizedGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: AuthenticationRequest = context
            .switchToHttp()
            .getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload: jwtPayload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: this.configService.get<string>("JWT_SECRET"),
                }
            );

            // We're assigning the payload to the request object here
            request.userId = new ObjectId(payload.userId);
            request.username = payload.username;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(
        request: AuthenticationRequest
    ): string | undefined {
        const [type, token] = request.headers.authorization?.split(":") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
