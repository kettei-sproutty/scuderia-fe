import { authentication } from "@lib/authentication";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authMiddleware = async (req: NextRequest) => {
  const authHelper = authentication("middleware", req, NextResponse.next());
  const redirectUrl = new URL("/auth", req.url);

  try {
    const user = await authHelper.getUser();

    if (!user) return NextResponse.redirect(redirectUrl);

    return NextResponse.next();
  } catch (error) {
    await authHelper.signOut();
    return NextResponse.redirect(redirectUrl);
  }
};

export const config = {
  matcher: ["/", "/workshop/:path*"],
};

export default authMiddleware;
