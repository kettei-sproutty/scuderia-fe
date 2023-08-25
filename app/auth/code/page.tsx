import Button from "@components/button";
import Input from "@components/input";
import { verifyOtp } from "@lib/auth";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

type PageParms = {
  email?: string;
};

type VerifyOtpPageProps = {
  searchParams: PageParms;
};

const VerifyOtpPage = async ({ searchParams }: VerifyOtpPageProps) => {
  const email = searchParams["email"];
  if (!email) notFound();

  const loginAction = async (formData: FormData) => {
    "use server";
    const token = formData.get("token");
    if (!token) throw new Error("Token is required");

    await verifyOtp({
      clientType: "server-component",
      cookies,
      otpParams: {
        email: email,
        type: "magiclink",
        token: token.toString(),
      },
    });

    // TODO: Error Handling
  };

  return (
    <form action={loginAction}>
      <Input required min="6" max="6" name="token" label="token" />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default VerifyOtpPage;
