import { authentication } from "@lib/authentication";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authMiddleware = async (req: NextRequest) => {
  const redirectUrl = new URL("/auth", req.url);

  try {
    const authHelper = authentication("middleware", req, NextResponse.next());

    const status = await authHelper.checkSession();
    if (!status) return NextResponse.redirect(redirectUrl);

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(redirectUrl);
  }
};

export const config = {
  matcher: ["/", "/workshop/:path*"],
};

export default authMiddleware;
