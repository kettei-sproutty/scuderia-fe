import type { PageProps as WorkshopByIdPageProps } from ".next/types/app/workshop/[id]/page";
import { getUser } from "@lib/auth";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const WorkshopByIdPage = async ({ params }: WorkshopByIdPageProps) => {
  await getUser({ cookies, redirectOnGuest: true, clientType: "server-component" });

  const client = new PrismaClient();
  const workshop = await client.workshop.findUnique({
    where: {
      id: params.id,
    },
  });

  return <pre>{JSON.stringify(workshop, null, 2)}</pre>;
};

export default WorkshopByIdPage;
