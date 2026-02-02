import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

type JwtPayload = {
    sub: string;
    email?: string;
    role?: string;
    aud?: string | string[];
    iss?: string;
    };

    @Injectable()
    export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        const issuer = process.env.SUPABASE_JWT_ISSUER;
        if (!issuer) throw new Error('SUPABASE_JWT_ISSUER is missing');

        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        issuer,
        algorithms: ['RS256'],
        secretOrKeyProvider: passportJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 10,
            jwksUri: `${issuer}/.well-known/jwks.json`,
        }),
        });
    }

    validate(payload: JwtPayload) {
        const admins = (process.env.ADMIN_EMAILS ?? '')
        .split(',')
        .map(s => s.trim().toLowerCase())
        .filter(Boolean);

        const email = (payload.email ?? '').toLowerCase();
        if (!email || !admins.includes(email)) {
        throw new UnauthorizedException('Not an admin');
        }

        // lo que retornás acá queda en req.user
        return { sub: payload.sub, email };
    }
}
