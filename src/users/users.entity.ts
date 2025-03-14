import {Entity,Column , PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany  }  from "typeorm";
import { Profile } from "./profile.entity";
import { Post } from "src/posts/posts.entity";

@Entity({ name:"users", schema:'ADAM'})

export class User {
    //Llave primaria autoincremental.
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({unique:true}) // username debe ser único
    username: string

    @Column()
    password: string

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // tipo de dato tiempo
    createdAt: Date;

    @Column({ unique:true , nullable: false})
    email: string

    @Column({default:'user'})
    role: string
    
    @Column({nullable:true}) //por defecto true
    authStrategy: string

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile

    @OneToMany(()=> Post, post => post.author)
    posts: Post[]

    
}