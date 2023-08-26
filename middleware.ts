import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUser, signOut } from "./lib/auth";

export const middleware = async (request: NextRequest) => {
  const user = await getUser({
    req: request,
    res: NextResponse.next(),
    clientType: "middleware",
    redirectOnGuest: false,
  });

  if (!user) {
    // see https://github.com/supabase/auth-helpers/issues/436
    await signOut({
      req: request,
      res: NextResponse.next(),
      clientType: "middleware",
      isMiddleware: true,
    });
  }

  if (request.url.startsWith("/auth")) {
    if (!user) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (!user) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: "/((?!auth).*)",
};
