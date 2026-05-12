const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const existing = await prisma.systemSetting.findUnique({where: {id: 'global'}});
  const data = {};
  if (!existing?.aboutHeroImage) data.aboutHeroImage = '/images/factory/印刷车间/10001.png';
  if (!existing?.marketHeroImage) data.marketHeroImage = '/images/factory/制袋车间/10010.png';
  if (!existing?.safetyHeroImage) data.safetyHeroImage = '/images/factory/制袋车间/10002.png';
  if (!existing?.sustainabilityHeroImage) data.sustainabilityHeroImage = '/images/factory/制袋车间/10008.png';
  if (!existing?.factoryHeroImage) data.factoryHeroImage = '/images/factory/印刷车间/10101 (2).png';
  if (!existing?.contactHeroImage) data.contactHeroImage = '/images/factory/制袋车间/10006.png';
  
  if (Object.keys(data).length > 0) {
    await prisma.systemSetting.update({where: {id: 'global'}, data});
    console.log('Updated DB with default images');
  } else {
    console.log('No updates needed');
  }
}
run().catch(console.error).finally(()=>prisma.$disconnect());