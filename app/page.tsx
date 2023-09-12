import { authentication } from "@lib/authentication";
import { cookies } from "next/headers";
import client from "@lib/db";
import React from "react";

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
    <React.Fragment>
      <h2 className="mb-2 text-2xl">Next workshop</h2>
      <div className="mb-6 max-h-[40%] min-h-[20%] overflow-auto border border-accent p-2">
        <h3 className="text-xl text-accent-light">{nextWorkshop?.topic}</h3>
        <p className="mb-4">{nextWorkshop?.description}</p>
        <h4 className="text-lg text-accent-lighter">Questions</h4>
        <ul>
          {nextWorkshop?.questions.map((question) => <li key={question.id}>{question.text}</li>)}
        </ul>
      </div>
      <h2 className="mb-2 text-2xl">My questions</h2>
      <div className="mb-6 max-h-[40%] min-h-[20%] overflow-auto border border-accent p-2">
        {Object.entries(myQuestionOrdered).map(([workshop, questions]) => (
          <React.Fragment key={workshop}>
            <h3 className="text-xl text-accent-light">{workshop}</h3>
            <ul>
              {questions.map((question) => (
                <li key={question}>{question}</li>
              ))}
            </ul>
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
};

export default HomePage;
