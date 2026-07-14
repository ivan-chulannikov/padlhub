import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsIn, IsOptional, Matches } from 'class-validator';
import { stationNames, trainingTypes } from '../trainings.constants';

export class ListTrainingsQueryDto {
  @ApiPropertyOptional({
    description: 'Станция проведения тренировки',
    enum: stationNames,
    example: 'Нагатинская',
  })
  @IsOptional()
  @IsIn(stationNames)
  station?: (typeof stationNames)[number];

  @ApiPropertyOptional({
    description: 'Тип игры',
    enum: trainingTypes,
    example: 'Американо',
  })
  @IsOptional()
  @IsIn(trainingTypes)
  type?: (typeof trainingTypes)[number];

  @ApiPropertyOptional({
    description: 'Дата тренировки в формате YYYY-MM-DD',
    example: '2026-07-14',
  })
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must have YYYY-MM-DD format',
  })
  @IsDateString(
    { strict: true },
    { message: 'date must contain a valid calendar date' },
  )
  date?: string;
}
