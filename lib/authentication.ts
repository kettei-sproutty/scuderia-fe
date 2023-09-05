import client from "@lib/db";
import {
  createMiddlewareClient,
  createRouteHandlerClient,
  createServerActionClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import type { SignInWithPasswordlessCredentials, VerifyOtpParams } from "@supabase/supabase-js";
import { cookies as Cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest, NextResponse } from "next/server";

type ClientType = "middleware" | "rsc" | "route-handler" | "server-action";

type Authentication = {
  (clientType: "route-handler", cookies: typeof Cookies): ReturnType<typeof authenticationHelper>;
  (clientType: "rsc", cookies: typeof Cookies): ReturnType<typeof authenticationHelper>;
  (clientType: "server-action", cookies: typeof Cookies): ReturnType<typeof authenticationHelper>;
  (
    clientType: "middleware",
    req: NextRequest,
    res: NextResponse,
  ): ReturnType<typeof authenticationHelper>;
};

export const authentication: Authentication = (clientType: ClientType, ...other: unknown[]) => {
  if (clientType === "middleware") {
    const [req, res] = other as [NextRequest, NextResponse];
    const supabase = createMiddlewareClient({ req, res });
    return authenticationHelper(supabase);
  } else if (clientType === "rsc") {
    const [cookies] = other as [typeof Cookies];
    const supabase = createServerComponentClient({ cookies });
    return authenticationHelper(supabase);
  } else if (clientType === "route-handler") {
    const [cookies] = other as [typeof Cookies];
    const supabase = createRouteHandlerClient({ cookies });
    return authenticationHelper(supabase);
  } else if (clientType === "server-action") {
    const [cookies] = other as [typeof Cookies];
    const supabase = createServerActionClient({ cookies });
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

  const verifyCallback = async (code: string) => {
    const { data } = await supabase.auth.exchangeCodeForSession(code);
    if (!data.user || !data.session) throw new Error("Invalid code");

    await supabase.auth.setSession(data.session);
    await supabase.auth.updateUser(data.user);
  };

  const checkSession = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();

      const isSessionExpired = (sessionData?.session?.expires_in || 0) <= 0;

      if (isSessionExpired) {
        await signOut();
        return false;
      }

      return !!sessionData.session;
    } catch (error) {
      return false;
    }
  };

  const getUser = async () => {
    try {
      const { data } = await supabase.auth.getUser();
      if (!data.user || !data.user.email) throw new Error("User not found");

      const profile = await client.profile.findUnique({
        where: { email: data.user.email },
      });

      if (profile) return profile;

      const user = await client.profile.create({
        data: {
          email: data.user.email,
        },
      });

      return user;
    } catch (error) {
      console.error(error);
      redirect("/auth");
    }
  };

  const updateSession = async ({ user, session }: { user: User; session: Session }) => {
    try {
      await supabase.auth.setSession(session);
      await supabase.auth.updateUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    signIn,
    signOut,
    getUser,
    checkSession,
    verifyCallback,
    verifyOtp,
    updateSession,
  };
};
