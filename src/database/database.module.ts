import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  MARIADB_DATABASE,
  MARIADB_HOST,
  MARIADB_PASSWORD,
  MARIADB_PORT,
  MARIADB_USER,
} from './database.constant';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: MARIADB_HOST,
      port: MARIADB_PORT,
      username: MARIADB_USER,
      password: MARIADB_PASSWORD,
      database: MARIADB_DATABASE,
      entities: [],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
