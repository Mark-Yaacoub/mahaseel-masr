import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtPayloadUser } from './auth.model';
import * as dotenv from 'dotenv';

dotenv.config()
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,  

    });
  }

  async validate(payload: jwtPayloadUser) {
    return { userId: payload.userId, email: payload.email, userRole: payload.userRole };
}

}
