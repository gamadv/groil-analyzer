import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getStatisticsByEquipmentId(equipmentId: string): Promise<any[]> {
    const periods = ['24h', '48h', '1w', '1m', 'all'];

    const currentDate = new Date();
    const startDateMap = {
      '24h': new Date(currentDate.getTime() - 24 * 60 * 60 * 1000),
      '48h': new Date(currentDate.getTime() - 48 * 60 * 60 * 1000),
      '1w': new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000),
      '1m': new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000),
      'all': new Date(0),
    };

    const statisticsPromises = periods.map(async (period) => {
      const startDate = startDateMap[period];

      const readings = await this.prisma.sensorReading.findMany({
        where: {
          equipmentId,
          timestamp: {
            gte: startDate.toISOString(),
          },
        },
        orderBy: {
          timestamp: 'asc',
        },
      });

      const totalValues = readings.reduce((acc, curr) => acc + curr.value!, 0);
      const averageValue = readings.length > 0 ? totalValues / readings.length : 0;

      return {
        period,
        averageValue: Number(averageValue.toFixed(2))
      };
    });

    return await Promise.all(statisticsPromises);
  }
}
