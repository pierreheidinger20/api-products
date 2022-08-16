import { ConsoleLogger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PushController } from './push.controller';
import { PushCredential, PushCredentialSchema } from './push.credential.entity';
import { PushService } from './push.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PushCredential.name, schema: PushCredentialSchema },
    ]),
  ],
  controllers: [PushController],
  providers: [ConfigService, PushService, ConsoleLogger],
})
export class PushModule {}
