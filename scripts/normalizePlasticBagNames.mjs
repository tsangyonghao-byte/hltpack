import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TARGET_CATEGORIES = [
  "Custom Pet Supplies Bags",
  "Tea Bags",
  "Custom Food Bags",
  "Medical Mask Bags",
  "Toy Bags",
  "Shaped Bags",
  "Ziplock Bags",
  "Mask Bags",
  "Kraft Paper Bags",
  "Bubble Bags",
  "Spout Pouches",
  "Foil-Clear Bags",
];

const plasticFolderCategoryMap = {
  "口罩袋": "Medical Mask Bags",
  "吸嘴袋": "Spout Pouches",
  "定制宠物用品袋": "Custom Pet Supplies Bags",
  "定制食品袋": "Custom Food Bags",
  "异型袋": "Shaped Bags",
  "异性袋": "Shaped Bags",
  "气泡袋": "Bubble Bags",
  "牛皮纸袋": "Kraft Paper Bags",
  "玩具袋": "Toy Bags",
  "自封袋": "Ziplock Bags",
  "茶叶袋": "Tea Bags",
  "阴阳袋": "Foil-Clear Bags",
  "面膜袋": "Mask Bags",
};

const phraseMap = [
  ["带骨条", "Zipper"],
  ["卡头自粘", "Self-Adhesive Header Card"],
  ["卡头", "Header Card"],
  ["自封", "Resealable"],
  ["三边封", "Three-Side Seal"],
  ["八边封", "Flat Bottom"],
  ["八边", "Flat Bottom"],
  ["异型", "Shaped"],
  ["异性", "Shaped"],
  ["带飞机孔", "with Hang Hole"],
  ["带孔", "Hang Hole"],
  ["手提", "Handle"],
  ["风琴", "Side Gusset"],
  ["中封", "Center Seal"],
  ["牛皮纸", "Kraft Paper"],
  ["开天窗", "Window"],
  ["透明", "Clear"],
  ["阴阳", "Foil-Clear"],
  ["日化用品", "Daily Care"],
  ["常规", "Standard"],
  ["面膜", "Facial Mask"],
  ["口罩", "Mask"],
  ["茶叶", "Tea"],
  ["玩具", "Toy"],
  ["食品", "Food"],
  ["食物", "Food"],
  ["气泡", "Bubble"],
  ["宠物粮食", "Pet Food"],
  ["宠物用品", "Pet Supplies"],
  ["宠物", "Pet"],
  ["奶茶", "Beverage"],
  ["吸嘴", "Spout"],
  ["咖啡豆子", "Coffee Bean"],
  ["服饰", "Garment"],
  ["收纳", "Storage"],
  ["骨条", "Zipper"],
  ["自立", "Stand-Up"],
  ["压缩", "Compression"],
  ["铝箔", "Foil"],
  ["真空", "Vacuum"],
  ["米", "Rice"],
  ["包装", "Packaging"],
  ["封口", "Seal"],
  ["定制", "Custom"],
  ["产品", "Product"],
  ["包装袋", "Packaging Bag"],
  ["纸袋", "Paper Bag"],
  ["袋", "Bag"],
];

const categorySuffixMap = {
  "Custom Pet Supplies Bags": "Pet Supplies Bag",
  "Tea Bags": "Tea Bag",
  "Custom Food Bags": "Food Packaging Bag",
  "Medical Mask Bags": "Mask Bag",
  "Toy Bags": "Toy Packaging Bag",
  "Shaped Bags": "Shaped Bag",
  "Ziplock Bags": "Ziplock Bag",
  "Mask Bags": "Facial Mask Bag",
  "Kraft Paper Bags": "Kraft Paper Bag",
  "Bubble Bags": "Bubble Bag",
  "Spout Pouches": "Spout Pouch",
  "Foil-Clear Bags": "Foil-Clear Bag",
};

function getFolderName(imageUrl) {
  const parts = imageUrl.split("/").filter(Boolean);
  return parts.length >= 2 ? parts[parts.length - 2] : "";
}

function normalizeImagePath(url) {
  return url
    .replaceAll("/异性袋/", "/异型袋/")
    .replaceAll("/异性袋\\", "/异型袋\\");
}

function getPlasticSubFolder(imageUrl) {
  const parts = normalizeImagePath(imageUrl).split("/").filter(Boolean);
  const rootIndex = parts.indexOf("塑料包装袋系列");
  if (rootIndex === -1 || rootIndex + 1 >= parts.length) return null;
  return parts[rootIndex + 1];
}

function normalizeSpaces(value) {
  return value
    .replace(/\([^)]*\)/g, " ")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function dedupeWords(value) {
  const parts = value.split(" ");
  const result = [];
  for (const part of parts) {
    if (!part) continue;
    if (result[result.length - 1] !== part) {
      result.push(part);
    }
  }
  return result.join(" ");
}

