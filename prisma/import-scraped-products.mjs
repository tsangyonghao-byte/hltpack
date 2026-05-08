import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PRODUCTS_DATA = [
  // 1. Transparent High-Barrier Films (AlOx)
  {
    name: "Transparent High-Barrier PET-AlOx Film (Boilable)",
    categoryName: "Transparent High-Barrier Films (AlOx)",
    features: ["彩龙透明可水煮包装高阻隔聚酯氧化铝镀膜PET-AlOx-010（可水煮）", "Boilable & Heat Stable", "Excellent Oxygen/Moisture Barrier"],
  },
  {
    name: "Transparent High-Barrier PET-AlOx Film (General Purpose)",
    categoryName: "Transparent High-Barrier Films (AlOx)",
    features: ["透明高阻隔聚酯氧化铝镀膜PET-AlOx-020（无涂层通用型）", "High Strength", "Chemical Stability"],
  },
  {
    name: "Transparent High-Barrier PET-AlOx Film (Excellent Printability)",
    categoryName: "Transparent High-Barrier Films (AlOx)",
    features: ["优越印刷性能透明高阻隔聚酯氧化铝镀膜 PET-AlOx-T", "Superior Ink Adhesion", "High Transparency"],
  },
  {
    name: "Transparent High-Barrier PET-AlOx Film (Retortable)",
    categoryName: "Transparent High-Barrier Films (AlOx)",
    features: ["可高温蒸煮透明高阻隔聚酯氧化铝镀膜PET-AlOx-TZ", "High-Temperature Retortable", "Physical Vapor Deposition"],
  },
  {
    name: "Transparent High-Barrier PET-AlOx Film (Freshness & Aroma Retention)",
    categoryName: "Transparent High-Barrier Films (AlOx)",
    features: ["彩龙保鲜更保香透明高阻隔聚酯氧化铝镀膜PET-AlOx-D01（可水煮）", "Aroma Retention", "Food Freshness Extension"],
  },
  {
    name: "Ultra-High Barrier Transparent PET-AlOx Film (Retortable)",
    categoryName: "Transparent High-Barrier Films (AlOx)",
    features: ["彩龙透明超高阻隔聚酯氧化铝镀膜PET-AlOx-DTZ（可蒸煮）", "Ultra-High Barrier", "Retort Pouch Applicable"],
  },

  // 2. Metallized Films (VMPET/VMCPP)
  {
    name: "Strip/Window Metallized PET Film (VMPET)",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["聚酯阴阳镀铝膜 VMPET", "Symmetrical/Asymmetrical Windows", "Clear View Content"],
  },
  {
    name: "Electronic Grade Metallized PET Film (VMPET-DZ)",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["聚酯电子膜系列 VMPET-DZ系列", "Conductive & Anti-Static", "Semi-Transparent Brightness"],
  },
  {
    name: "Reflective Metallized PET Film (VMPET)",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["聚酯镀铝反射膜 VMPET", "Matte/Bright Silver Reflector", "Backlight Applications"],
  },
  {
    name: "Twist Metallized PET Film (VPET-NJ)",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["扭结聚酯镀铝膜 VPET-NJ", "Candy & Biscuit Packaging", "Excellent Rigidity"],
  },
  {
    name: "Brushed Metallized PET Film (VMPET)",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["聚酯拉丝镀铝膜 VMPET (拉丝）", "Mechanical Brushed Texture", "Silver Metallic Finish"],
  },
  {
    name: "Copper Metallized PET Film (VMPET-Cu)",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["聚酯镀铜膜VMPET-Cu", "99.99% Pure Copper Coating", "Advanced PVD Tech"],
  },
  {
    name: "Slit Metallized PET Film (VPET)",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["聚酯镀铝薄膜-VPET切丝膜", "No Pinholes", "High Tensile Strength"],
  },
  {
    name: "Chemically Enhanced Metallized PET Film (VMPET-JQ)",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["化学加强型聚酯镀铝薄膜VMPET-JQ系列", "Chemical Coating", "High Aluminum Adhesion"],
  },
  {
    name: "High-Barrier Metallized PET Film (VMPET-GZ)",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["彩龙高阻隔聚酯镀铝膜系列VMPET-GZ型号", "Foil Replacement", "Lower Cost"],
  },
  {
    name: "High-Adhesion Metallized PET Film (VMPET-GF)",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["高附着力聚酯镀铝膜VMPET-GF系列", "Adhesion ≥ 2.5N/15mm", "High Barrier"],
  },
  {
    name: "Ultra-High Barrier Metallized BOPP Film (VMBOPP-GZ)",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["超高阻隔双向拉伸聚丙烯镀铝膜VMBOPP-GZ", "O2/Moisture Barrier", "Excellent Homogenization"],
  },
  {
    name: "Double-Sided High-Adhesion Metallized PET Film (VMPET-GF02)",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["双面镀高附着力聚酯镀铝膜VMPET-GF02", "Double-Sided Metalization", "Special Flex Packaging"],
  },
  {
    name: "High-Adhesion Metallized BOPP Film (BOPP-GF02)",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["双向拉伸聚丙烯高附着力铝镀膜BOPP-GF02", "FDA/EU/REACH Compliant", "Increase Lamination Strength"],
  },
  {
    name: "Aluminum Silver Paste Metallized PET Film",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["铝银浆聚酯镀铝膜", "Multiple Coating Layers", "Automotive/Paint Industry"],
  },
  {
    name: "Nickel Metallized PET Film",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["PET镀镍膜", "Specialty Coating", "Industrial Use"],
  },
  {
    name: "Metallized CPP Film (VMCPP)",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["聚丙烯镀铝膜 VMCPP", "Low-Temperature Sealing", "Flexible Packaging"],
  },
  {
    name: "Metallized PE Film (VMPE)",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["聚乙烯镀铝膜 VMPE", "Low Gel Count", "Mono-Material PE Packaging"],
  },
  {
    name: "Metallized PVC Film (VMPVC)",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["聚氯乙烯镀铝膜 VMPVC", "Labels & Decoration", "Spices/Food Packaging"],
  },
  {
    name: "Metallized BOPA/Nylon Film (VMBOPA)",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["VMBOPA镀铝膜", "High Strength & Gas Barrier", "Chemical/Pharma Packaging"],
  },
  {
    name: "Metallized Non-Woven Fabric",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["无纺布镀铝", "Thermal Insulation", "UV Blocking & Soft Inner"],
  },
  {
    name: "Single-Sided Matte Metallized PET Film",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["单面哑聚镀铝膜 VMPET (单面哑）", "Cosmetics Packaging", "Soft Touch Premium Look"],
  },
  {
    name: "Matte Metallized PET Film (VPET-YGD)",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["哑光聚酯镀铝膜 VPET-YGD-B/H", "Deep/Light Matte Options", "Premium Hand Feel"],
  },
  {
    name: "High-Gloss Metallized PET Film (VMPET-GL)",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["聚酯高亮镀铝膜 VMPET-GL", "Mirror Effect", "High Reflectivity"],
  },
  {
    name: "High-Barrier Metallized Paper",
    categoryName: "Metallized Films (VMPET/VMCPP)",
    features: ["高阻隔镀铝纸", "New Packaging Material", "Excellent Barrier"],
  },

  // 3. Specialty & Functional Films
  {
    name: "Matte Film (YG/YGD)",
    categoryName: "Specialty & Functional Films",
    features: ["原色亚光膜", "Corona Treated Options", "Special Manufacturing Process"],
  },
  {
    name: "General Purpose PET Film (PET-TY)",
    categoryName: "Specialty & Functional Films",
    features: ["通用型聚酯光膜PET-TY", "Aroma Retention", "Good Stiffness & Tensile Strength"],
  },
  {
    name: "PET Twist Film",
    categoryName: "Specialty & Functional Films",
    features: ["聚酯扭结膜", "Eco-friendly PVC Alternative", "Candy Wrapping"],
  },
  {
    name: "Black PET Film",
    categoryName: "Specialty & Functional Films",
    features: ["黑色聚酯薄膜PET", "Black Raw/Color-coated PET", "Protective & Decoration Use"],
  },
  {
    name: "Anti-Explosion / Window Film (VMPET)",
    categoryName: "Specialty & Functional Films",
    features: ["聚酯防爆膜 VMPET", "UV Protection & Heat Insulation", "Building/Auto Glass"],
  },
  {
    name: "White PET Film",
    categoryName: "Specialty & Functional Films",
    features: ["聚酯薄膜PET-白色(原色膜）", "White Base Material", "High Opacity"],
  },
  {
    name: "Hot Stamping / Thermal Transfer PET Film (PET-HP)",
    categoryName: "Specialty & Functional Films",
    features: ["烫金膜热转移聚酯基膜PET-HP", "Low Heat Shrinkage", "Reusable & Good Peeling"],
  },
  {
    name: "Heat Sealable PET Film (PET-RF)",
    categoryName: "Specialty & Functional Films",
    features: ["热封聚酯膜PET-RF", "Bottle Cap Sealing", "Chemical Resistance"],
  },
  {
    name: "Anti-UV PET Film (PET-KZ)",
    categoryName: "Specialty & Functional Films",
    features: ["抗紫外线聚酯薄膜PET-kz", "99% or 50% UV Blocking", "Architectural Glass Applicable"],
  },
  {
    name: "Anti-Static PET Film (PET-KJ)",
    categoryName: "Specialty & Functional Films",
    features: ["抗静电聚酯膜PET-KJ", "Electronic Packaging", "Industrial/Pharma Use"],
  },
  {
    name: "Matte PET Film",
    categoryName: "Specialty & Functional Films",
    features: ["聚酯哑光光膜PET", "One or Two-sided Frosted", "Premium Print Packaging"],
  },
  {
    name: "Release PET Film / Silicone Coated PET (PET-LX)",
    categoryName: "Specialty & Functional Films",
    features: ["聚酯离型膜PET-LX", "Silicone/Sliding Film", "Smooth & Dust-free"],
  },
  {
    name: "High Transparency PET Film (PET-GT)",
    categoryName: "Specialty & Functional Films",
    features: ["高透聚酯膜PET-GT", "Ultra-Clear Clarity", "High Gloss Mirror Effect"],
  },
  {
    name: "MDOPE Film with Water-Based Coating",
    categoryName: "Specialty & Functional Films",
    features: ["MDOPE（涂水性涂层）", "Functional Water-Based Coating", "Improved Printability"],
  },
  {
    name: "BOPP Film with Water-Based Coating",
    categoryName: "Specialty & Functional Films",
    features: ["BOPP（涂水性涂层）", "Enhanced Barrier", "Weather Resistance"],
  },
  {
    name: "BOPET Film with Water-Based Coating",
    categoryName: "Specialty & Functional Films",
    features: ["BOPET（涂水性涂层）", "Functional Coating Customization", "Broad Scenarios"],
  },

  // 4. Recyclable Mono-Materials
  {
    name: "Biodegradable PLA-AlOx Film",
    categoryName: "Recyclable Mono-Materials",
    features: ["生物可降解材料——聚乳酸氧化铝膜 PLA-AlOx", "100% Biodegradable (CO2 & Water)", "Eco-Friendly Material"],
  },
  {
    name: "High-Barrier ALOx-BOPP Film (Recyclable Mono-Material)",
    categoryName: "Recyclable Mono-Materials",
    features: ["单一材质可回收 高阻隔聚丙烯氧化铝ALOx-BOPP镀膜", "Mono-Material Packaging", "Transparent Ultra-High Barrier"],
  },
  {
    name: "Metallized PLA Film (VMPLA)",
    categoryName: "Recyclable Mono-Materials",
    features: ["聚乳酸镀铝膜 VMPLA", "Biodegradable VMPLA", "Microorganism Degradation"],
  }
];

async function main() {
  console.log('Seeding scraped products from GD Cailong...');

  for (const prod of PRODUCTS_DATA) {
    const category = await prisma.category.findUnique({
      where: { name: prod.categoryName }
    });

    if (category) {
      // avoid dupes
      const existing = await prisma.product.findFirst({
        where: { name: prod.name }
      });

      if (!existing) {
        await prisma.product.create({
          data: {
            name: prod.name,
            categoryId: category.id,
            // generic placeholder image
            image: "https://www.logospack.com.hk/cache/img/596de946fdb47fa3480f1a1bc5d5dfab839845a8fbb1.png",
            features: JSON.stringify(prod.features),
            isFeatured: false,
          }
        });
        console.log(`Added: ${prod.name}`);
      }
    }
  }

  console.log('Finished scraping import.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });