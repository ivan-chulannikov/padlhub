import { IsIn, IsOptional, Matches } from 'class-validator';
import { stationNames, trainingTypes } from '../trainings.constants';

export class ListTrainingsQueryDto {
  @IsOptional()
  @IsIn(stationNames)
  station?: (typeof stationNames)[number];

  @IsOptional()
  @IsIn(trainingTypes)
  type?: (typeof trainingTypes)[number];

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must have YYYY-MM-DD format',
  })
  date?: string;
}
