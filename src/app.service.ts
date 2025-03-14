import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from './users/users.entity';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private readonly connection: User) {}

  async checkConnection() {
    try {
      return 'Conexión exitosa';
    } catch (error) {
      return `Error de conexión: ${error.message}`;
    }
  }
}
