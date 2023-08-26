import { PrismaClient } from "@prisma/client";
import {
  createMiddlewareClient,
  createRouteHandlerClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { SignInWithPasswordlessCredentials, VerifyOtpParams } from "@supabase/supabase-js";
import { cookies as Cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";

enum ClientType {
  MIDDLEWARE = "middleware",
  RSC = "rsc",
  ROUTE_HANDLER = "route-handler",
}

type Authentication = {
  (
    clientType: ClientType.ROUTE_HANDLER | "route-handler",
    cookies: typeof Cookies,
  ): ReturnType<typeof authenticationHelper>;
  (
    clientType: ClientType.RSC | "rsc",
    cookies: typeof Cookies,
  ): ReturnType<typeof authenticationHelper>;
  (
    clientType: ClientType.MIDDLEWARE | "middleware",
    req: NextRequest,
    res: NextResponse,
  ): ReturnType<typeof authenticationHelper>;
};

export const authentication: Authentication = (clientType, ...other: unknown[]) => {
  if (clientType === ClientType.MIDDLEWARE) {
    const [req, res] = other as [NextRequest, NextResponse];
    const supabase = createMiddlewareClient({ req, res });
    return authenticationHelper(supabase);
  } else if (clientType === ClientType.RSC) {
    const [cookies] = other as [typeof Cookies];
    const supabase = createServerComponentClient({ cookies });
    return authenticationHelper(supabase);
  } else if (clientType === ClientType.ROUTE_HANDLER) {
    const [cookies] = other as [typeof Cookies];
    const supabase = createRouteHandlerClient({ cookies });
    return authenticationHelper(supabase);
  } else {
    throw new Error("Invalid client type");
  }
};

const authenticationHelper = (supabase: SupabaseClient) => {
  const signIn = async (credentials: SignInWithPasswordlessCredentials) =>
    await supabase.auth.signInWithOtp(credentials);

  const signOut = async () => await supabase.auth.signOut();

  const verifyOtp = async (params: VerifyOtpParams) => await supabase.auth.verifyOtp(params);

  const verifyCallback = async (code: string) => await supabase.auth.exchangeCodeForSession(code);

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw new Error("User not found");

    const prisma = new PrismaClient();
    const profile = await prisma.profile.findUnique({
      where: { email: data.user.email },
    });

    if (profile) return profile;

    const user = await prisma.profile.create({
      data: {
        email: data.user.email!,
      },
    });

    return user;
  };

  return {
    signIn,
    signOut,
    getUser,
    verifyCallback,
    verifyOtp,
  };
};
