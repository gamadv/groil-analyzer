import { ConflictException, Controller, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';

@ApiTags('Equipment')
@Controller('equipments')
export class RemoveEquipmentController {
  constructor(private prisma: PrismaService) {}

  @Delete(':equipmentId')
  @ApiOperation({ summary: 'Delete equipment by ID' })
  @ApiResponse({ status: 200, description: 'Equipment deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Equipment not found.' })
  async handle(@Param('equipmentId') equipmentId: string) {
    if (!equipmentId.startsWith('EQ-')) {
      throw new ConflictException('Equipment id must start with "EQ-"');
    }
    const equipmentWithCode = await this.prisma.equipment.findUnique({
      where: {
        equipmentId,
      },
    });

    if (!equipmentWithCode) {
      throw new ConflictException(`Equipment ${equipmentId} id not found`);
    }

    const equipmentReadings = await this.prisma.sensorReading.findMany({
      where: {
        equipmentId,
      },
    });

    if (equipmentReadings.length > 0) {
      throw new ConflictException('Equipment has readings, cannot be deleted');
    }
    const deletedEquipment = await this.prisma.equipment.delete({
      where: {
        equipmentId,
      },
    });

    return deletedEquipment;
  }
}
