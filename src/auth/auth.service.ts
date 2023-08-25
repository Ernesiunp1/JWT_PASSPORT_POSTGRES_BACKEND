import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from "bcrypt";
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...restData } = createUserDto;

      const newPassword = bcrypt.hashSync(password, 10);

      const user = this.userRepository.create({
        password: newPassword,
        ...restData,
      });

      const newUser = await this.userRepository.save(user);

      const userData = {
        id: newUser.id,
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
        telefono: newUser.telefono,
      };

      return userData;


    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.detail);
    }
  }


  async login(loginUserDto: LoginUserDto){

    const user = await this.userRepository.findOneBy({email: loginUserDto.email})

    if (user === null || !user || user === undefined) {
      throw new UnauthorizedException("Unauthorized access | email")
      
    }

    const checkPassword = bcrypt.compareSync(loginUserDto.password, user.password )

    if (!checkPassword) {
      throw new UnauthorizedException('Unauthorized | password')
    }

    const payload = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      telefono: user.telefono,
    }
    
    const token = this.getJwt(payload)    

    return {
      user,
      token
    }

  }
  

  async update(id: string, updateUserDto: UpdateUserDto) {
    
    try {
    
      //  SI LA ACTUALIZACION ES DE PASSWORD SE ENCRIPTA ANTES DE ACTUALIZAR
      if (updateUserDto.password) {
       const newPAssword = bcrypt.hashSync(updateUserDto.password, 10)
        updateUserDto.password = newPAssword
      }

      // SE PREPARA EL OBJETO Y SE ACTUALIZA
      const userUp = await this.userRepository.preload({id, ...updateUserDto}) 

       //  SE EVALUA SI ESTA ACTIVO, SI EL ID EXISTE
      if ( userUp === null || !userUp || !userUp.isActive ) {
        throw new NotFoundException("No se hallo el usuario")   
        
        }

      // SI TODO SALE BIEN SE GUARADA EN LA BASE DE DATOS
      const newUser = await this.userRepository.save(userUp)

      // const user = await this.userRepository.findOneBy({ id })
      
      
          return {
            user: newUser,
            
          };

      
    } catch (error) {
      return error
                  
      
    }


  }



  async remove(id: string, updateUserDto: UpdateUserDto) {

    updateUserDto.isActive = false

    const userUp = await this.userRepository.preload({id, ...updateUserDto})   
    
    const removedUser = await this.userRepository.save(userUp)

    return removedUser;
  }





  checkAuthStatus(user: User){
    return {
      ...user,
      token: this.getJwt({   
                              name: user.name,
                              id: user.id,
                              telefono: user.telefono
                            })
    }
  }



  private getJwt( payload: any ){
    const token = this.jwtService.sign( payload)
    return token
  }





  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

}
