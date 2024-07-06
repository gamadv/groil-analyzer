import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from 'src/services/statistic.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('equipment')
  async getStatisticsByEquipmentId(@Query('equipmentId') equipmentId: string): Promise<any[]> {
    return await this.statisticsService.getStatisticsByEquipmentId(equipmentId);
  }
}
