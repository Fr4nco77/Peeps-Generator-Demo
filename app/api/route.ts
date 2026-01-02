import { NextRequest, NextResponse } from "next/server";
import { createPeep, peepParts } from "peeps-generator";

export async function GET() {
  return NextResponse.json(peepParts);
}

export async function POST(req: NextRequest) {
  const config = await req.json();
  const svg = createPeep(config);

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}
