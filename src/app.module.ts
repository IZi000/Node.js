import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { Profile } from './users/profile.entity';
import { Post } from './posts/posts.entity';
import { IngresosModule } from './ingresos/ingresos.module';
import { Ingresos } from './ingresos/ingresos.entity';
import { PeriodosModule } from './periodos/periodos.module';
import { Periodos } from './periodos/periodos.entity';
import { VacacionesModule } from './vacaciones/vacaciones.module';
import { Vacaciones } from './vacaciones/vacaciones.entity';
import { ConsultaModule } from './consulta/consulta.module';
import { Consulta } from './consulta/consulta.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type:"oracle",
    host:"10.225.13.9",
    port :1521,
    username:"adam",
    password:"Password2024#",
    serviceName:"ADAM",
    entities:[User,Profile,Post,Ingresos,Periodos,Vacaciones,Consulta],
    synchronize: true
  }),UsersModule, IngresosModule, PeriodosModule, VacacionesModule, ConsultaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
