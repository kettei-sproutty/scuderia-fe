import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const HomePage = () => {
  const supabase = createServerComponentClient({ cookies });

  return (
    <div>
      <pre>{JSON.stringify(supabase.auth.getSession())}</pre>
    </div>
  );
};

export default HomePage;
