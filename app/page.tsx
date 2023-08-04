import { cookies } from "next/headers";
import { getSupabase, getUser } from "lib/supabase";

const HomePage = async () => {
  const supabase = getSupabase("server-component", { cookies });
  const user = await getUser(supabase, true);

  return (
    <div>
      <pre>{JSON.stringify(user, undefined, "\t")}</pre>
    </div>
  );
};

export default HomePage;
