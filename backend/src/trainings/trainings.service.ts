import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ListTrainingsQueryDto } from './dto/list-trainings-query.dto';
import { Training, TrainingDocument } from './schemas/training.schema';
import { trainingSeed } from './trainings.seed';

@Injectable()
export class TrainingsService implements OnModuleInit {
  constructor(
    @InjectModel(Training.name)
    private readonly trainingModel: Model<TrainingDocument>,
  ) {}

  async onModuleInit() {
    const count = await this.trainingModel.estimatedDocumentCount();
    if (count === 0) {
      await this.trainingModel.insertMany(trainingSeed);
    }
  }

  async findAll(query: ListTrainingsQueryDto): Promise<Training[]> {
    const filter: { station?: string; date?: string } = {};

    if (query.station) filter.station = query.station;
    if (query.date) filter.date = query.date;

    return this.trainingModel
      .find(filter)
      .select('-_id')
      .sort({ date: 1, time: 1 })
      .lean<Training[]>()
      .exec();
  }

  async findOne(id: number): Promise<Training> {
    const training = await this.trainingModel
      .findOne({ id })
      .select('-_id')
      .lean<Training>()
      .exec();

    if (!training) {
      throw new NotFoundException(`Training ${id} not found`);
    }

    return training;
  }

  async findStations(): Promise<string[]> {
    return this.trainingModel
      .distinct('station')
      .then((stations) => stations.sort());
  }
}
