const { PrismaClient } = require('@prisma/client'); const prisma = new PrismaClient(); prisma.systemSetting.findUnique({where: {id: 'global'}}).then(console.log).finally(()=>prisma.$disconnect());
