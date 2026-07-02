import html2canvas from 'html2canvas';

type DownloadElementAsImageParams = {
  element: HTMLElement;
  fileName: string;
};

export type SaveInviteImageResult =
  | { kind: 'downloaded' }
  | { kind: 'shared' }
  | { kind: 'preview'; blobUrl: string };

const PNG_MIME_TYPE = 'image/png';

function normalizePngFileName(fileName: string): string {
  return fileName.toLowerCase().endsWith('.png') ? fileName : `${fileName}.png`;
}

function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
          return;
        }
        reject(new Error('Failed to create PNG blob'));
      },
      PNG_MIME_TYPE,
      1,
    );
  });
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

function createPreviewBlobUrl(blob: Blob): string {
  return URL.createObjectURL(blob);
}

export async function downloadElementAsImage({
  element,
  fileName,
}: DownloadElementAsImageParams): Promise<SaveInviteImageResult> {
  await document.fonts.ready;
  const images = element.querySelectorAll('img');
  await Promise.all(
    Array.from(images).map(
      (image) =>
        new Promise<void>((resolve) => {
          if (image.complete) {
            resolve();
            return;
          }
          image.addEventListener('load', () => resolve(), { once: true });
          image.addEventListener('error', () => resolve(), { once: true });
        }),
    ),
  );
  const canvas = await html2canvas(element, {
    backgroundColor: '#ffcf00',
    scale: Math.min(window.devicePixelRatio, 2),
    useCORS: true,
    logging: false,
  });
  const blob = await canvasToPngBlob(canvas);
  const safeFileName = normalizePngFileName(fileName);
  const hasShared = await sharePngFile(blob, safeFileName);
  if (hasShared) {
    return { kind: 'shared' };
  }
  if (isIosDevice()) {
    return { kind: 'preview', blobUrl: createPreviewBlobUrl(blob) };
  }
  triggerBlobDownload(blob, safeFileName);
  return { kind: 'downloaded' };
}

export function revokeInviteImageBlobUrl(blobUrl: string): void {
  URL.revokeObjectURL(blobUrl);
}
