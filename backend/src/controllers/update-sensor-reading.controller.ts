import {
  BadRequestException,
  ConflictException,
  Controller,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PrismaService } from 'src/prisma/prisma.service';
import { validateHeaders } from 'src/utils/csv-validator';
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiProperty,
} from '@nestjs/swagger';

class UploadCsvDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

@ApiTags('Sensor Reading CSV')
@Controller('csv-sensor-readings')
export class CSVSensorReadingsController {
  constructor(private prisma: PrismaService) {}

  @Patch()
  @ApiOperation({ summary: 'Upload CSV file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'CSV file to upload',
    required: true,
    type: UploadCsvDto,
  })
  @ApiResponse({ status: 201, description: 'CSV file processed successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid CSV file.' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    if (file.mimetype !== 'text/csv') {
      throw new BadRequestException('File must be a CSV file');
    }
    console.log('🚀 ~ file:', file)
    const csvData = file.buffer.toString('utf-8');
    const lines = csvData.split('\n');
    const headers = ['equipmentId', 'timestamp', 'value'];

    if (!validateHeaders(lines[0].split(','), headers)) {
      throw new ConflictException('CSV Headers are invalids');
    }

    const readings = lines.slice(1).map((line) => {
      const [equipmentId, timestamp, value] = line.split(',');
      return {
        equipmentId,
        timestamp: new Date(timestamp),
        value: parseFloat(value),
      };
    });

    for (const reading of readings) {
      const equipment = await this.prisma.equipment.findUnique({
        where: { equipmentId: reading.equipmentId },
      });

      if (!equipment) {
        throw new ConflictException(
          `Equipment with id ${reading.equipmentId} not found`,
        );
      }

      await this.prisma.sensorReading.create({
        data: {
          equipmentId: reading.equipmentId,
          timestamp: reading.timestamp,
          value: reading.value,
        },
      });
    }

    return { message: 'CSV processed successfully' };
  }
}
