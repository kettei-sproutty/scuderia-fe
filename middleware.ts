import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  const user = await supabase.auth.getUser();

  if (!user) {
    await supabase.auth.updateUser(data.session.user);
  }

  return res;
};

export const config = {
  matcher: ["/:path"],
};
