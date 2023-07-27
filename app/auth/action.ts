const loginAction = async (formData: FormData) => {
  "use server";
  import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
  import { cookies } from "next/headers";
  import { redirect } from "next/navigation";
  const email = formData.get("email");
  if (!email) return;
  if (!email.toString().endsWith("@accenture.com")) return;

  const supabase = createServerActionClient({ cookies });
  await supabase.auth.signInWithOtp({
    email: email.toString(),
    options: {
      shouldCreateUser: true,
      emailRedirectTo: "http://localhost:3000/auth/callback",
    },
  });

  redirect("/email-sent");
};

export default loginAction;
