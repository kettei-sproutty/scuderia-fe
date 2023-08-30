import { authentication } from "@lib/authentication";
import { cookies } from "next/headers";

const HomePage = async () => {
  const authenticationHelper = authentication("rsc", cookies);
  const user = await authenticationHelper.getUser();

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default HomePage;
