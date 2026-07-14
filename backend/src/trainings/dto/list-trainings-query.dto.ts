import { IsIn, IsOptional, Matches } from 'class-validator';

export const stationNames = ['Нагатинская', 'Терехово', 'Ясенево'] as const;

export class ListTrainingsQueryDto {
  @IsOptional()
  @IsIn(stationNames)
  station?: (typeof stationNames)[number];

  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must have YYYY-MM-DD format',
  })
  date?: string;
}
