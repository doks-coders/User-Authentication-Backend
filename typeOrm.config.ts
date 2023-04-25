import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { TempEmail } from './src/modules/authentication/entities/temp-email.entity';
import { User } from './src/modules/users/entities/users.entity';

import { $npmConfigName1682163234852 } from './migrations/1682163234852-$npm_config_name';

config();
 
const configService = new ConfigService();
 
 
export default new DataSource({
  ssl:true,
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [User,TempEmail],
  migrations:[$npmConfigName1682163234852]
});


 