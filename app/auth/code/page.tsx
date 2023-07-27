import { PageProps } from ".next/types/app/auth/code/page";
import Button from "@components/button";
import Input from "@components/input";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const VerifyOtpPage = async ({ searchParams }: PageProps) => {
  const email: string = searchParams["email"];
  if (!email) notFound();

  const loginAction = async (formData: FormData) => {
    "use server";
    const token = formData.get("token");
    if (!token) throw new Error("Token is required");

    const supabase = createServerActionClient({ cookies });
    const status = await supabase.auth.verifyOtp({
      email: email,
      type: "magiclink",
      token: token.toString(),
    });

    console.log(status);
  };

  return (
    <form action={loginAction}>
      <Input required min="6" max="6" name="token" label="token" />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default VerifyOtpPage;
