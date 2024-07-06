import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/pipes/zodValidationPipe';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

const createEquipmentBodySchema = z.object({
  equipmentId: z.string(),
});

type CreateEquipmentBodySchema = z.infer<typeof createEquipmentBodySchema>;

@ApiTags('Equipment')
@Controller('equipments')
export class CreateEquipmentController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createEquipmentBodySchema))
  @ApiOperation({ summary: 'Create new equipment' })
  @ApiBody({
    type: Object,
    description: 'Equipment data',
    examples: {
      ex01: {
        summary: 'Create new equipment',
        description: 'Create new equipment with id "EQ-123"',
        value: {
          equipmentId: 'EQ-123',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Equipment created successfully.' })
  async handle(@Body() body: CreateEquipmentBodySchema) {
    const { equipmentId } = body;

    if (!equipmentId.startsWith('EQ-')) {
      throw new ConflictException('Equipment id must start with "EQ-"');
    }

    const equipmentWithCode = await this.prisma.equipment.findUnique({
      where: {
        equipmentId,
      },
    });

    if (equipmentWithCode) {
      throw new ConflictException('Equipment with same id already exists.');
    }

    const createdEquipment = await this.prisma.equipment.create({
      data: {
        equipmentId,
      },
    });

    return createdEquipment;
  }
}
