import { NextRequest, NextResponse } from "next/server";
import { createPeep, peepParts } from "peeps-generator";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(peepParts);
}

export async function POST(req: NextRequest) {
  try {
    const config = await req.json();
    const svg = createPeep(config);

    return new NextResponse(svg, {
      headers: { "Content-Type": "image/svg+xml" },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to generate peep" },
      { status: 500 },
    );
  }
}
