import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const equipment1 = await prisma.equipment.create({
    data: {
      equipmentId: 'EQ-0000',
    },
  });

  const equipment2 = await prisma.equipment.create({
    data: {
      equipmentId: 'EQ-0001',
    },
  });
  const equipment3 = await prisma.equipment.create({
    data: {
      equipmentId: 'EQ-0003',
    },
  });

  await prisma.sensorReading.createMany({
    data: [
      {
        equipmentId: equipment1.equipmentId,
        timestamp: new Date(),
        value: 10.5,
      },
      {
        equipmentId: equipment1.equipmentId,
        timestamp: new Date('2022-01-01'),
        value: 15.2,
      },
      {
        equipmentId: equipment1.equipmentId,
        timestamp: new Date(),
        value: 20.8,
      },
      {
        equipmentId: equipment1.equipmentId,
        timestamp: new Date(),
        value: 20.8,
      },
    ],
  });

  await prisma.sensorReading.createMany({
    data: [
      {
        equipmentId: equipment2.equipmentId,
        timestamp: new Date(),
        value: 5.7,
      },
      {
        equipmentId: equipment2.equipmentId,
        timestamp: new Date(),
        value: 12.3,
      },
      {
        equipmentId: equipment2.equipmentId,
        timestamp: new Date(),
        value: 18.9,
      },
    ],
  });
  await prisma.sensorReading.createMany({
    data: [
      {
        equipmentId: equipment3.equipmentId,
        timestamp: new Date(),
        value: 5.7,
      },
      {
        equipmentId: equipment3.equipmentId,
        timestamp: new Date(),
        value: 12.3,
      },
      {
        equipmentId: equipment3.equipmentId,
        timestamp: new Date(),
        value: 18.9,
      },
    ],
  });

  console.log('Seeds have been successfully executed.');
}

main()
  .catch((error) => {
    console.error('Error executing seeds:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
