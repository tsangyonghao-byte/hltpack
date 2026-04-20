const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Updating Banners with Competitor Images...");
  
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

  console.log("Banner update complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
