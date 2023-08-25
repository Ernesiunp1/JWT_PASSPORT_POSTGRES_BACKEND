import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from "./strategies/jwt.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  imports: [
    ConfigModule,

    PassportModule,


    
    TypeOrmModule.forFeature([User]),

    JwtModule.register({

        secret: "EstaEsMiClave",
        signOptions: { expiresIn: "2h"}

      })


  ]
})
export class AuthModule {}
