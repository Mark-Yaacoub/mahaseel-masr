import { jwtPayloadUser } from './auth.model';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: jwtPayloadUser): Promise<{
        userId: string;
        email: string;
        userRole: number;
    }>;
}
export {};
