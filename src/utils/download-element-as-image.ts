import { toBlob } from 'html-to-image';

type DownloadElementAsImageParams = {
  element: HTMLElement;
  fileName: string;
};

export type SaveInviteImageResult =
  | { kind: 'downloaded' }
  | { kind: 'shared' }
  | { kind: 'preview'; blobUrl: string };

const PNG_MIME_TYPE = 'image/png';
const EXPORTING_CLASS_NAME = 'is-exporting';

function normalizePngFileName(fileName: string): string {
  return fileName.toLowerCase().endsWith('.png') ? fileName : `${fileName}.png`;
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      reject(new Error('Failed to read blob'));
    };
    reader.readAsDataURL(blob);
  });
}

async function waitForImages(element: HTMLElement): Promise<void> {
  const images = Array.from(element.querySelectorAll('img'));
  await Promise.all(
    images.map(
      (image) =>
        new Promise<void>((resolve) => {
          if (image.complete && image.naturalWidth > 0) {
            resolve();
            return;
          }
          image.addEventListener('load', () => resolve(), { once: true });
          image.addEventListener('error', () => resolve(), { once: true });
        }),
    ),
  );
}

async function inlineImageSource(source: string): Promise<string | null> {
  if (!source || source.startsWith('data:')) {
    return null;
  }
  try {
    const response = await fetch(source, { cache: 'force-cache' });
    if (!response.ok) {
      return null;
    }
    const blob = await response.blob();
    return blobToDataUrl(blob);
  } catch {
    return null;
  }
}

async function inlineImagesForExport(element: HTMLElement): Promise<() => void> {
  const restores: Array<() => void> = [];
  const images = Array.from(element.querySelectorAll('img'));
  await Promise.all(
    images.map(async (image) => {
      const originalSrc = image.currentSrc || image.src;
      const dataUrl = await inlineImageSource(originalSrc);
      if (!dataUrl) {
        return;
      }
      image.src = dataUrl;
      restores.push(() => {
        image.src = originalSrc;
      });
    }),
  );
  const svgImages = Array.from(element.querySelectorAll('image'));
  await Promise.all(
    svgImages.map(async (svgImage) => {
      const href =
        svgImage.getAttribute('href') ?? svgImage.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
      if (!href) {
        return;
      }
      const dataUrl = await inlineImageSource(href);
      if (!dataUrl) {
        return;
      }
      svgImage.setAttribute('href', dataUrl);
      svgImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', dataUrl);
      restores.push(() => {
        svgImage.setAttribute('href', href);
        svgImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', href);
      });
    }),
  );
  return () => {
    restores.forEach((restore) => restore());
  };
}

async function renderElementToPngBlob(element: HTMLElement): Promise<Blob> {
  await document.fonts.ready;
  await waitForImages(element);
  element.classList.add(EXPORTING_CLASS_NAME);
  const restoreImages = await inlineImagesForExport(element);
  try {
    const blob = await toBlob(element, {
      backgroundColor: '#fffef8',
      pixelRatio: Math.min(window.devicePixelRatio || 1, 3),
      cacheBust: false,
      skipFonts: false,
    });
    if (!blob) {
      throw new Error('Failed to render invite image');
    }
    return blob;
  } finally {
    restoreImages();
    element.classList.remove(EXPORTING_CLASS_NAME);
  }
}

function isIosDevice(): boolean {
  const userAgent = navigator.userAgent;
  return (
    /iPad|iPhone|iPod/.test(userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

function canSharePngFile(blob: Blob, fileName: string): boolean {
  if (!navigator.share || !navigator.canShare) {
    return false;
  }
  const file = new File([blob], fileName, { type: PNG_MIME_TYPE });
  return navigator.canShare({ files: [file] });
}

async function sharePngFile(blob: Blob, fileName: string): Promise<boolean> {
  if (!canSharePngFile(blob, fileName)) {
    return false;
  }
  const file = new File([blob], fileName, { type: PNG_MIME_TYPE });
  try {
    await navigator.share({
      files: [file],
      title: 'Приглашение на день рождения',
    });
    return true;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return true;
    }
    return false;
  }
}

function triggerBlobDownload(blob: Blob, fileName: string): void {
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = fileName;
  link.type = PNG_MIME_TYPE;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => {
    URL.revokeObjectURL(blobUrl);
  }, 10_000);
}

export async function downloadElementAsImage({
  element,
  fileName,
}: DownloadElementAsImageParams): Promise<SaveInviteImageResult> {
  const blob = await renderElementToPngBlob(element);
  const safeFileName = normalizePngFileName(fileName);
  const hasShared = await sharePngFile(blob, safeFileName);
  if (hasShared) {
    return { kind: 'shared' };
  }
  if (isIosDevice()) {
    return { kind: 'preview', blobUrl: URL.createObjectURL(blob) };
  }
  triggerBlobDownload(blob, safeFileName);
  return { kind: 'downloaded' };
}

export function revokeInviteImageBlobUrl(blobUrl: string): void {
  URL.revokeObjectURL(blobUrl);
}
