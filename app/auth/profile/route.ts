import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
  const data = await request.json();
  return NextResponse.json(data);
}
