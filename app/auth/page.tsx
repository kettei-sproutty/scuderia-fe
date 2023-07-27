import Button from "@components/button";
import Input from "@components/input";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const loginAction = async (formData: FormData) => {
    "use server";
    const email = formData.get("email");
    if (!email) throw new Error("Email is required");
    if (!email.toString().endsWith("@accenture.com"))
      throw new Error("Email must be an Accenture email");

    const supabase = createServerActionClient({ cookies });
    await supabase.auth.signInWithOtp({
      email: email.toString(),
      options: {
        shouldCreateUser: true,
        emailRedirectTo: "http://localhost:3000/auth/callback",
      },
    });

    redirect("/auth/email-sent");
  };

  return (
    <form action={loginAction}>
      <Input required type="email" name="email" label="email" />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginPage;
