import html2canvas from 'html2canvas';

type DownloadElementAsImageParams = {
  element: HTMLElement;
  fileName: string;
};

export async function downloadElementAsImage({
  element,
  fileName,
}: DownloadElementAsImageParams): Promise<void> {
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
  const link = document.createElement('a');
  link.download = fileName;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
