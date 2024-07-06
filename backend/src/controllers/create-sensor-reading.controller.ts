import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('Sensor Reading')
@Controller('sensor-readings')
export class SensorReadingsController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @ApiOperation({ summary: 'Create new sensor reading' })
  @ApiBody({
    type: Object,
    description: 'Sensor data',
    examples: {
      ex01: {
        summary: 'Create new Sensor',
        description: 'Create new sensor reading with equipment "EQ-123"',
        value: {
          equipmentId: 'EQ-00',
          value: 100
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Sensor created successfully.' })
  async createReading(
    @Body() body: { equipmentId: string; timestamp: string; value: number },
  ) {
    const { equipmentId, value } = body;
    const equipment = await this.prisma.equipment.findUnique({
      where: { equipmentId },
    });

    if (!equipment) {
      throw new ConflictException('Equipment not found');
    }

    const reading = await this.prisma.sensorReading.create({
      data: {
        equipmentId,
        timestamp: new Date(),
        value,
      },
    });

    return reading;
  }
}
