import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";
export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  return NextResponse.json({ message: "Hello World" });
}
