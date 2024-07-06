import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatisticsService } from 'src/services/statistic.service';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('equipment')
  @ApiOperation({ summary: 'Get equipment Statictics by ID' })
  @ApiResponse({ status: 200, description: 'Return all equipment statictics.' })
  async getStatisticsByEquipmentId(@Query('equipmentId') equipmentId: string): Promise<any[]> {
    return await this.statisticsService.getStatisticsByEquipmentId(equipmentId);
  }
}
