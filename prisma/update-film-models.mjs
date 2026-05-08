import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PRODUCTS_DATA = [
  // 1. Transparent High-Barrier Films (AlOx)
  {
    oldName: "Transparent High-Barrier PET-AlOx Film (Boilable)",
    name: "Transparent High-Barrier PET-AlOx Film (Boilable) - PET-AlOx-010",
  },
  {
    oldName: "Transparent High-Barrier PET-AlOx Film (General Purpose)",
    name: "Transparent High-Barrier PET-AlOx Film (General Purpose) - PET-AlOx-020",
  },
  {
    oldName: "Transparent High-Barrier PET-AlOx Film (Excellent Printability)",
    name: "Transparent High-Barrier PET-AlOx Film (Printable) - PET-AlOx-T",
  },
  {
    oldName: "Transparent High-Barrier PET-AlOx Film (Retortable)",
    name: "Transparent High-Barrier PET-AlOx Film (Retortable) - PET-AlOx-TZ",
  },
  {
    oldName: "Transparent High-Barrier PET-AlOx Film (Freshness & Aroma Retention)",
    name: "Transparent High-Barrier PET-AlOx Film (Aroma Retentive) - PET-AlOx-D01",
  },
  {
    oldName: "Ultra-High Barrier Transparent PET-AlOx Film (Retortable)",
    name: "Ultra-High Barrier Transparent PET-AlOx Film (Retortable) - PET-AlOx-DTZ",
  },

  // 2. Metallized Films (VMPET/VMCPP)
  {
    oldName: "Strip/Window Metallized PET Film (VMPET)",
    name: "Strip/Window Metallized PET Film - VMPET",
  },
  {
    oldName: "Electronic Grade Metallized PET Film (VMPET-DZ)",
    name: "Electronic Grade Metallized PET Film - VMPET-DZ",
  },
  {
    oldName: "Reflective Metallized PET Film (VMPET)",
    name: "Reflective Metallized PET Film - VMPET",
  },
  {
    oldName: "Twist Metallized PET Film (VPET-NJ)",
    name: "Twist Metallized PET Film - VPET-NJ",
  },
  {
    oldName: "Brushed Metallized PET Film (VMPET)",
    name: "Brushed Metallized PET Film - VMPET (Brushed)",
  },
  {
    oldName: "Copper Metallized PET Film (VMPET-Cu)",
    name: "Copper Metallized PET Film - VMPET-Cu",
  },
  {
    oldName: "Slit Metallized PET Film (VPET)",
    name: "Slit Metallized PET Film - VPET",
  },
  {
    oldName: "Chemically Enhanced Metallized PET Film (VMPET-JQ)",
    name: "Chemically Enhanced Metallized PET Film - VMPET-JQ",
  },
  {
    oldName: "High-Barrier Metallized PET Film (VMPET-GZ)",
    name: "High-Barrier Metallized PET Film - VMPET-GZ",
  },
  {
    oldName: "High-Adhesion Metallized PET Film (VMPET-GF)",
    name: "High-Adhesion Metallized PET Film - VMPET-GF",
  },
  {
    oldName: "Ultra-High Barrier Metallized BOPP Film (VMBOPP-GZ)",
    name: "Ultra-High Barrier Metallized BOPP Film - VMBOPP-GZ",
  },
  {
    oldName: "Double-Sided High-Adhesion Metallized PET Film (VMPET-GF02)",
    name: "Double-Sided High-Adhesion Metallized PET Film - VMPET-GF02",
  },
  {
    oldName: "High-Adhesion Metallized BOPP Film (BOPP-GF02)",
    name: "High-Adhesion Metallized BOPP Film - BOPP-GF02",
  },
  {
    oldName: "Aluminum Silver Paste Metallized PET Film",
    name: "Aluminum Silver Paste Metallized PET Film - VMPET",
  },
  {
    oldName: "Nickel Metallized PET Film",
    name: "Nickel Metallized PET Film - VMPET-Ni",
  },
  {
    oldName: "Metallized CPP Film (VMCPP)",
    name: "Metallized CPP Film - VMCPP",
  },
  {
    oldName: "Metallized PE Film (VMPE)",
    name: "Metallized PE Film - VMPE",
  },
  {
    oldName: "Metallized PVC Film (VMPVC)",
    name: "Metallized PVC Film - VMPVC",
  },
  {
    oldName: "Metallized BOPA/Nylon Film (VMBOPA)",
    name: "Metallized BOPA/Nylon Film - VMBOPA",
  },
  {
    oldName: "Metallized Non-Woven Fabric",
    name: "Metallized Non-Woven Fabric",
  },
  {
    oldName: "Single-Sided Matte Metallized PET Film",
    name: "Single-Sided Matte Metallized PET Film - VMPET (Matte)",
  },
  {
    oldName: "Matte Metallized PET Film (VPET-YGD)",
    name: "Matte Metallized PET Film - VPET-YGD-B/H",
  },
  {
    oldName: "High-Gloss Metallized PET Film (VMPET-GL)",
    name: "High-Gloss Metallized PET Film - VMPET-GL",
  },
  {
    oldName: "High-Barrier Metallized Paper",
    name: "High-Barrier Metallized Paper",
  },

  // 3. Specialty & Functional Films
  {
    oldName: "Matte Film (YG/YGD)",
    name: "Matte PET Film - YG/YGD",
  },
  {
    oldName: "General Purpose PET Film (PET-TY)",
    name: "General Purpose PET Film - PET-TY",
  },
  {
    oldName: "PET Twist Film",
    name: "Twist PET Film - PET-NJ",
  },
  {
    oldName: "Black PET Film",
    name: "Black PET Film - PET-Black",
  },
  {
    oldName: "Anti-Explosion / Window Film (VMPET)",
    name: "Anti-Explosion / Window Film - VMPET",
  },
  {
    oldName: "White PET Film",
    name: "White PET Film - PET-White",
  },
  {
    oldName: "Hot Stamping / Thermal Transfer PET Film (PET-HP)",
    name: "Hot Stamping / Thermal Transfer PET Film - PET-HP",
  },
  {
    oldName: "Heat Sealable PET Film (PET-RF)",
    name: "Heat Sealable PET Film - PET-RF",
  },
  {
    oldName: "Anti-UV PET Film (PET-KZ)",
    name: "Anti-UV PET Film - PET-KZ",
  },
  {
    oldName: "Anti-Static PET Film (PET-KJ)",
    name: "Anti-Static PET Film - PET-KJ",
  },
  {
    oldName: "Matte PET Film",
    name: "Matte PET Film - PET",
  },
  {
    oldName: "Release PET Film / Silicone Coated PET (PET-LX)",
    name: "Release PET Film / Silicone Coated PET - PET-LX",
  },
  {
    oldName: "High Transparency PET Film (PET-GT)",
    name: "High Transparency PET Film - PET-GT",
  },
  {
    oldName: "MDOPE Film with Water-Based Coating",
    name: "MDOPE Film with Water-Based Coating - MDOPE",
  },
  {
    oldName: "BOPP Film with Water-Based Coating",
    name: "BOPP Film with Water-Based Coating - BOPP",
  },
  {
    oldName: "BOPET Film with Water-Based Coating",
    name: "BOPET Film with Water-Based Coating - BOPET",
  },

  // 4. Recyclable Mono-Materials
  {
    oldName: "Biodegradable PLA-AlOx Film",
    name: "Biodegradable PLA-AlOx Film - PLA-AlOx",
  },
  {
    oldName: "High-Barrier ALOx-BOPP Film (Recyclable Mono-Material)",
    name: "High-Barrier ALOx-BOPP Film (Recyclable) - ALOx-BOPP",
  },
  {
    oldName: "Metallized PLA Film (VMPLA)",
    name: "Metallized PLA Film - VMPLA",
  }
];

async function main() {
  console.log('Updating scraped products with precise model numbers...');

  let updatedCount = 0;
  for (const prod of PRODUCTS_DATA) {
    const existing = await prisma.product.findFirst({
      where: { name: prod.oldName }
    });

    if (existing) {
      await prisma.product.update({
        where: { id: existing.id },
        data: { name: prod.name }
      });
      updatedCount++;
    }
  }

  console.log(`Finished updating ${updatedCount} products with model numbers.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });