// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const HomePage = async () => {
  // const supabase = createServerComponentClient({ cookies });
  // const { data: userData } = await supabase.auth.getUser();

  redirect("/coming-soon");

  return <div>{/* <pre>{JSON.stringify(userData.user, undefined, "\t")}</pre> */}</div>;
};

export default HomePage;
