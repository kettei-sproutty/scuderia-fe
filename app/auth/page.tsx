import Button from "@components/button";
import Input from "@components/input";
import { cookies } from "next/headers";
import { signIn } from "@lib/auth";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const loginAction = async (formData: FormData) => {
    "use server";
    const email = formData.get("email");
    if (!email) throw new Error("Email is required");
    if (!email.toString().endsWith("@accenture.com")) {
      // TODO: Show error message
      return { email: "invalid_email" };
    }

    await signIn({
      clientType: "server-component",
      cookies,
      credentials: {
        email: email.toString(),
        options: {
          shouldCreateUser: true,
          emailRedirectTo: "https:://www.scuderia-fe.com/auth/verify",
        },
      },
    });

    redirect(`/auth/verify?email=${email}`);
  };

  return (
    <form action={loginAction} className={"m-auto h-44 w-1/3 rounded px-4 "}>
      <Input
        id="email"
        required
        type="email"
        name="email"
        label="email"
        className={" h-12 text-gray-900 "}
      />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginPage;
