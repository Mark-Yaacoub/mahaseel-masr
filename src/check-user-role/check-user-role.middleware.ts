import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { UserRole } from 'src/shared/enum';

@Injectable()
export class CheckUserRoleMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const excludedPaths = ['/auth'];

      if (excludedPaths.some(path => req.url.includes(path))) {
        return next();
      }

      const authorizationHeader = req.headers['authorization'];
      if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          status: '401',
          messageEn: 'Unauthorized',
          messageAr: 'غير مصرح',
        });
      }

      const token = authorizationHeader.split(' ')[1];
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      if (payload.userRole === UserRole.Admin) {
        return next();
      }

      if (payload.userId === req.params.id) {
        return next();
      } else {
        return res.status(401).json({
          status: '401',
          messageEn: 'Unauthorized to perform this action',
          messageAr: ' لا تمتلك صلاحية للدتنفيذ هذا العملية',
        });
      }
      

 


    } catch (error) {
      return res.status(401).json({
        status: '401',
        messageEn: 'Unauthorized',
        messageAr: 'غير مصرح',
      });
    }
  }
}
