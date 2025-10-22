import { NextRequest, NextResponse } from "next/server";
import { searchStocks } from "@/lib/stocks";

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const keyword = searchParams.get("q");

  const results = searchStocks(keyword ?? "");
  return NextResponse.json({ data: results }, { status: 200 });
}
