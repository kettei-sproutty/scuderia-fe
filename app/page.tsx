import { authentication } from "@lib/authentication";
import { cookies } from "next/headers";
import client from "@lib/db";
import React from "react";
import CardGlass from "@components/card-glass";
import NextWorkshop from "@components/next-workshop";

const HomePage = async () => {
  const authenticationHelper = authentication("rsc", cookies);
  const user = await authenticationHelper.getUser();

  const nextWorkshop = await client.workshop.findFirst({
    where: {
      date: {
        gte: new Date().toISOString(),
      },
    },
    include: {
      questions: true,
    },
  });

  const myQuestions = await client.question.findMany({
    where: {
      authorId: user.id,
    },
    include: {
      workshop: true,
    },
  });

  const myQuestionOrdered: Record<string, string[]> = myQuestions.reduce(
    (acc, question) => {
      const workshopTopic = question.workshop.topic;
      if (!acc[workshopTopic]) {
        acc[workshopTopic] = [];
      }
      acc[workshopTopic].push(question.text);
      return acc;
    },
    {} as Record<string, string[]>,
  );

  return (
    <div className=" flex h-full flex-col gap-10">
      <section>
        <h2 className="mb-2 text-2xl">Next workshop</h2>
        <CardGlass title={nextWorkshop?.topic ? "" : "There is no scheduled workshop"}>
          {nextWorkshop && <NextWorkshop nextWorkshop={nextWorkshop} />}
        </CardGlass>
      </section>
      <section>
        <h2 className="mb-2 text-2xl">My Questions</h2>
        <CardGlass
          title={Object.entries(myQuestionOrdered).length === 0 ? "No questions available" : ""}
        >
          {Object.entries(myQuestionOrdered).map(([workshop, questions]) => (
            <div key={workshop} className="flex flex-col items-center justify-center">
              <h2 className="text-3xl font-semibold text-primary-500"> {workshop} </h2>
              <ul>
                {questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </div>
          ))}
        </CardGlass>
      </section>
      {/* */}
    </div>
  );
};

export default HomePage;
