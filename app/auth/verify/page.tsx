import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyCallback, verifyOtp } from "@lib/auth";
import { PageProps } from ".next/types/app/auth/page";

const VerifyAuthPage = async ({ searchParams }: PageProps) => {
  const { token, email } = searchParams;

  if (token) {
    try {
      await verifyCallback({ code: token, cookies, clientType: "server-component" });
      redirect("/");
    } catch (error) {
      console.error(error);
      // TODO: handle errors
      notFound();
    }
  }

  if (!email) {
    notFound();
  }

  const loginAction = async (formData: FormData) => {
    "use server";
    const code = formData.get("code");
    if (!code) return { error: { code: "invalid_code" } };

    await verifyOtp({
      clientType: "server-component",
      cookies,
      otpParams: {
        email,
        token: code.toString(),
        type: "email",
        options: {
          redirectTo: "/",
        },
      },
    });
  };

  return (
    <form action={loginAction}>
      <input type="text" name="code" />
      <button type="submit">Verify</button>
    </form>
  );
};

export default VerifyAuthPage;
