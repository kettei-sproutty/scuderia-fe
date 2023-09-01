import type { PageProps as WorkshopByIdPageProps } from ".next/types/app/workshop/[id]/page";
import QuestionForm from "app/workshop/[id]/question-form";
import { PrismaClient } from "@prisma/client";
import Card from "@components/card";
import { authentication } from "@lib/authentication";
import { cookies } from "next/headers";

const WorkshopByIdPage = async ({ params }: WorkshopByIdPageProps) => {
  const client = new PrismaClient();
  const workshop = await client.workshop.findUnique({
    where: {
      id: params.id,
    },
  });
  const questions = await client.question.findMany({
    where: {
      workshopId: params.id,
    },
  });

  const author = await authentication("server-action", cookies).getUser();

  return (
    <div className="flex flex-col gap-6">
      <pre>{JSON.stringify(workshop, null, 2)}</pre>
      <QuestionForm workshopId={params.id} />
      <div className="flex flex-col gap-4">
        {questions.map((question) => (
          <Card key={question.id} title={author.name || ""}>
            {question.text}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkshopByIdPage;
