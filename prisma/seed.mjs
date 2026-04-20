import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CATEGORIES = [
  "Stand-up Pouches",
  "Flat Bottom Pouches",
  "Retort Pouches",
  "Spout Pouches",
  "Roll Stock Film",
  "Sustainable Packaging",
];

const MOCK_PRODUCTS = [
  {
    name: "Mono-PE Recyclable Stand-up Pouch",
    categoryName: "Sustainable Packaging",
    image: "https://www.logospack.com.hk/cache/img/cf1f784f1e2d2f80a80a35375b0baa269b5357c8d929.jpg",
    features: ["100% Recyclable", "High Barrier", "Custom Printing"],
  },
  {
    name: "Retort Pouch for Ready Meals",
    categoryName: "Retort Pouches",
    image: "https://www.logospack.com.hk/cache/img/03b562fb9ec251c3164c6e1171c0273ae7fb098bccd4.png",
    features: ["High Temperature Resistance", "Long Shelf Life", "Puncture Resistant"],
  },
  {
    name: "Premium Coffee Flat Bottom Pouch",
    categoryName: "Flat Bottom Pouches",
    image: "https://www.logospack.com.hk/cache/img/9e55548254d2eb11f093cf288503222666a8561fbcb7.png",
    features: ["One-way Degassing Valve", "Excellent Stability", "Premium Matte Finish"],
  },
  {
    name: "Liquid Spout Pouch",
    categoryName: "Spout Pouches",
    image: "https://www.logospack.com.hk/cache/img/eeed8b33e36f4d104ab1dca068141170f510340e80ee.png",
    features: ["Leak-proof Spout", "Lightweight", "Cost-effective Shipping"],
  },
  {
    name: "Snack Stand-up Pouch with Zipper",
    categoryName: "Stand-up Pouches",
    image: "https://www.logospack.com.hk/cache/img/88c2f8ae74bd774aacc80bdb24f848fe4ea1c7a533ae.png",
    features: ["Resealable Zipper", "Tear Notch", "High Transparency Window"],
  },
  {
    name: "Custom Printed Roll Stock Film",
    categoryName: "Roll Stock Film",
    image: "https://www.logospack.com.hk/cache/img/596de946fdb47fa3480f1a1bc5d5dfab839845a8fbb1.png",
    features: ["High-speed Packaging", "Low Cost per Unit", "Vibrant Gravure Printing"],
  },
  {
    name: "Box Pouch for Pet Food",
    categoryName: "Flat Bottom Pouches",
    image: "https://www.logospack.com.hk/cache/img/3627074e7ea60b3b8ba8c434283822d39ad600ab7b3b.png",
    features: ["Heavy Duty", "Side Gusset Printing", "Easy Carry Handle"],
  },
  {
    name: "Die-Cut Shaped Pouch",
    categoryName: "Stand-up Pouches",
    image: "https://www.logospack.com.hk/cache/img/d1e1f6a53f3251fbbb5782fa9bae5dee8a87a9c6d70e.png",
    features: ["Eye-catching Shape", "Brand Differentiation", "Custom Mold"],
  }
];

const NEWS_ITEMS = [
  {
    title: "Sustainable Packaging Trends for 2026",
    summary: "Discover how major brands are shifting towards eco-friendly materials and circular economy models to meet the new environmental standards.",
    content: "Detailed content here...",
    category: "Packaging News",
    date: "April 5, 2026",
    image: "https://www.logospack.com.hk/cache/img/cf1f784f1e2d3ef764d9836114729546d458339197d1.jpg",
  },
  {
    title: "HAILITONG Packaging at Global Expo 2026",
    summary: "Join us at the international exhibition where we will unveil our latest innovations in flexible packaging and high-barrier technologies.",
    content: "Detailed content here...",
    category: "Exhibition",
    date: "March 20, 2026",
    image: "https://www.logospack.com.hk/cache/img/cf1f784f1e2d0010ea43d775a6884a3a190f292bbf73.jpg",
  },
  {
    title: "New Recyclable Pouch Production Line Opens",
    summary: "Our new state-of-the-art facility is now operational, significantly increasing our capacity for 100% recyclable stand-up pouches.",
    content: "Detailed content here...",
    category: "HAILITONG Development",
    date: "February 12, 2026",
    image: "https://www.logospack.com.hk/cache/img/cf1f784f1e2d2f80a80a35375b0baa269b5357c8d929.jpg",
  },
];

async function main() {
  console.log('Start seeding...');

  // Create Categories
  for (const catName of CATEGORIES) {
    await prisma.category.upsert({
      where: { name: catName },
      update: {},
      create: { name: catName },
    });
  }
  console.log('Categories seeded.');

  // Create Products
  for (const prod of MOCK_PRODUCTS) {
    const category = await prisma.category.findUnique({
      where: { name: prod.categoryName }
    });

    if (category) {
      await prisma.product.create({
        data: {
          name: prod.name,
          categoryId: category.id,
          image: prod.image,
          features: JSON.stringify(prod.features),
          isFeatured: true,
        }
      });
    }
  }
  console.log('Products seeded.');

  // Create News
  for (const news of NEWS_ITEMS) {
    await prisma.news.create({
      data: news,
    });
  }
  console.log('News seeded.');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
