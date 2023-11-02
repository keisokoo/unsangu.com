import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const host = headers().get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const currentUrl = `${protocol}://${host}`;
  return NextResponse.json(currentUrl)

}