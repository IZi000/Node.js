import { Body, Controller, Get, Post } from "@nestjs/common";
import { createPostDto } from "./dto/create-post.dto";
import { PostService } from "./posts.service";

@Controller("posts")
export class PostController{

    constructor(private postsService: PostService
    ){}

    @Post()
    createPost(@Body() post: createPostDto){
        return this.postsService.createPOst(post);
    }

    @Get()
    getPosts(){
        return this.postsService.getPost() 
    }


}