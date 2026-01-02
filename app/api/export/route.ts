import { NextRequest, NextResponse } from "next/server";
import { toPNG, toAvif, toJPEG, toWebP } from "peeps-generator";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const format = searchParams.get("format");
  const { svg } = await req.json();

  let buffer: Uint8Array;
  let contentType: string;
  let filename: string;

  switch (format) {
    case "png":
      buffer = await toPNG(svg);
      contentType = "image/png";
      filename = "peep.png";
      break;

    case "jpeg":
    case "jpg":
      buffer = await toJPEG(svg);
      contentType = "image/jpeg";
      filename = "peep.jpg";
      break;

    case "webp":
      buffer = await toWebP(svg);
      contentType = "image/webp";
      filename = "peep.webp";
      break;

    case "avif":
      buffer = await toAvif(svg);
      contentType = "image/avif";
      filename = "peep.avif";
      break;

    default:
      return NextResponse.json(svg);
  }

  const safeArrayBuffer = new Uint8Array(buffer).buffer;

  const blob = new Blob([safeArrayBuffer], {
    type: contentType,
  });

  return new NextResponse(blob, {
    headers: {
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
