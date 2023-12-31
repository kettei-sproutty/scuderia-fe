import { authentication } from "@lib/authentication";
import { cookies } from "next/headers";
import client from "@lib/db";
import React from "react";
import CardGlass from "@components/card-glass";
import NextWorkshop from "@components/next-workshop";
import SetUsername from "./set-username";

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
      {user.username && (
        <div className=" grid h-full grid-cols-2 gap-8 ">
          <section className="col-span-2 row-span-3 lg:col-span-1">
            <CardGlass
              title={nextWorkshop?.topic ? "" : "There is no scheduled workshop"}
              infoLabel="Next Workshop"
            >
              {nextWorkshop && <NextWorkshop nextWorkshop={nextWorkshop} />}
            </CardGlass>
          </section>

          <section className="col-span-2 row-span-6 lg:col-span-1">
            <CardGlass
              infoLabel="My questions"
              title={Object.entries(myQuestionOrdered).length === 0 ? "No questions available" : ""}
            >
              {Object.entries(myQuestionOrdered).map(([workshop, questions]) => (
                <div key={workshop} className="mb-4 flex w-full flex-col ">
                  <h2 className="text-3xl font-semibold text-primary-200"> {workshop} </h2>
                  <ul>
                    {questions.map((question) => (
                      <li className="text-primary-400" key={question}>
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardGlass>
          </section>
          {/* */}
        </div>
      )}
      {!user.username && <SetUsername />}
    </React.Fragment>
  );
};

export default HomePage;
