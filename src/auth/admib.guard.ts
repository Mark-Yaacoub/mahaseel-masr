import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; 
    console.log(user);
    
    const requiredRoles = [100]; 

    if (requiredRoles.includes(user.userRole)) {
      return true;
    } else {
      throw new ForbiddenException({
        status: 403,
        messageEn: 'You do not have permission to perform this action.',
        messageAr: 'ليس لديك إذن لتنفيذ هذا الإجراء.',
      });
    }
  }
}
