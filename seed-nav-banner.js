const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Navigation Items...");
  
  // Clear existing items
  await prisma.navigationItem.deleteMany();

  // Create Top Level Items
  const about = await prisma.navigationItem.create({
    data: { nameZh: '关于我们', nameEn: 'Who we are', link: '/about', order: 10 }
  });
  
  const products = await prisma.navigationItem.create({
    data: { nameZh: '产品展示', nameEn: 'Our Products', link: '/products', order: 20 }
  });
  
  const market = await prisma.navigationItem.create({
    data: { nameZh: '包装市场', nameEn: 'Packaging Market', link: '/packaging-market', order: 30 }
  });

  const howWeWork = await prisma.navigationItem.create({
    data: { nameZh: '工作流程', nameEn: 'How we work', link: '/how-we-work', order: 40 }
  });

  const safety = await prisma.navigationItem.create({
    data: { nameZh: '包装安全', nameEn: 'Packaging Safety', link: '/packaging-safety', order: 50 }
  });

  const sustainability = await prisma.navigationItem.create({
    data: { nameZh: '可持续发展', nameEn: 'Sustainability', link: '/sustainability', order: 60 }
  });

  const contact = await prisma.navigationItem.create({
    data: { nameZh: '联系我们', nameEn: 'Contact Us', link: '/contact', order: 70 }
  });

  // Create Sub Items for Products
  const productSubItems = [
    { nameZh: '自立袋', nameEn: 'Stand-up Pouches', link: '/products?category=Stand-up+Pouches', order: 1 },
    { nameZh: '平底袋', nameEn: 'Flat Bottom Pouches', link: '/products?category=Flat+Bottom+Pouches', order: 2 },
    { nameZh: '蒸煮袋', nameEn: 'Retort Pouches', link: '/products?category=Retort+Pouches', order: 3 },
    { nameZh: '吸嘴袋', nameEn: 'Spout Pouches', link: '/products?category=Spout+Pouches', order: 4 },
    { nameZh: '卷膜', nameEn: 'Roll Stock Film', link: '/products?category=Roll+Stock+Film', order: 5 },
    { nameZh: '环保包装', nameEn: 'Sustainable Packaging', link: '/products?category=Sustainable+Packaging', order: 6 },
  ];

  for (const sub of productSubItems) {
    await prisma.navigationItem.create({
      data: { ...sub, parentId: products.id }
    });
  }

  // Create Sub Items for Market
  const marketSubItems = [
    { nameZh: '食品饮料', nameEn: 'Food & Beverage', link: '/packaging-market#food', order: 1 },
    { nameZh: '宠物食品', nameEn: 'Pet Food', link: '/packaging-market#pet', order: 2 },
    { nameZh: '个人护理', nameEn: 'Personal Care', link: '/packaging-market#personal-care', order: 3 },
    { nameZh: '家庭护理', nameEn: 'Home Care', link: '/packaging-market#home-care', order: 4 },
    { nameZh: '工业包装', nameEn: 'Industrial', link: '/packaging-market#industrial', order: 5 },
  ];

  for (const sub of marketSubItems) {
    await prisma.navigationItem.create({
      data: { ...sub, parentId: market.id }
    });
  }

  console.log("Seeding Banners...");
  await prisma.banner.deleteMany();

  const banners = [
    {
      title: "Innovative Packaging",
      subtitle: "SMART DESIGN",
      description: "Discover our eco-friendly pouch designs that reduce carbon footprint without compromising quality or shelf life.",
      image: "https://www.logospack.com.hk/img/banner/1/banner_pizza_inno_base.png",
      link: "/products?category=Stand-up+Pouches",
      isActive: true,
      order: 1
    },
    {
      title: "Circular Economy Solutions",
      subtitle: "100% RECYCLABLE",
      description: "High-barrier packaging engineered for a sustainable future, ensuring maximum freshness.",
      image: "https://www.logospack.com.hk/img/banner/2/banner_pizza_circ_base.png",
      link: "/sustainability",
      isActive: true,
      order: 2
    },
    {
      title: "Leak-proof Engineering",
      subtitle: "ADVANCED SAFETY",
      description: "Secure sealing and superior puncture resistance for liquids and heavy products.",
      image: "https://www.logospack.com.hk/img/banner/3/banner_pizza_leak_base.png",
      link: "/packaging-safety",
      isActive: true,
      order: 3
    },
    {
      title: "Ready-to-eat Retort Pouches",
      subtitle: "CONVENIENCE FIRST",
      description: "High-temperature resistant pouches perfect for microwavable and ready meals.",
      image: "https://www.logospack.com.hk/img/banner/4/banner_pizza_read_base.png",
      link: "/products?category=Retort+Pouches",
      isActive: true,
      order: 4
    },
    {
      title: "Less Material, More Value",
      subtitle: "OPTIMIZED PACKAGING",
      description: "Reduce plastic usage with our lightweight yet durable packaging structures.",
      image: "https://www.logospack.com.hk/img/banner/5/banner_pizza_less_base.png",
      link: "/how-we-work",
      isActive: true,
      order: 5
    }
  ];

  for (const banner of banners) {
    await prisma.banner.create({ data: banner });
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
