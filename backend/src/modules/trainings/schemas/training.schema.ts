import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { stationNames, trainingTypes } from '../trainings.constants';

export type TrainingDocument = HydratedDocument<Training>;

@Schema({ versionKey: false })
export class Training {
  @Prop({ required: true, unique: true, index: true })
  id: number;

  @Prop({ required: true, match: /^\d{4}-\d{2}-\d{2}$/, index: true })
  date: string;

  @Prop({ required: true, match: /^\d{2}:\d{2}$/ })
  time: string;

  @Prop({ required: true })
  title: string;

  @Prop({
    required: true,
    enum: stationNames,
    index: true,
  })
  station: string;

  @Prop({ required: true, enum: trainingTypes, index: true })
  type: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  coach: string;

  @Prop({ required: true, min: 1 })
  duration: number;

  @Prop({ required: true, min: 0 })
  spotsLeft: number;

  @Prop({ required: true, min: 1 })
  spotsTotal: number;

  @Prop({ required: true })
  court: string;
}

export const TrainingSchema = SchemaFactory.createForClass(Training);
