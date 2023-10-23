import { NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
export declare class CheckUserRoleMiddleware implements NestMiddleware {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    use(req: Request, res: Response, next: NextFunction): Promise<void | Response<any, Record<string, any>>>;
}
