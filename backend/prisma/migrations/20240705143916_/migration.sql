-- DropForeignKey
ALTER TABLE "SensorReading" DROP CONSTRAINT "SensorReading_equipmentId_fkey";

-- AddForeignKey
ALTER TABLE "SensorReading" ADD CONSTRAINT "SensorReading_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("equipmentId") ON DELETE RESTRICT ON UPDATE CASCADE;
