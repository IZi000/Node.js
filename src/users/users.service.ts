import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user-dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './profile.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User> ,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
    ){}

    async createUser(user: CreateUserDto) {
        const userFound = await this.userRepository.findOne({
            where: {
                username: user.username,
            },
        });
    
        if (userFound) {
            throw new HttpException("El usuario ya existe", HttpStatus.CONFLICT);
        }
    
        const newUser = this.userRepository.create({
            ...user,
            password: await bcrypt.hash(user.password, 10), // Asegúrate de encriptar la contraseña
        });
        return this.userRepository.save(newUser);
    }
    

    getUsers (){
        return this.userRepository.find()
    }

    findOneByEmail(email: string){
        return this.userRepository.findOneBy({email})
    }

    async getUser(id: number) {
        const userFound = await this.userRepository.findOne({
            where: {
                id,
            },
        });
    
        if (!userFound) {
            throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
        }
    
        return userFound; 
    }
    

    async deleteUser(id: number){
        const result = await this.userRepository.delete({ id });

        if (result.affected == 0){
            return new HttpException("usuario no encontrado perrillos",HttpStatus.NOT_FOUND)
        }

        return result;
        /*  
        const userFound = await this.userRepository.findOne({
            where:{
                id
            }
        });

        if(!userFound){
            return new HttpException("Usuario no encontrado" , HttpStatus.NOT_FOUND)
        }

        return this.userRepository.delete({ id })
        */

    }

    async updateUser(id: number, user : updateUserDto){
        const userFound = await this.userRepository.findOne({
            where:{
                id
            }
        })

        if(!userFound){
            return new HttpException("Usuario no encontrado" , HttpStatus.NOT_FOUND)
        }
        const updateUser = Object.assign(userFound,user);
        return this.userRepository.save(updateUser)
        //return this.userRepository.update({id}, user)
    }

    async createProfile(id: number, profile: CreateProfileDto){
        const userFound = await this.userRepository.findOne({
            where:{
                id,
            }
        });
        
        if(!userFound){
            return new HttpException("Profile ya eta creado", HttpStatus.NOT_FOUND);
        }

        const newProfile = this.profileRepository.create(profile)
        const saveProfile = await this.profileRepository.save(newProfile)
        
        userFound.profile = saveProfile

        return this.userRepository.save(userFound)
    }

}