function ensureSuffix(baseName, suffix) {
  if (!suffix) return baseName;
  if (baseName.includes(suffix)) return baseName;

  const suffixKeyTerms = suffix.split(" ");
  const hasAnySuffixTerm = suffixKeyTerms.some((term) => baseName.includes(term));
  if (hasAnySuffixTerm) return baseName;

  return `${baseName} ${suffix}`.trim();
}

function titleFromFolder(folderName, categoryName) {
  let working = folderName;
  for (const [zh, en] of phraseMap) {
    working = working.split(zh).join(` ${en} `);
  }

  working = normalizeSpaces(working);
  working = dedupeWords(working);

  if (!working) {
    return categorySuffixMap[categoryName] || "Packaging Bag";
  }

  const baseName = ensureSuffix(working, categorySuffixMap[categoryName]);

  return normalizeSpaces(
    baseName
      .replace(/\bBag Custom\b/gi, "Custom Bag")
      .replace(/\bBag Tea Bag\b/gi, "Tea Bag")
      .replace(/\bBag Toy Bag\b/gi, "Toy Bag")
      .replace(/\bBag Foil-Clear Bag\b/gi, "Foil-Clear Bag")
      .replace(/\bPackaging Handle Bag\b/gi, "Handle Packaging Bag")
      .replace(/\bPackaging Packaging Bag\b/gi, "Packaging Bag")
      .replace(/\bBag Packaging Bag\b/gi, "Packaging Bag")
      .replace(/\bPackaging Bag Packaging Bag\b/gi, "Packaging Bag")
      .replace(/\bBag Bag\b/gi, "Bag")
      .replace(/\bPouch Pouch\b/gi, "Pouch")
      .replace(/\bMask Mask\b/gi, "Mask")
      .replace(/\bTea Tea\b/gi, "Tea")
      .replace(/\bToy Toy\b/gi, "Toy")
      .replace(/\bFoil Clear\b/gi, "Foil-Clear")
      .replace(/\bSelf Adhesive\b/gi, "Self-Adhesive")
      .replace(/\bThree Side\b/gi, "Three-Side")
      .replace(/\bStand Up\b/gi, "Stand-Up")
      .replace(/\bFlat Bottom\b/gi, "Flat-Bottom")
      .replace(/\bFoil Clear Bag\b/gi, "Foil-Clear Bag")
      .replace(/\bZiplock Bag\b/gi, "Ziplock Bag")
  );
}

function seoDescriptionFromName(name, categoryName) {
  return `${name} from HAILITONG Packaging. Custom flexible packaging solution for ${categoryName.toLowerCase()} applications.`;
}

async function main() {
  const products = await prisma.product.findMany({
    where: {
      category: {
        name: {
          in: TARGET_CATEGORIES,
        },
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  let updated = 0;

  for (const product of products) {
    const normalizedImage = normalizeImagePath(product.image);
    const normalizedGallery = product.gallery
      ? JSON.stringify(JSON.parse(product.gallery).map((item) => normalizeImagePath(item)))
      : product.gallery;
    const folderName = getFolderName(normalizedImage);
    const plasticSubFolder = getPlasticSubFolder(normalizedImage);
    const nextCategoryName = plasticFolderCategoryMap[plasticSubFolder] || product.category.name;
    const nextCategoryId = (
      await prisma.category.findFirst({
        where: { name: nextCategoryName },
        select: { id: true },
      })
    )?.id || product.categoryId;
    const nextName = titleFromFolder(folderName, nextCategoryName);
    const nextSeoTitle = `${nextName} | HAILITONG Packaging`;
    const nextSeoDescription = seoDescriptionFromName(nextName, nextCategoryName);

    if (
      product.name === nextName &&
      product.seoTitle === nextSeoTitle &&
      product.seoDescription === nextSeoDescription &&
      product.categoryId === nextCategoryId &&
      product.image === normalizedImage &&
      product.gallery === normalizedGallery
    ) {
      continue;
    }

    await prisma.product.update({
      where: { id: product.id },
      data: {
        categoryId: nextCategoryId,
        name: nextName,
        seoTitle: nextSeoTitle,
        seoDescription: nextSeoDescription,
        image: normalizedImage,
        gallery: normalizedGallery,
      },
    });

    updated += 1;
    console.log(`${product.category.name} -> ${nextCategoryName}\t${folderName}\t=>\t${nextName}`);
  }

  const refreshedProducts = await prisma.product.findMany({
    where: {
      category: {
        name: {
          in: TARGET_CATEGORIES,
        },
      },
    },
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const seenKeys = new Set();
  let removed = 0;

  for (const product of refreshedProducts) {
    const folderName = getFolderName(product.image);
    const dedupeKey = `${product.category.name}::${folderName}::${product.name}`;

    if (seenKeys.has(dedupeKey)) {
      await prisma.product.delete({
        where: { id: product.id },
      });
      removed += 1;
      continue;
    }

    seenKeys.add(dedupeKey);
  }

  console.log(`Updated ${updated} plastic packaging products.`);
  console.log(`Removed ${removed} duplicate plastic packaging products.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
