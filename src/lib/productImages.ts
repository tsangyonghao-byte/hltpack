import { promises as fs } from "fs";
import path from "path";

type ImageDimensions = {
  width: number;
  height: number;
};

function normalizeImageUrl(imageUrl: string | null | undefined) {
  if (!imageUrl) {
    return null;
  }

  const trimmed = imageUrl.trim();
  if (!trimmed) {
    return null;
  }

  return trimmed.split("#")[0].split("?")[0];
}

function toPublicFilePath(imageUrl: string) {
  if (!imageUrl.startsWith("/") || imageUrl.startsWith("//")) {
    return null;
  }

  const relativePath = decodeURIComponent(imageUrl.replace(/^\/+/, ""));
  return path.join(process.cwd(), "public", relativePath);
}

function toPublicUrlFromFilePath(filePath: string) {
  const publicRoot = path.join(process.cwd(), "public");
  const relativePath = path.relative(publicRoot, filePath);
  return `/${relativePath.split(path.sep).join("/")}`;
}

function readPngDimensions(buffer: Buffer): ImageDimensions | null {
  if (buffer.length < 24) {
    return null;
  }

  const pngSignature = "89504e470d0a1a0a";
  if (buffer.subarray(0, 8).toString("hex") !== pngSignature) {
    return null;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function isJpegStartOfFrame(marker: number) {
  return (
    (marker >= 0xc0 && marker <= 0xc3) ||
    (marker >= 0xc5 && marker <= 0xc7) ||
    (marker >= 0xc9 && marker <= 0xcb) ||
    (marker >= 0xcd && marker <= 0xcf)
  );
}

function readJpegDimensions(buffer: Buffer): ImageDimensions | null {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) {
    return null;
  }

  let offset = 2;

  while (offset < buffer.length) {
    while (offset < buffer.length && buffer[offset] === 0xff) {
      offset += 1;
    }

    if (offset >= buffer.length) {
      return null;
    }

    const marker = buffer[offset];
    offset += 1;

    if (marker === 0xd9 || marker === 0xda) {
      break;
    }

    if (offset + 1 >= buffer.length) {
      return null;
    }

    const segmentLength = buffer.readUInt16BE(offset);
    if (segmentLength < 2 || offset + segmentLength > buffer.length) {
      return null;
    }

    if (isJpegStartOfFrame(marker)) {
      return {
        height: buffer.readUInt16BE(offset + 3),
        width: buffer.readUInt16BE(offset + 5),
      };
    }

    offset += segmentLength;
  }

  return null;
}

async function getImageDimensions(imageUrl: string) {
  const normalizedUrl = normalizeImageUrl(imageUrl);
  if (!normalizedUrl) {
    return null;
  }

  if (/^https?:\/\//i.test(normalizedUrl)) {
    return null;
  }

  const filePath = toPublicFilePath(normalizedUrl);
  if (!filePath) {
    return null;
  }

  try {
    const buffer = await fs.readFile(filePath);
    return readPngDimensions(buffer) || readJpegDimensions(buffer);
  } catch {
    return null;
  }
}

async function discoverSiblingImages(primaryImage: string) {
  const normalizedUrl = normalizeImageUrl(primaryImage);
  if (!normalizedUrl || /^https?:\/\//i.test(normalizedUrl)) {
    return [];
  }

  const primaryPath = toPublicFilePath(normalizedUrl);
  if (!primaryPath) {
    return [];
  }

  try {
    const directoryPath = path.dirname(primaryPath);
    const fileNames = await fs.readdir(directoryPath);
    const imageNames = fileNames
      .filter((name) => /\.(png|jpe?g|webp)$/i.test(name))
      .sort((a, b) =>
        a.localeCompare(b, undefined, {
          numeric: true,
          sensitivity: "base",
        })
      );

    return imageNames.map((name) => toPublicUrlFromFilePath(path.join(directoryPath, name)));
  } catch {
    return [];
  }
}

export function parseProductGallery(gallery: string | null | undefined) {
  if (!gallery) {
    return [];
  }

  try {
    const parsed = JSON.parse(gallery);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export async function getOrderedProductImages(primaryImage: string, galleryImages: string[] = []) {
  const siblingImages = await discoverSiblingImages(primaryImage);
  const uniqueImages = Array.from(
    new Set([primaryImage, ...galleryImages, ...siblingImages].map((item) => normalizeImageUrl(item)).filter(Boolean) as string[])
  );

  const imagesWithDimensions = await Promise.all(
    uniqueImages.map(async (imageUrl, index) => ({
      imageUrl,
      index,
      dimensions: await getImageDimensions(imageUrl),
    }))
  );

  const preferred = imagesWithDimensions.filter(
    (item) => item.dimensions?.width === 800 && item.dimensions?.height === 800
  );
  const fallback = imagesWithDimensions.filter(
    (item) => !(item.dimensions?.width === 800 && item.dimensions?.height === 800)
  );

  preferred.sort((a, b) => a.index - b.index);
  fallback.sort((a, b) => a.index - b.index);

  return [...preferred, ...fallback].map((item) => item.imageUrl);
}

export async function getPreferredProductImage(primaryImage: string, galleryImages: string[] = []) {
  const orderedImages = await getOrderedProductImages(primaryImage, galleryImages);
  return orderedImages[0] || primaryImage;
}
