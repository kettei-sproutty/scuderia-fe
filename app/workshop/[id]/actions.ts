"use server";

import { authentication } from "@lib/authentication";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const createWorkshop = async (questionText: string, workshopId: string) => {
  const client = new PrismaClient();
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
