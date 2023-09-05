import client from "@lib/db";
import Card from "@components/card";
import { authentication } from "@lib/authentication";
import { cookies } from "next/headers";
import QuestionForm from "./question-form";
import React from "react";

type WorkshopByIdPageProps = {
  params: {
    id: string;
  };
};

const WorkshopByIdPage = async ({ params }: WorkshopByIdPageProps) => {
  const questions = await client.question.findMany({
    where: {
      workshopId: params.id,
    },
  });

  const author = await authentication("server-action", cookies).getUser();

  return (
    <div className="flex h-full flex-col gap-4 overflow-auto ">
      {questions.map((question) => (
        <Card key={question.id} title={author.name || ""}>
          {question.text}
        </Card>
      ))}
    </div>
  );
};

export default WorkshopByIdPage;
