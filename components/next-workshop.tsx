"use client";

import { Question, Workshop } from "@prisma/client";
import React from "react";
import Button from "./button";
import { useRouter } from "next/navigation";

type NextWorkshopProps = {
  nextWorkshop: Workshop & { questions: Question[] };
};
const NextWorkshop = ({ nextWorkshop }: NextWorkshopProps) => {
  const router = useRouter();
  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold text-primary-500"> {nextWorkshop.topic} </h2>
        <p>{nextWorkshop?.description}</p>
      </div>
      {nextWorkshop?.questions.length > 0 && (
        <div className="flex flex-col items-center justify-center">
          <h4 className="text-xl font-semibold text-primary-500">Questions</h4>
          <ul className="mb-4 flex flex-col items-center justify-center">
            {nextWorkshop?.questions.map((question) => <li key={question.id}>{question.text}</li>)}
          </ul>
          <Button onClick={() => router.push(`/workshop/${nextWorkshop.id}`)}>Add question</Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default NextWorkshop;
