import { NextResponse } from "next/server";
import { tokenProvider } from "@/actions/StreamActions";

export async function GET() {
  const token = await tokenProvider();
  return NextResponse.json({ token });
}