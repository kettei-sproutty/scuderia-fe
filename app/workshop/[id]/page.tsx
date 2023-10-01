import client from "@lib/db";
import Card from "@components/card";
import { authentication } from "@lib/authentication";
import { cookies } from "next/headers";
import React from "react";
import Upvote from "./upvote";

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
    include: {
      author: true,
    },
  });

  const author = await authentication("server-action", cookies).getUser();

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-scroll pl-4 pr-2">
      {questions.map((question) => (
        <Card
          key={question.id}
          title={question.author?.username ? `${question.author.username}` : ""}
          subtitle={`<${question.author.email}>` || ""}
          titleAction={
            <Upvote
              questionId={question.id}
              workshopId={params.id}
              questionUpvotes={question.upvotes}
              profileId={author.id}
            />
          }
        >
          {question.text}
        </Card>
      ))}
    </div>
  );
};

export default WorkshopByIdPage;
