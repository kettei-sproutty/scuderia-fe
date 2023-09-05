"use server";

import { authentication } from "@lib/authentication";
import client from "@lib/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const createWorkshop = async (questionText: string, workshopId: string) => {
  const user = await authentication("server-action", cookies).getUser();
  const question = await client.question.create({
    data: {
      text: questionText,
      workshopId,
      authorId: user.id,
    },
  });

  revalidatePath(`/workshop/${workshopId}`);

  return question;
};
