import { ApiProperty } from '@nestjs/swagger';
import { stationNames, trainingTypes } from '../trainings.constants';

export class TrainingResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: '2026-07-14' })
  date: string;

  @ApiProperty({ example: '19:00' })
  time: string;

  @ApiProperty({ example: 'Первая пробная тренировка' })
  title: string;

  @ApiProperty({ enum: stationNames, example: 'Нагатинская' })
  station: string;

  @ApiProperty({ enum: trainingTypes, example: 'Американо' })
  type: string;

  @ApiProperty({ example: '1-й Нагатинский проезд, 2с17' })
  address: string;

  @ApiProperty({ example: 'Алексей Морозов' })
  coach: string;

  @ApiProperty({ example: 60, minimum: 1 })
  duration: number;

  @ApiProperty({ example: 2, minimum: 0 })
  spotsLeft: number;

  @ApiProperty({ example: 4, minimum: 1 })
  spotsTotal: number;

  @ApiProperty({ example: 'Корт 3' })
  court: string;
}
