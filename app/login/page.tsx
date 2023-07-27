import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers'

const LoginPage = () => {
  const loginAction = async (formData: FormData) => {
    'use server'

    const email = formData.get('email')
    if (!email) return

    const supabase = createServerActionClient({ cookies });

    const status = await supabase.auth.signInWithOtp({
      email: email.toString(),
      options: {
        emailRedirectTo: 'http://localhost:3000/auth/callback',
      },
    });

    console.log(status)
  }

  return (
    <form action={loginAction}>
      <input required type="email" name="email" />
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginPage;