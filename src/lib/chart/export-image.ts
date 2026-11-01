import { toBlob, toSvg } from "html-to-image";

export function pixelRatioFor(width: number, height: number): number {
  const longSide = Math.max(width, height);
  if (longSide >= 2000) return 1;
  if (longSide * 2 <= 3840) return 2;
  return 1;
}

async function rasterBlob(node: HTMLElement, ratio: number): Promise<Blob> {
  const options = {
    pixelRatio: ratio,
    backgroundColor: "#ffffff",
    cacheBust: true,
  };
  try {
    const blob = await toBlob(node, options);
    if (blob) return blob;
  } catch {
    const blob = await toBlob(node, { ...options, skipFonts: true });
    if (blob) return blob;
  }
  throw new Error("Couldn't render the chart image.");
}

export async function chartToPng(node: HTMLElement, width: number, height: number): Promise<Blob> {
  return rasterBlob(node, pixelRatioFor(width, height));
}

export async function chartToSvg(node: HTMLElement): Promise<string> {
  try {
    return await toSvg(node, { backgroundColor: "#ffffff", cacheBust: true });
  } catch {
    return toSvg(node, { backgroundColor: "#ffffff", cacheBust: true, skipFonts: true });
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function downloadUrl(url: string, filename: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export async function copyNodeImage(node: HTMLElement): Promise<void> {
  const blobPromise = rasterBlob(node, 2);
  await navigator.clipboard.write([
    new ClipboardItem({
      "image/png": blobPromise,
    }),
  ]);
}

export async function waitForPlot(node: HTMLElement, minWidth: number): Promise<void> {
  const started = performance.now();
  while (performance.now() - started < 2800) {
    const svg = node.querySelector("svg");
    const box = svg?.getBoundingClientRect();
    if (box && box.width > Math.min(minWidth, 240) * 0.45 && box.height > 80) {
      await new Promise((resolve) => setTimeout(resolve, 80));
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error("The chart wasn't ready to export.");
}
