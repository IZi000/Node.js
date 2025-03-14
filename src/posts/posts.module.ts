import { Module } from "@nestjs/common"
import { PostService } from "./posts.service"
import { PostController } from "./posts.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Post } from "./posts.entity"
import { UsersModule } from "src/users/users.module"

@Module({
    imports:[
        TypeOrmModule.forFeature([Post]) , UsersModule
    ],
    providers:[PostService],
    controllers:[PostController],
    exports:[PostService]
})

export class PostModule {}
