import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ListTrainingsQueryDto } from './dto/list-trainings-query.dto';
import { TrainingResponseDto } from './dto/training-response.dto';
import { Training } from './schemas/training.schema';
import { stationNames, trainingTypes } from './trainings.constants';
import { TrainingsService } from './trainings.service';

@ApiTags('Расписание')
@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}

  @Get()
  @ApiOperation({ summary: 'Получить расписание тренировок' })
  @ApiOkResponse({ type: TrainingResponseDto, isArray: true })
  @ApiBadRequestResponse({ description: 'Некорректные параметры фильтрации' })
  findAll(@Query() query: ListTrainingsQueryDto): Promise<Training[]> {
    return this.trainingsService.findAll(query);
  }

  @Get('stations')
  @ApiOperation({ summary: 'Получить доступные станции' })
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: { type: 'string', enum: [...stationNames] },
    },
  })
  findStations(): Promise<string[]> {
    return this.trainingsService.findStations();
  }

  @Get('types')
  @ApiOperation({ summary: 'Получить доступные типы игры' })
  @ApiOkResponse({
    schema: {
      type: 'array',
      items: { type: 'string', enum: [...trainingTypes] },
    },
  })
  findTypes(): Promise<string[]> {
    return this.trainingsService.findTypes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить тренировку по идентификатору' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: TrainingResponseDto })
  @ApiBadRequestResponse({
    description: 'Идентификатор должен быть целым числом',
  })
  @ApiNotFoundResponse({ description: 'Тренировка не найдена' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Training> {
    return this.trainingsService.findOne(id);
  }
}
