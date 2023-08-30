import { authentication } from "@lib/authentication";
import { cookies } from "next/headers";

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  const authenticationHelper = authentication("route-handler", cookies);
  try {
    if (!token) throw new Error("Invalid code");
    await authenticationHelper.verifyCallback(token);

    return new Response(null, { status: 302, headers: { Location: "/" } });
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 302, headers: { Location: "/auth" } });
  }
};
