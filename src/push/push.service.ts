import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as webPush from 'web-push';
import {
  PushCredential,
  PushCredentialDocument,
} from './push.credential.entity';
import { PushCredentialsDto } from './push.credentials.dto';
import { PushSendNotificationDto } from './push.send.notification.dto';

@Injectable()
export class PushService {
  constructor(
    @InjectModel(PushCredential.name)
    private pushCredentialModel: Model<PushCredentialDocument>,
    private configService: ConfigService,
    private consoleLogger: ConsoleLogger,
  ) {
    this.configPushService();
  }

  async saveCredential(pushCredentialsDto: PushCredentialsDto) {
    const createPushCredential = await new this.pushCredentialModel(
      pushCredentialsDto,
    ).save();
    return await createPushCredential;
  }

  async sendNotification(
    identifier: string,
    pushSendNotificationDto: PushSendNotificationDto,
  ) {
    const pushCredential: PushCredential =
      await this.pushCredentialModel.findOne({ identifier: identifier });

    if (!pushCredential) {
      this.consoleLogger.log(`user ${identifier} no credentials found`);
      return;
    }

    const notificationPayload = {
      notification: {
        title: pushSendNotificationDto.title,
        body: pushSendNotificationDto.message,
        icon: pushSendNotificationDto.icon,
        vibrate: pushSendNotificationDto.vibrate,
        data: pushSendNotificationDto.dateOfArrival,
        actions: pushSendNotificationDto.actions,
      },
    };

    const credential = pushCredential.subscription;

    const sendedMessage = await webPush.sendNotification(
      credential,
      JSON.stringify(notificationPayload),
    );
    return sendedMessage;
  }

  private async configPushService() {
    const configPushService = this.configService.get<any>('push');
    webPush.setVapidDetails(
      `mailto:${configPushService.email}`,
      configPushService.publicKey,
      configPushService.privateKey,
    );
  }
}
