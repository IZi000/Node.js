import { User } from "src/users/users.entity"
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm"


@Entity({ name:"posts", schema:'ADAM'})
export class Post {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title:string
    @Column()
    content:string  

    @Column()
    authorId : number 

    @ManyToOne(() => User, user => user.posts)
    author: User
    //authorid}

}