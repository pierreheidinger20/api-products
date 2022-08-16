import { ConsoleLogger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import {
  CommonFeaturesModule,
  JwtAuthGuard,
  RolesGuard,
  Config,
} from 'common-features';
import { Database } from './configuration/interfaces/database';
import { PushModule } from './push/push.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dataBaseConfig = configService.get<Database>('database');
        const uri = `mongodb+srv://${dataBaseConfig.user}:${dataBaseConfig.password}@${dataBaseConfig.server}/${dataBaseConfig.database}?retryWrites=true&w=majority`;
        return { uri };
      },
      inject: [ConfigService],
    }),
    PushModule,
    RouterModule.register([
      {
        path: 'push',
        module: PushModule,
      },
    ]),
    CommonFeaturesModule,
  ],
  controllers: [],
  providers: [
    ConsoleLogger,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
