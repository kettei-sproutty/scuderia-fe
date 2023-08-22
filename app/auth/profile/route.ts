import { NextResponse } from "next/server"

export const POST = (request: Request) => {
  return NextResponse.json(request.json);
}
