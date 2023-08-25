import { IsEmail, IsString , IsNumber, IsBoolean, IsOptional} from "@nestjs/class-validator";
import { Injectable } from "@nestjs/common";



@Injectable()
export class LoginUserDto {
   
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    password: string;
    


}
