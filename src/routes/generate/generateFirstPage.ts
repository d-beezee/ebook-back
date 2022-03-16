import fs from "fs";
import assert from "assert";
import Canvas, { Canvas as NodeCanvas, CanvasRenderingContext2D } from "canvas";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";

// Some PDFs need external cmaps.
const CMAP_URL = "../../../node_modules/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;

// Where the standard fonts are located.
const STANDARD_FONT_DATA_URL =
  "../../../node_modules/pdfjs-dist/standard_fonts/";

type CanvasAndContextType = {
  canvas: NodeCanvas | null;
  context: CanvasRenderingContext2D | null;
};
class NodeCanvasFactory {
  create(width: number, height: number) {
    assert(width > 0 && height > 0, "Invalid canvas size");
    const canvas = Canvas.createCanvas(width, height);
    const context = canvas.getContext("2d");
    return {
      canvas,
      context,
    };
  }

  reset(canvasAndContext: CanvasAndContextType, width: number, height: number) {
    assert(canvasAndContext.canvas, "Canvas is not specified");
    assert(width > 0 && height > 0, "Invalid canvas size");
    canvasAndContext.canvas.width = width;
    canvasAndContext.canvas.height = height;
  }

  destroy(canvasAndContext: CanvasAndContextType) {
    assert(canvasAndContext.canvas, "Canvas is not specified");

    // Zeroing the width and height cause Firefox to release graphics
    // resources immediately, which can greatly reduce memory consumption.
    canvasAndContext.canvas.width = 0;
    canvasAndContext.canvas.height = 0;
    canvasAndContext.canvas = null;
    canvasAndContext.context = null;
  }
}

export default async (pdfPath: string) => {
  // Loading file from file system into typed array.
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  // Load the PDF file.
  const loadingTask = pdfjsLib.getDocument({
    data,
    cMapUrl: CMAP_URL,
    cMapPacked: CMAP_PACKED,
    standardFontDataUrl: STANDARD_FONT_DATA_URL,
  });

  try {
    const pdfDocument = await loadingTask.promise;
    console.log("# PDF document loaded.");
    // Get the first page.
    const page = await pdfDocument.getPage(1);
    // Render the page on a Node canvas with 100% scale.
    const viewport = page.getViewport({ scale: 0.2 });
    const canvasFactory = new NodeCanvasFactory();
    const canvasAndContext = canvasFactory.create(
      viewport.width,
      viewport.height
    );

    if (!canvasAndContext.context) return false;
    const renderContext = {
      canvasContext: canvasAndContext.context,
      viewport,
      canvasFactory,
    };

    const renderTask = page.render(renderContext);
    console.log(renderTask);
    await renderTask.promise;
    // Convert the canvas to an image buffer.
    if (!canvasAndContext.canvas) return false;

    const image = canvasAndContext.canvas.toBuffer();
    page.cleanup();
    return (image.toString('base64'));
    // Release page resources.
  } catch (reason) {
    console.log(reason);
  }
};
