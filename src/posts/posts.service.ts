import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { Post } from "./posts.entity";
import { Repository } from "typeorm";
import { createPostDto } from "./dto/create-post.dto";

@Injectable()

export class PostService {

    constructor(
        @InjectRepository(Post) private postsRepository: Repository<Post>,
        private userService: UsersService
    ){}

    async createPOst(post: createPostDto){
        const userFound = await this.userService.getUser(post.authorId)

        if(!userFound){
            return new HttpException("No se encuentra el usuario no existe", HttpStatus.NOT_FOUND) 

        }

        const newPost = this.postsRepository.create(post);
        return this.postsRepository.save(newPost);
    }

    getPost( ){
        return this.postsRepository.find({
            relations: ['author']
        })
    }

    
}