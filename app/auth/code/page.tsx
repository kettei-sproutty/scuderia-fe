import Button from "@components/button";
import Input from "@components/input";
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

    const supabase = createServerActionClient({ cookies });
    const status = await supabase.auth.verifyOtp({
      email: email,
      type: "magiclink",
      token: token.toString(),
    });

    if (!status.data.session || !status.data.user) throw new Error("Invalid token");

    await supabase.auth.setSession(status.data.session);
    await supabase.auth.updateUser(status.data.user);

    redirect("/coming-soon");
  };

  return (
    <form action={loginAction}>
      <Input required min="6" max="6" name="token" label="token" />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default VerifyOtpPage;
