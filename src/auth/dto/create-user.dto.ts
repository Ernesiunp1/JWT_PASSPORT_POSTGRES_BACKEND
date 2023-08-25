import { IsEmail, IsString , IsNumber, IsBoolean, IsOptional} from "@nestjs/class-validator";
import { Injectable } from "@nestjs/common";



@Injectable()
export class CreateUserDto {

    @IsString()
    name: string;

    @IsString()
    surname: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsNumber()
    telefono: any;

    @IsBoolean()
    @IsOptional()
    isActive: boolean;
    
    @IsOptional()
    @IsBoolean()
    subscribe: boolean







}
