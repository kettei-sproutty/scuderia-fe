"use server";

import { authentication } from "@lib/authentication";
import client from "@lib/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const updateUsername = async (formData: FormData) => {
  const username = formData.get("username")?.toString();
  if (!username) throw new Error("Username is required");

  try {
    const user = await authentication("server-action", cookies).getUser();
    await client.profile.update({
      where: {
        id: user.id,
      },
      data: {
        username,
      },
    });
    revalidatePath(`/`);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to set the username");
  }
};
