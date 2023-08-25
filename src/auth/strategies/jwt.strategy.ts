import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../entities/user.entity";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Repository } from "typeorm";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy) {

    constructor(
        @InjectRepository( User )
        private readonly userRepository: Repository< User >,

        configService: ConfigService

    ){
        super({
            secretOrKey: configService.get( "JWT_SECRET" ),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false
        })
    }

    async validate( payload: any ): Promise < User >  {

        const { id } = payload.id

        const user = await this.userRepository.findOneBy({ id })

        if (!user) {
            throw new UnauthorizedException( "token invalido")
        }

        if (!user.isActive) {
            throw new UnauthorizedException(" Usuario Invalido")
        }

        return user
    }




} 