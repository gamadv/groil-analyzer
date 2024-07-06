import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StatisticsController } from 'src/controllers/fetch-statistic.controller';
import { StatisticsService } from 'src/services/statistic.service';

@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService, PrismaService],
})
export class StatisticsModule {}
