import { TypeOrmModuleOptions, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config/dist';
import { User } from '../modules/users/entities/users.entity';
import { TempEmail } from '../modules/authentication/entities/temp-email.entity';
 
export const typeOrmConfigAsync:TypeOrmModuleAsyncOptions={
  useFactory:async():Promise<TypeOrmModuleOptions>=>{
return{
  ssl:true,
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User,TempEmail],
  synchronize: false,
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
}
  }
}

export const typeOrmConfig:TypeOrmModuleOptions={
  ssl:true,
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User,TempEmail],
autoLoadEntities:true
}



//->url navigate, hypermedia, rest limits