import { JwtModuleOptions,JwtModuleAsyncOptions } from "@nestjs/jwt"
import { globalKeyVariables } from "./env.config"

export const jwtConfigAsync:JwtModuleAsyncOptions ={
    useFactory: async ():Promise<any>=>{     
        return{
            secret:globalKeyVariables().JWT_KEY,
            signOptions:{expiresIn:globalKeyVariables().AUTH_EXPIRY}
     }
    }
}
         
        


  

  


//  entities:[__dirname + '/../**/*.entity[.ts,.js]'],


/**
 *    
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'quiz',
  entities: [Questions,Quiz,Options],
  synchronize: true,
 */
