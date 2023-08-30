import type { PageProps as WorkshopByIdPageProps } from ".next/types/app/workshop/[id]/page";
import { PrismaClient } from "@prisma/client";

const WorkshopByIdPage = async ({ params }: WorkshopByIdPageProps) => {
  const client = new PrismaClient();
  const workshop = await client.workshop.findUnique({
    where: {
      id: params.id,
    },
  });

  return <pre>{JSON.stringify(workshop, null, 2)}</pre>;
};

export default WorkshopByIdPage;
