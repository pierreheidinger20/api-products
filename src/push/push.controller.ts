import { Body, Controller, Param, Post } from '@nestjs/common';
import { PushCredentialsDto } from './push.credentials.dto';
import { PushSendNotificationDto } from './push.send.notification.dto';
import { PushService } from './push.service';

@Controller({
  version: '1',
})
export class PushController {
  constructor(private pushService: PushService) {}
  @Post('/send/notification/user/:identifier')
  async send(
    @Param() params,
    @Body() pushSendNotificationDto: PushSendNotificationDto,
  ) {
    return this.pushService.sendNotification(
      params.identifier,
      pushSendNotificationDto,
    );
  }

  @Post('save/subscription')
  async saveCredentials(@Body() pushCredentialsDto: PushCredentialsDto) {
    this.pushService.saveCredential(pushCredentialsDto);
  }
}
