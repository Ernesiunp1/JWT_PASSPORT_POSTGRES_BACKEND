import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';




@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    
    AuthModule,

   ConfigModule.forRoot({
    isGlobal: true,
   }),
  
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      

    }),

    JwtModule
  
  ],
})
export class AppModule {}
