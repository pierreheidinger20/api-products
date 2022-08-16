import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';

export type PushCredentialDocument = PushCredential & Document;

@Schema()
export class PushCredential {
  @Prop({ required: true })
  name: string;
  @Prop({ type: mongoose.Schema.Types.Mixed })
  subscription: any;
}

export const PushCredentialSchema =
  SchemaFactory.createForClass(PushCredential);
