import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ListTrainingsQueryDto } from './dto/list-trainings-query.dto';
import { Training } from './schemas/training.schema';
import { TrainingsService } from './trainings.service';

@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}

  @Get()
  findAll(@Query() query: ListTrainingsQueryDto): Promise<Training[]> {
    return this.trainingsService.findAll(query);
  }

  @Get('stations')
  findStations(): Promise<string[]> {
    return this.trainingsService.findStations();
  }

  @Get('types')
  findTypes(): Promise<string[]> {
    return this.trainingsService.findTypes();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Training> {
    return this.trainingsService.findOne(id);
  }
}
