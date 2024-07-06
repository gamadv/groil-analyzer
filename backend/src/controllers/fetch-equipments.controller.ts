import { ConflictException, Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Equipment')
@Controller('equipments')
export class FetchEquipmentsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @ApiOperation({ summary: 'Get all equipment' })
  @ApiResponse({ status: 200, description: 'Return all equipment.' })
  findAll() {
    return this.prisma.equipment.findMany({
      include: {
        readings: true,
      },
    });
  }

  @Get(':equipmentId')
  @ApiOperation({ summary: 'Get equipment by ID' })
  @ApiResponse({ status: 200, description: 'Return equipment by ID.' })
  @ApiResponse({ status: 404, description: 'Equipment not found.' })
  async findOne(@Param('equipmentId') equipmentId: string) {
    const equipmentWithCode = await this.prisma.equipment.findUnique({
      where: {
        equipmentId,
      },
      include: {
        readings: true,
      },
    });

    if (!equipmentWithCode) {
      throw new ConflictException(`Equipment ${equipmentId} not found`);
    }

    return this.prisma.equipment.findUnique({
      where: { equipmentId },
      include: {
        readings: true,
      },
    });
  }
}
