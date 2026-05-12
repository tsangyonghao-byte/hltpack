const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const defaults = {
    homeAboutEyebrowEn: "About HLT Packaging",
    homeAboutTitleLine1En: "Pioneering",
    homeAboutTitleAccentEn: "Flexible",
    homeAboutTitleLine2En: "Packaging Since 2001",
    homeAboutStory1En: "Established in 2001 and located in Shenzhen, China, HAILITONG Packaging has evolved into a global leader in flexible packaging manufacturing. We specialize in engineering premium, sustainable, and high-barrier pouch solutions.",
    homeAboutStory2En: "Equipped with world-class multi-color rotogravure presses, solventless laminators, and advanced pouch-making lines, we deliver uncompromising quality to brands worldwide. Our mission is simple: ",
    homeAboutMissionEn: '"Premium Quality, Customer First".',
    homeAboutCtaEn: "Discover Our Story",
    aboutStoryTagEn: "Our Story",
    aboutStoryTitleEn: "Packaging Solutions That Care About Our Future",
    aboutStoryBody1En: "Established in 2001 and strategically located in Shenzhen (Longgang District), adjacent to Hong Kong, HAILITONG Packaging brings over 31 years of industry experience to the flexible packaging sector. Supported by a team of experienced professional technicians, we have built a solid reputation for delivering stable product quality, reasonable pricing, and rapid delivery.",
    aboutStoryBody2En: "Our state-of-the-art facility is equipped with comprehensive advanced machinery, including film blowing machines, high-speed rotogravure presses, laminating machines, slitting machines, folding machines, food pouch making machines, three-side sealing machines, center sealing machines, R-machines, flat bag machines, slicing machines, and silica gel drying machines. We specialize in producing a wide range of plastic packaging bags, including food bags, aluminum foil bags, foil-clear bags, vacuum bags, high-temperature retort pouches, multi-layer composite bags, anti-static bags, spout pouches, flower sleeves, shaped bags, facial mask bags, zipper stand-up pouches, PE zip-lock bags, high-transparency OPP header bags, automatic packaging roll films, high-transparency flat bags, and handle bags. Guided by our principle: 'Premium Quality, Customer First', we proudly export our solutions to Europe, America, Russia, Japan, and beyond.",
    aboutStoryPrimaryCtaEn: "Explore Our Products",
    aboutStorySecondaryCtaEn: "Get in Touch"
  };

  const existing = await prisma.systemSetting.findUnique({ where: { id: 'global' } });
  if (existing) {
    await prisma.systemSetting.update({
      where: { id: 'global' },
      data: defaults
    });
    console.log('Updated existing global settings');
  } else {
    await prisma.systemSetting.create({
      data: {
        id: 'global',
        ...defaults
      }
    });
    console.log('Created new global settings');
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());