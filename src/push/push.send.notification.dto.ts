export class PushSendNotificationDto {
  title: string;
  message: string;
  icon: string;
  vibrate: [number];
  dateOfArrival: Date;
  primaryKey: number;
  actions: any;
}
