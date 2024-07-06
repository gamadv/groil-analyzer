import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { CreateEquipmentController } from './controllers/create-equipment.controller';
import { FetchEquipmentsController } from './controllers/fetch-equipments.controller';
import { envSchema } from './env';
import { SensorReadingsController } from './controllers/create-sensor-reading.controller';
import { CSVSensorReadingsController } from './controllers/update-sensor-reading.controller';
import { RemoveEquipmentController } from './controllers/remove-equipment.controller';
import { StatisticsModule } from './modules/statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    StatisticsModule
  ],
  controllers: [
    CreateEquipmentController,
    RemoveEquipmentController,
    FetchEquipmentsController,
    SensorReadingsController,
    CSVSensorReadingsController
  ],
  providers: [PrismaService],
})
export class AppModule {}
