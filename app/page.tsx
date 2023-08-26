import { cookies } from "next/headers";
import { getUser } from "lib/auth";

const HomePage = async () => {
  const user = await getUser({ clientType: "server-component", cookies, redirectOnGuest: true });

  return (
    <div>
      <pre>{JSON.stringify(user, undefined, "\t")}</pre>
    </div>
  );
};

export default HomePage;
