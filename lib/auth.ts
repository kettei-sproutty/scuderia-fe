import {
  createMiddlewareClient,
  createRouteHandlerClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import type {
  SignInWithPasswordlessCredentials,
  SupabaseClient,
  User,
  VerifyOtpParams,
} from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { cookies as Cookies } from "next/headers";
import type { NextResponse, NextRequest } from "next/server";
import { AuthenticationRoutes } from "@utils/routes";
import { PrismaClient } from "@prisma/client";

export type SupabaseClientType = "sever-component" | "middleware" | "route-handler";

export type CookiesContext = { cookies: typeof Cookies };
export type MiddlewareContext = { req: NextRequest; res: NextResponse };

type SupabaseAuth =
  | {
      clientType: "server-component";
      cookies: typeof Cookies;
    }
  | {
      clientType: "route-handler";
      cookies: typeof Cookies;
    }
  | {
      clientType: "middleware";
      req: NextRequest;
      res: NextResponse;
    };

const getSupabase = ({ clientType, ...context }: SupabaseAuth): SupabaseClient => {
  if (!clientType) throw new Error("Missing client type");

  if (clientType === "server-component" && "cookies" in context) {
    return createServerComponentClient(context);
  } else if (clientType === "route-handler" && "cookies" in context) {
    return createRouteHandlerClient(context);
  } else if (clientType === "middleware" && "req" in context && "res" in context) {
    return createMiddlewareClient(context);
  }

  throw new Error("Invalid client type");
};

type GetUserArgs = SupabaseAuth & {
  redirectOnGuest?: boolean;
};

export const getUser = async ({ redirectOnGuest = true, ...authArgs }: GetUserArgs) => {
  try {
    const supabase = getSupabase(authArgs);
    const { data } = await supabase.auth.getUser();

    if (!data.user && redirectOnGuest) {
      redirect(AuthenticationRoutes.AUTHENTICATION_ROUTE);
    }

    if (!data.user) return null;

    const prisma = new PrismaClient();

    const user = await prisma.profile.findUnique({
      where: { email: data.user?.email },
    });

    if (user) return user;

    if (!user) {
      return await prisma.profile.create({
        data: {
          email: data.user.email!,
        },
      });
    }
  } catch (error) {
    console.error(error);
    redirect(AuthenticationRoutes.AUTHENTICATION_ROUTE);
  }
};

type SignInArgs = SupabaseAuth & {
  credentials: SignInWithPasswordlessCredentials;
};

export const signIn = async ({ credentials, ...authArgs }: SignInArgs) => {
  const supabase = getSupabase(authArgs);
  const { error } = await supabase.auth.signInWithOtp(credentials);
  if (error) {
    // TODO: Handle error
    return;
  }

  redirect(`/auth/code`);
};

export const signOut = (authArgs: SupabaseAuth) => {
  const supabase = getSupabase(authArgs);
  supabase.auth.signOut();
  redirect(AuthenticationRoutes.AUTHENTICATION_ROUTE);
};

type VerifyOtpArgs = SupabaseAuth & {
  otpParams: VerifyOtpParams;
};

export const verifyOtp = async ({ otpParams, ...authArgs }: VerifyOtpArgs) => {
  const supabase = getSupabase(authArgs);
  const { data, error } = await supabase.auth.verifyOtp(otpParams);

  if (error || !data.user || !data.session) {
    // TODO: Handle error
    return;
  }

  supabase.auth.setSession(data.session);
  supabase.auth.updateUser(data.user);

  redirect("/");
};
