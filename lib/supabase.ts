import {
  createMiddlewareClient,
  createRouteHandlerClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { cookies as Cookies } from "next/headers";
import type { NextResponse, NextRequest } from "next/server";
import { AuthenticationRoutes } from "@utils/routes";

export type SupabaseClientType = "sever-component" | "middleware" | "route-handler";

export type CookiesContext = { cookies: typeof Cookies };
export type MiddlewareContext = { req: NextRequest; res: NextResponse };

interface IGetSupabase {
  /**
   * Create a supabase client for React Server Components.
   * @argument {"server-component"} clientType - Where supabase will be used.
   * @argument {CookiesContext} context - The context object passed function containing cookies.
   * @example ```tsx
   * import { getSupabase } from "@lib/supabase";
   * import { cookies } from "next/headers";
   *
   * const supabase = getSupabase("server-component", { cookies });
   * ```
   */
  (
    clientType: "server-component",
    context: CookiesContext,
  ): ReturnType<typeof createServerComponentClient>;
  /**
   * Create a supabase client for React Server Components.
   * @argument {"middleware"} clientType - Where supabase will be used.
   * @argument {CookiesContext} context - The context object passed function containing cookies.
   * @example ```tsx
   * import { getSupabase } from "@lib/supabase";
   * import { cookies } from "next/headers";
   *
   * const supabase = getSupabase("route-handler", { cookies });
   * ```
   */
  (
    clientType: "route-handler",
    context: MiddlewareContext,
  ): ReturnType<typeof createMiddlewareClient>;
  /**
   * Create a supabase client for React Server Components.
   * @argument {"middleware"} clientType - Where supabase will be used.
   * @argument {MiddlewareContext} context - The context object passed function containing { req, res }.
   * @example ```tsx
   * import { getSupabase } from "@lib/supabase";
   * import { NextResponse, type NextRequest } from "next/server";
   * export const middleware = async (req: NextRequest) => {
   *  const res = NextResponse.next();
   *  const supabase = getSupabase("middleware", { req, res });
   * }
   * ```
   */
  (clientType: "middleware", context: CookiesContext): ReturnType<typeof createRouteHandlerClient>;
}

/**
 * Create a supabase client, contaings 3 overloads.
 * @param {"server-component" | "middleware" | "route-handler"} clientType - Where supabase will be used.
 * @param {CookiesContext | MiddlewareContext} context - The context object passed function.
 * @returns {ReturnType<typeof createServerComponentClient> | ReturnType<typeof createMiddlewareClient> | ReturnType<typeof createRouteHandlerClient>} - A supabase client.
 *
 */
export const getSupabase: IGetSupabase = (clientType, context) => {
  switch (clientType) {
    case "server-component":
      return createServerComponentClient(context as CookiesContext);
    case "route-handler":
      return createRouteHandlerClient(context as CookiesContext);
    case "middleware":
      return createMiddlewareClient(context as MiddlewareContext);
    default:
      throw new Error(`Invalid client type: ${clientType}`);
  }
};

interface IGetUser {
  (supabase: SupabaseClient, redirectOnGuest: true): Promise<User>;
  (supabase: SupabaseClient, redirectOnGuest?: false): Promise<User | null>;
}

export const getUser: IGetUser = async (supabase, redirectOnGuest = false) => {
  try {
    const { data } = await supabase.auth.getUser();
    if (!data.user && redirectOnGuest) {
      redirect(AuthenticationRoutes.AUTHENTICATION_ROUTE);
    }

    if (data.user && redirectOnGuest) {
      return data.user;
    }

    // TODO: Fix why we need `!` here
    return data.user!;
  } catch (error) {
    console.error(error);
    redirect(AuthenticationRoutes.AUTHENTICATION_ROUTE);
  }
};
