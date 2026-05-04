const fs = require('fs');
const path = require('path');

function normalizeImageUrl(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string') {
    return null;
  }

  const trimmed = imageUrl.trim();
  if (!trimmed) {
    return null;
  }

  return trimmed.split('#')[0].split('?')[0];
}

function readPngDimensions(buffer) {
  if (buffer.length < 24) {
    return null;
  }

  const pngSignature = '89504e470d0a1a0a';
  if (buffer.subarray(0, 8).toString('hex') !== pngSignature) {
    return null;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function isJpegStartOfFrame(marker) {
  return (
    (marker >= 0xc0 && marker <= 0xc3) ||
    (marker >= 0xc5 && marker <= 0xc7) ||
    (marker >= 0xc9 && marker <= 0xcb) ||
    (marker >= 0xcd && marker <= 0xcf)
  );
}

function readJpegDimensions(buffer) {
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

function getBufferDimensions(buffer) {
  return readPngDimensions(buffer) || readJpegDimensions(buffer);
}

async function getImageDimensionsFromUrl(imageUrl, options = {}) {
  const normalizedUrl = normalizeImageUrl(imageUrl);
  if (!normalizedUrl) {
    return null;
  }

  if (/^https?:\/\//i.test(normalizedUrl)) {
    try {
      const response = await fetch(normalizedUrl);
      if (!response.ok) {
        return null;
      }
      const arrayBuffer = await response.arrayBuffer();
      return getBufferDimensions(Buffer.from(arrayBuffer));
    } catch {
      return null;
    }
  }

  const baseDir = options.baseDir || process.cwd();
  const relativePath = decodeURIComponent(normalizedUrl.replace(/^\/+/, ''));
  const filePath = path.join(baseDir, 'public', relativePath);

  try {
    const buffer = await fs.promises.readFile(filePath);
    return getBufferDimensions(buffer);
  } catch {
    return null;
  }
}

async function getPreferredImage(imageUrls, options = {}) {
  const uniqueUrls = Array.from(
    new Set(
      (imageUrls || [])
        .map((item) => normalizeImageUrl(item))
        .filter(Boolean)
    )
  );

  if (uniqueUrls.length === 0) {
    return null;
  }

  const items = await Promise.all(
    uniqueUrls.map(async (imageUrl, index) => ({
      imageUrl,
      index,
      dimensions: await getImageDimensionsFromUrl(imageUrl, options),
    }))
  );

  const preferred = items
    .filter((item) => item.dimensions?.width === 800 && item.dimensions?.height === 800)
    .sort((a, b) => a.index - b.index);

  if (preferred.length > 0) {
    return preferred[0].imageUrl;
  }

  return uniqueUrls[0];
}

module.exports = {
  getPreferredImage,
  getImageDimensionsFromUrl,
};
